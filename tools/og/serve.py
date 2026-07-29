#!/usr/bin/env python3
"""Local helper for generating the social-card assets.

Serves the repository over HTTP so `tools/og/index.html` can load the real fonts and
import `src/lib/dither-core.js` as a module, and accepts the finished bytes back on
`POST /save/<name>` to write them into `public/`.

The POST leg exists because the alternative — shuttling a multi-hundred-kilobyte GIF
out through a browser-automation `evaluate` call — is capped at 64 KB and would need
chunking and reassembly.

Binds to loopback only. Filenames are whitelisted.
"""

from __future__ import annotations

import http.server
import re
import socketserver
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
OUTPUT_DIR = REPO_ROOT / "public"
PORT = 8787
PAGE = "/tools/og/index.html"

# Only ever write these. Keeps a stray POST from touching anything else.
ALLOWED_NAMES = {"og.png", "og-loop.gif"}
SAFE_NAME = re.compile(r"^[A-Za-z0-9._-]+$")
MAX_UPLOAD = 16 * 1024 * 1024


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(REPO_ROOT), **kwargs)

    def do_POST(self) -> None:  # noqa: N802 - name fixed by BaseHTTPRequestHandler
        if not self.path.startswith("/save/"):
            self.send_error(404, "only /save/<name> accepts POST")
            return

        name = self.path[len("/save/") :]
        if not SAFE_NAME.match(name) or name not in ALLOWED_NAMES:
            self.send_error(403, f"refusing to write {name!r}")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_error(400, "bad Content-Length")
            return
        if length <= 0 or length > MAX_UPLOAD:
            self.send_error(413, f"payload of {length} bytes rejected")
            return

        payload = self.rfile.read(length)
        target = OUTPUT_DIR / name
        target.write_bytes(payload)
        print(f"  wrote {target.relative_to(REPO_ROOT)} ({len(payload):,} bytes)")

        self.send_response(200)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(f"{len(payload)}\n".encode())

    def end_headers(self) -> None:
        # The page reads its own output back to verify it; no caching in the way.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt: str, *args) -> None:
        if "POST" in (args[0] if args else ""):
            super().log_message(fmt, *args)


def main() -> int:
    Handler.extensions_map.update({".js": "text/javascript", ".mjs": "text/javascript"})
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.ThreadingTCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print(f"Social-card generator: http://127.0.0.1:{PORT}{PAGE}")
        print(f"Writes into {OUTPUT_DIR.relative_to(REPO_ROOT)}/. Ctrl-C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print()
    return 0


if __name__ == "__main__":
    sys.exit(main())
