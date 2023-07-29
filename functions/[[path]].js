globalThis.process = {
  argv: [],
  env: {},
};
var fu = Object.create;
var Tn = Object.defineProperty;
var Du = Object.getOwnPropertyDescriptor;
var mu = Object.getOwnPropertyNames;
var hu = Object.getPrototypeOf,
  gu = Object.prototype.hasOwnProperty;
var Z = (e, t) => () => (e && (t = e((e = 0))), t);
var K = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  Xe = (e, t) => {
    for (var r in t) Tn(e, r, { get: t[r], enumerable: !0 });
  },
  xu = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of mu(t))
        !gu.call(e, o) &&
          o !== r &&
          Tn(e, o, {
            get: () => t[o],
            enumerable: !(n = Du(t, o)) || n.enumerable,
          });
    return e;
  };
var A = (e, t, r) => (
  (r = e != null ? fu(hu(e)) : {}),
  xu(
    t || !e || !e.__esModule
      ? Tn(r, "default", { value: e, enumerable: !0 })
      : r,
    e,
  )
);
var $n = (e, t, r) => {
  if (!t.has(e)) throw TypeError("Cannot " + r);
};
var h = (e, t, r) => (
    $n(e, t, "read from private field"), r ? r.call(e) : t.get(e)
  ),
  O = (e, t, r) => {
    if (t.has(e))
      throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
  },
  L = (e, t, r, n) => (
    $n(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r
  );
var ue = (e, t, r) => ($n(e, t, "access private method"), r);
var je = K((Pn) => {
  "use strict";
  Pn.parse = yu;
  Pn.serialize = Fu;
  var vu = Object.prototype.toString,
    It = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function yu(e, t) {
    if (typeof e != "string")
      throw new TypeError("argument str must be a string");
    for (var r = {}, n = t || {}, o = n.decode || wu, i = 0; i < e.length; ) {
      var a = e.indexOf("=", i);
      if (a === -1) break;
      var s = e.indexOf(";", i);
      if (s === -1) s = e.length;
      else if (s < a) {
        i = e.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      var u = e.slice(i, a).trim();
      if (r[u] === void 0) {
        var c = e.slice(a + 1, s).trim();
        c.charCodeAt(0) === 34 && (c = c.slice(1, -1)), (r[u] = bu(c, o));
      }
      i = s + 1;
    }
    return r;
  }
  function Fu(e, t, r) {
    var n = r || {},
      o = n.encode || Cu;
    if (typeof o != "function") throw new TypeError("option encode is invalid");
    if (!It.test(e)) throw new TypeError("argument name is invalid");
    var i = o(t);
    if (i && !It.test(i)) throw new TypeError("argument val is invalid");
    var a = e + "=" + i;
    if (n.maxAge != null) {
      var s = n.maxAge - 0;
      if (isNaN(s) || !isFinite(s))
        throw new TypeError("option maxAge is invalid");
      a += "; Max-Age=" + Math.floor(s);
    }
    if (n.domain) {
      if (!It.test(n.domain)) throw new TypeError("option domain is invalid");
      a += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!It.test(n.path)) throw new TypeError("option path is invalid");
      a += "; Path=" + n.path;
    }
    if (n.expires) {
      var u = n.expires;
      if (!Eu(u) || isNaN(u.valueOf()))
        throw new TypeError("option expires is invalid");
      a += "; Expires=" + u.toUTCString();
    }
    if (
      (n.httpOnly && (a += "; HttpOnly"),
      n.secure && (a += "; Secure"),
      n.priority)
    ) {
      var c =
        typeof n.priority == "string" ? n.priority.toLowerCase() : n.priority;
      switch (c) {
        case "low":
          a += "; Priority=Low";
          break;
        case "medium":
          a += "; Priority=Medium";
          break;
        case "high":
          a += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (n.sameSite) {
      var l =
        typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
      switch (l) {
        case !0:
          a += "; SameSite=Strict";
          break;
        case "lax":
          a += "; SameSite=Lax";
          break;
        case "strict":
          a += "; SameSite=Strict";
          break;
        case "none":
          a += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return a;
  }
  function wu(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  function Cu(e) {
    return encodeURIComponent(e);
  }
  function Eu(e) {
    return vu.call(e) === "[object Date]" || e instanceof Date;
  }
  function bu(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
});
function Mt(e) {
  return e[0] === "/" ? e : "/" + e;
}
function In(e) {
  return e.endsWith("/") ? e.slice(0, e.length - 1) : e;
}
function Su(e) {
  return e.startsWith("/") ? e.substring(1) : e;
}
function ku(e) {
  return e.replace(/^\/|\/$/g, "");
}
function Au(e) {
  return typeof e == "string" || e instanceof String;
}
function Ot(...e) {
  return e
    .filter(Au)
    .map((t, r) => (r === 0 ? In(t) : r === e.length - 1 ? Su(t) : ku(t)))
    .join("/");
}
function Fi(e) {
  return /^(http|ftp|https|ws):?\/\//.test(e) || e.startsWith("data:");
}
function Mn(e) {
  return e.replace(/\\/g, "/");
}
var _e = Z(() => {});
function j(e, t) {
  let r = new RegExp(`\\x1b\\[${t}m`, "g"),
    n = `\x1B[${e}m`,
    o = `\x1B[${t}m`;
  return function (i) {
    return !Bu.enabled || i == null
      ? i
      : n + (~("" + i).indexOf(o) ? i.replace(r, o + n) : i) + o;
  };
}
var On,
  wi,
  Ci,
  Ei,
  bi,
  Bu,
  Si,
  st,
  ki,
  Yf,
  Zf,
  Kf,
  Qf,
  eD,
  tD,
  Ai,
  nD,
  Nn,
  rD,
  iD,
  Bi,
  oD,
  aD,
  sD,
  uD,
  lD,
  cD,
  pD,
  dD,
  fD,
  DD,
  mD,
  Te = Z(() => {
    bi = !0;
    typeof process < "u" &&
      (({
        FORCE_COLOR: On,
        NODE_DISABLE_COLORS: wi,
        NO_COLOR: Ci,
        TERM: Ei,
      } = process.env || {}),
      (bi = process.stdout && process.stdout.isTTY));
    Bu = {
      enabled:
        !wi &&
        Ci == null &&
        Ei !== "dumb" &&
        ((On != null && On !== "0") || bi),
    };
    (Si = j(0, 0)),
      (st = j(1, 22)),
      (ki = j(2, 22)),
      (Yf = j(3, 23)),
      (Zf = j(4, 24)),
      (Kf = j(7, 27)),
      (Qf = j(8, 28)),
      (eD = j(9, 29)),
      (tD = j(30, 39)),
      (Ai = j(31, 39)),
      (nD = j(32, 39)),
      (Nn = j(33, 39)),
      (rD = j(34, 39)),
      (iD = j(35, 39)),
      (Bi = j(36, 39)),
      (oD = j(37, 39)),
      (aD = j(90, 39)),
      (sD = j(90, 39)),
      (uD = j(40, 49)),
      (lD = j(41, 49)),
      (cD = j(42, 49)),
      (pD = j(43, 49)),
      (dD = j(44, 49)),
      (fD = j(45, 49)),
      (DD = j(46, 49)),
      (mD = j(47, 49));
  });
function Ru(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r];
    if (n === "*" || n === "+" || n === "?") {
      t.push({ type: "MODIFIER", index: r, value: e[r++] });
      continue;
    }
    if (n === "\\") {
      t.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
      continue;
    }
    if (n === "{") {
      t.push({ type: "OPEN", index: r, value: e[r++] });
      continue;
    }
    if (n === "}") {
      t.push({ type: "CLOSE", index: r, value: e[r++] });
      continue;
    }
    if (n === ":") {
      for (var o = "", i = r + 1; i < e.length; ) {
        var a = e.charCodeAt(i);
        if (
          (a >= 48 && a <= 57) ||
          (a >= 65 && a <= 90) ||
          (a >= 97 && a <= 122) ||
          a === 95
        ) {
          o += e[i++];
          continue;
        }
        break;
      }
      if (!o) throw new TypeError("Missing parameter name at ".concat(r));
      t.push({ type: "NAME", index: r, value: o }), (r = i);
      continue;
    }
    if (n === "(") {
      var s = 1,
        u = "",
        i = r + 1;
      if (e[i] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(i));
      for (; i < e.length; ) {
        if (e[i] === "\\") {
          u += e[i++] + e[i++];
          continue;
        }
        if (e[i] === ")") {
          if ((s--, s === 0)) {
            i++;
            break;
          }
        } else if (e[i] === "(" && (s++, e[i + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(i));
        u += e[i++];
      }
      if (s) throw new TypeError("Unbalanced pattern at ".concat(r));
      if (!u) throw new TypeError("Missing pattern at ".concat(r));
      t.push({ type: "PATTERN", index: r, value: u }), (r = i);
      continue;
    }
    t.push({ type: "CHAR", index: r, value: e[r++] });
  }
  return t.push({ type: "END", index: r, value: "" }), t;
}
function ju(e, t) {
  t === void 0 && (t = {});
  for (
    var r = Ru(e),
      n = t.prefixes,
      o = n === void 0 ? "./" : n,
      i = "[^".concat(Tu(t.delimiter || "/#?"), "]+?"),
      a = [],
      s = 0,
      u = 0,
      c = "",
      l = function (se) {
        if (u < r.length && r[u].type === se) return r[u++].value;
      },
      p = function (se) {
        var le = l(se);
        if (le !== void 0) return le;
        var Pt = r[u],
          F = Pt.type,
          R = Pt.index;
        throw new TypeError(
          "Unexpected ".concat(F, " at ").concat(R, ", expected ").concat(se),
        );
      },
      f = function () {
        for (var se = "", le; (le = l("CHAR") || l("ESCAPED_CHAR")); ) se += le;
        return se;
      };
    u < r.length;

  ) {
    var x = l("CHAR"),
      g = l("NAME"),
      E = l("PATTERN");
    if (g || E) {
      var k = x || "";
      o.indexOf(k) === -1 && ((c += k), (k = "")),
        c && (a.push(c), (c = "")),
        a.push({
          name: g || s++,
          prefix: k,
          suffix: "",
          pattern: E || i,
          modifier: l("MODIFIER") || "",
        });
      continue;
    }
    var $ = x || l("ESCAPED_CHAR");
    if ($) {
      c += $;
      continue;
    }
    c && (a.push(c), (c = ""));
    var M = l("OPEN");
    if (M) {
      var k = f(),
        V = l("NAME") || "",
        b = l("PATTERN") || "",
        at = f();
      p("CLOSE"),
        a.push({
          name: V || (b ? s++ : ""),
          pattern: V && !b ? i : b,
          prefix: k,
          suffix: at,
          modifier: l("MODIFIER") || "",
        });
      continue;
    }
    p("END");
  }
  return a;
}
function Ri(e, t) {
  return _u(ju(e, t), t);
}
function _u(e, t) {
  t === void 0 && (t = {});
  var r = $u(t),
    n = t.encode,
    o =
      n === void 0
        ? function (u) {
            return u;
          }
        : n,
    i = t.validate,
    a = i === void 0 ? !0 : i,
    s = e.map(function (u) {
      if (typeof u == "object")
        return new RegExp("^(?:".concat(u.pattern, ")$"), r);
    });
  return function (u) {
    for (var c = "", l = 0; l < e.length; l++) {
      var p = e[l];
      if (typeof p == "string") {
        c += p;
        continue;
      }
      var f = u ? u[p.name] : void 0,
        x = p.modifier === "?" || p.modifier === "*",
        g = p.modifier === "*" || p.modifier === "+";
      if (Array.isArray(f)) {
        if (!g)
          throw new TypeError(
            'Expected "'.concat(p.name, '" to not repeat, but got an array'),
          );
        if (f.length === 0) {
          if (x) continue;
          throw new TypeError('Expected "'.concat(p.name, '" to not be empty'));
        }
        for (var E = 0; E < f.length; E++) {
          var k = o(f[E], p);
          if (a && !s[l].test(k))
            throw new TypeError(
              'Expected all "'
                .concat(p.name, '" to match "')
                .concat(p.pattern, '", but got "')
                .concat(k, '"'),
            );
          c += p.prefix + k + p.suffix;
        }
        continue;
      }
      if (typeof f == "string" || typeof f == "number") {
        var k = o(String(f), p);
        if (a && !s[l].test(k))
          throw new TypeError(
            'Expected "'
              .concat(p.name, '" to match "')
              .concat(p.pattern, '", but got "')
              .concat(k, '"'),
          );
        c += p.prefix + k + p.suffix;
        continue;
      }
      if (!x) {
        var $ = g ? "an array" : "a string";
        throw new TypeError('Expected "'.concat(p.name, '" to be ').concat($));
      }
    }
    return c;
  };
}
function Tu(e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function $u(e) {
  return e && e.sensitive ? "" : "i";
}
var ji = Z(() => {});
var Ln = K((xD, _i) => {
  "use strict";
  function Nt() {
    (this._types = Object.create(null)),
      (this._extensions = Object.create(null));
    for (let e = 0; e < arguments.length; e++) this.define(arguments[e]);
    (this.define = this.define.bind(this)),
      (this.getType = this.getType.bind(this)),
      (this.getExtension = this.getExtension.bind(this));
  }
  Nt.prototype.define = function (e, t) {
    for (let r in e) {
      let n = e[r].map(function (o) {
        return o.toLowerCase();
      });
      r = r.toLowerCase();
      for (let o = 0; o < n.length; o++) {
        let i = n[o];
        if (i[0] !== "*") {
          if (!t && i in this._types)
            throw new Error(
              'Attempt to change mapping for "' +
                i +
                '" extension from "' +
                this._types[i] +
                '" to "' +
                r +
                '". Pass `force=true` to allow this, otherwise remove "' +
                i +
                '" from the list of extensions for "' +
                r +
                '".',
            );
          this._types[i] = r;
        }
      }
      if (t || !this._extensions[r]) {
        let o = n[0];
        this._extensions[r] = o[0] !== "*" ? o : o.substr(1);
      }
    }
  };
  Nt.prototype.getType = function (e) {
    e = String(e);
    let t = e.replace(/^.*[/\\]/, "").toLowerCase(),
      r = t.replace(/^.*\./, "").toLowerCase(),
      n = t.length < e.length;
    return ((r.length < t.length - 1 || !n) && this._types[r]) || null;
  };
  Nt.prototype.getExtension = function (e) {
    return (
      (e = /^\s*([^;\s]*)/.test(e) && RegExp.$1),
      (e && this._extensions[e.toLowerCase()]) || null
    );
  };
  _i.exports = Nt;
});
var zn = K((vD, Ti) => {
  Ti.exports = {
    "application/andrew-inset": ["ez"],
    "application/applixware": ["aw"],
    "application/atom+xml": ["atom"],
    "application/atomcat+xml": ["atomcat"],
    "application/atomdeleted+xml": ["atomdeleted"],
    "application/atomsvc+xml": ["atomsvc"],
    "application/atsc-dwd+xml": ["dwd"],
    "application/atsc-held+xml": ["held"],
    "application/atsc-rsat+xml": ["rsat"],
    "application/bdoc": ["bdoc"],
    "application/calendar+xml": ["xcs"],
    "application/ccxml+xml": ["ccxml"],
    "application/cdfx+xml": ["cdfx"],
    "application/cdmi-capability": ["cdmia"],
    "application/cdmi-container": ["cdmic"],
    "application/cdmi-domain": ["cdmid"],
    "application/cdmi-object": ["cdmio"],
    "application/cdmi-queue": ["cdmiq"],
    "application/cu-seeme": ["cu"],
    "application/dash+xml": ["mpd"],
    "application/davmount+xml": ["davmount"],
    "application/docbook+xml": ["dbk"],
    "application/dssc+der": ["dssc"],
    "application/dssc+xml": ["xdssc"],
    "application/ecmascript": ["es", "ecma"],
    "application/emma+xml": ["emma"],
    "application/emotionml+xml": ["emotionml"],
    "application/epub+zip": ["epub"],
    "application/exi": ["exi"],
    "application/express": ["exp"],
    "application/fdt+xml": ["fdt"],
    "application/font-tdpfr": ["pfr"],
    "application/geo+json": ["geojson"],
    "application/gml+xml": ["gml"],
    "application/gpx+xml": ["gpx"],
    "application/gxf": ["gxf"],
    "application/gzip": ["gz"],
    "application/hjson": ["hjson"],
    "application/hyperstudio": ["stk"],
    "application/inkml+xml": ["ink", "inkml"],
    "application/ipfix": ["ipfix"],
    "application/its+xml": ["its"],
    "application/java-archive": ["jar", "war", "ear"],
    "application/java-serialized-object": ["ser"],
    "application/java-vm": ["class"],
    "application/javascript": ["js", "mjs"],
    "application/json": ["json", "map"],
    "application/json5": ["json5"],
    "application/jsonml+json": ["jsonml"],
    "application/ld+json": ["jsonld"],
    "application/lgr+xml": ["lgr"],
    "application/lost+xml": ["lostxml"],
    "application/mac-binhex40": ["hqx"],
    "application/mac-compactpro": ["cpt"],
    "application/mads+xml": ["mads"],
    "application/manifest+json": ["webmanifest"],
    "application/marc": ["mrc"],
    "application/marcxml+xml": ["mrcx"],
    "application/mathematica": ["ma", "nb", "mb"],
    "application/mathml+xml": ["mathml"],
    "application/mbox": ["mbox"],
    "application/mediaservercontrol+xml": ["mscml"],
    "application/metalink+xml": ["metalink"],
    "application/metalink4+xml": ["meta4"],
    "application/mets+xml": ["mets"],
    "application/mmt-aei+xml": ["maei"],
    "application/mmt-usd+xml": ["musd"],
    "application/mods+xml": ["mods"],
    "application/mp21": ["m21", "mp21"],
    "application/mp4": ["mp4s", "m4p"],
    "application/msword": ["doc", "dot"],
    "application/mxf": ["mxf"],
    "application/n-quads": ["nq"],
    "application/n-triples": ["nt"],
    "application/node": ["cjs"],
    "application/octet-stream": [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer",
    ],
    "application/oda": ["oda"],
    "application/oebps-package+xml": ["opf"],
    "application/ogg": ["ogx"],
    "application/omdoc+xml": ["omdoc"],
    "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
    "application/oxps": ["oxps"],
    "application/p2p-overlay+xml": ["relo"],
    "application/patch-ops-error+xml": ["xer"],
    "application/pdf": ["pdf"],
    "application/pgp-encrypted": ["pgp"],
    "application/pgp-signature": ["asc", "sig"],
    "application/pics-rules": ["prf"],
    "application/pkcs10": ["p10"],
    "application/pkcs7-mime": ["p7m", "p7c"],
    "application/pkcs7-signature": ["p7s"],
    "application/pkcs8": ["p8"],
    "application/pkix-attr-cert": ["ac"],
    "application/pkix-cert": ["cer"],
    "application/pkix-crl": ["crl"],
    "application/pkix-pkipath": ["pkipath"],
    "application/pkixcmp": ["pki"],
    "application/pls+xml": ["pls"],
    "application/postscript": ["ai", "eps", "ps"],
    "application/provenance+xml": ["provx"],
    "application/pskc+xml": ["pskcxml"],
    "application/raml+yaml": ["raml"],
    "application/rdf+xml": ["rdf", "owl"],
    "application/reginfo+xml": ["rif"],
    "application/relax-ng-compact-syntax": ["rnc"],
    "application/resource-lists+xml": ["rl"],
    "application/resource-lists-diff+xml": ["rld"],
    "application/rls-services+xml": ["rs"],
    "application/route-apd+xml": ["rapd"],
    "application/route-s-tsid+xml": ["sls"],
    "application/route-usd+xml": ["rusd"],
    "application/rpki-ghostbusters": ["gbr"],
    "application/rpki-manifest": ["mft"],
    "application/rpki-roa": ["roa"],
    "application/rsd+xml": ["rsd"],
    "application/rss+xml": ["rss"],
    "application/rtf": ["rtf"],
    "application/sbml+xml": ["sbml"],
    "application/scvp-cv-request": ["scq"],
    "application/scvp-cv-response": ["scs"],
    "application/scvp-vp-request": ["spq"],
    "application/scvp-vp-response": ["spp"],
    "application/sdp": ["sdp"],
    "application/senml+xml": ["senmlx"],
    "application/sensml+xml": ["sensmlx"],
    "application/set-payment-initiation": ["setpay"],
    "application/set-registration-initiation": ["setreg"],
    "application/shf+xml": ["shf"],
    "application/sieve": ["siv", "sieve"],
    "application/smil+xml": ["smi", "smil"],
    "application/sparql-query": ["rq"],
    "application/sparql-results+xml": ["srx"],
    "application/srgs": ["gram"],
    "application/srgs+xml": ["grxml"],
    "application/sru+xml": ["sru"],
    "application/ssdl+xml": ["ssdl"],
    "application/ssml+xml": ["ssml"],
    "application/swid+xml": ["swidtag"],
    "application/tei+xml": ["tei", "teicorpus"],
    "application/thraud+xml": ["tfi"],
    "application/timestamped-data": ["tsd"],
    "application/toml": ["toml"],
    "application/trig": ["trig"],
    "application/ttml+xml": ["ttml"],
    "application/ubjson": ["ubj"],
    "application/urc-ressheet+xml": ["rsheet"],
    "application/urc-targetdesc+xml": ["td"],
    "application/voicexml+xml": ["vxml"],
    "application/wasm": ["wasm"],
    "application/widget": ["wgt"],
    "application/winhlp": ["hlp"],
    "application/wsdl+xml": ["wsdl"],
    "application/wspolicy+xml": ["wspolicy"],
    "application/xaml+xml": ["xaml"],
    "application/xcap-att+xml": ["xav"],
    "application/xcap-caps+xml": ["xca"],
    "application/xcap-diff+xml": ["xdf"],
    "application/xcap-el+xml": ["xel"],
    "application/xcap-ns+xml": ["xns"],
    "application/xenc+xml": ["xenc"],
    "application/xhtml+xml": ["xhtml", "xht"],
    "application/xliff+xml": ["xlf"],
    "application/xml": ["xml", "xsl", "xsd", "rng"],
    "application/xml-dtd": ["dtd"],
    "application/xop+xml": ["xop"],
    "application/xproc+xml": ["xpl"],
    "application/xslt+xml": ["*xsl", "xslt"],
    "application/xspf+xml": ["xspf"],
    "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
    "application/yang": ["yang"],
    "application/yin+xml": ["yin"],
    "application/zip": ["zip"],
    "audio/3gpp": ["*3gpp"],
    "audio/adpcm": ["adp"],
    "audio/amr": ["amr"],
    "audio/basic": ["au", "snd"],
    "audio/midi": ["mid", "midi", "kar", "rmi"],
    "audio/mobile-xmf": ["mxmf"],
    "audio/mp3": ["*mp3"],
    "audio/mp4": ["m4a", "mp4a"],
    "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
    "audio/ogg": ["oga", "ogg", "spx", "opus"],
    "audio/s3m": ["s3m"],
    "audio/silk": ["sil"],
    "audio/wav": ["wav"],
    "audio/wave": ["*wav"],
    "audio/webm": ["weba"],
    "audio/xm": ["xm"],
    "font/collection": ["ttc"],
    "font/otf": ["otf"],
    "font/ttf": ["ttf"],
    "font/woff": ["woff"],
    "font/woff2": ["woff2"],
    "image/aces": ["exr"],
    "image/apng": ["apng"],
    "image/avif": ["avif"],
    "image/bmp": ["bmp"],
    "image/cgm": ["cgm"],
    "image/dicom-rle": ["drle"],
    "image/emf": ["emf"],
    "image/fits": ["fits"],
    "image/g3fax": ["g3"],
    "image/gif": ["gif"],
    "image/heic": ["heic"],
    "image/heic-sequence": ["heics"],
    "image/heif": ["heif"],
    "image/heif-sequence": ["heifs"],
    "image/hej2k": ["hej2"],
    "image/hsj2": ["hsj2"],
    "image/ief": ["ief"],
    "image/jls": ["jls"],
    "image/jp2": ["jp2", "jpg2"],
    "image/jpeg": ["jpeg", "jpg", "jpe"],
    "image/jph": ["jph"],
    "image/jphc": ["jhc"],
    "image/jpm": ["jpm"],
    "image/jpx": ["jpx", "jpf"],
    "image/jxr": ["jxr"],
    "image/jxra": ["jxra"],
    "image/jxrs": ["jxrs"],
    "image/jxs": ["jxs"],
    "image/jxsc": ["jxsc"],
    "image/jxsi": ["jxsi"],
    "image/jxss": ["jxss"],
    "image/ktx": ["ktx"],
    "image/ktx2": ["ktx2"],
    "image/png": ["png"],
    "image/sgi": ["sgi"],
    "image/svg+xml": ["svg", "svgz"],
    "image/t38": ["t38"],
    "image/tiff": ["tif", "tiff"],
    "image/tiff-fx": ["tfx"],
    "image/webp": ["webp"],
    "image/wmf": ["wmf"],
    "message/disposition-notification": ["disposition-notification"],
    "message/global": ["u8msg"],
    "message/global-delivery-status": ["u8dsn"],
    "message/global-disposition-notification": ["u8mdn"],
    "message/global-headers": ["u8hdr"],
    "message/rfc822": ["eml", "mime"],
    "model/3mf": ["3mf"],
    "model/gltf+json": ["gltf"],
    "model/gltf-binary": ["glb"],
    "model/iges": ["igs", "iges"],
    "model/mesh": ["msh", "mesh", "silo"],
    "model/mtl": ["mtl"],
    "model/obj": ["obj"],
    "model/step+xml": ["stpx"],
    "model/step+zip": ["stpz"],
    "model/step-xml+zip": ["stpxz"],
    "model/stl": ["stl"],
    "model/vrml": ["wrl", "vrml"],
    "model/x3d+binary": ["*x3db", "x3dbz"],
    "model/x3d+fastinfoset": ["x3db"],
    "model/x3d+vrml": ["*x3dv", "x3dvz"],
    "model/x3d+xml": ["x3d", "x3dz"],
    "model/x3d-vrml": ["x3dv"],
    "text/cache-manifest": ["appcache", "manifest"],
    "text/calendar": ["ics", "ifb"],
    "text/coffeescript": ["coffee", "litcoffee"],
    "text/css": ["css"],
    "text/csv": ["csv"],
    "text/html": ["html", "htm", "shtml"],
    "text/jade": ["jade"],
    "text/jsx": ["jsx"],
    "text/less": ["less"],
    "text/markdown": ["markdown", "md"],
    "text/mathml": ["mml"],
    "text/mdx": ["mdx"],
    "text/n3": ["n3"],
    "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
    "text/richtext": ["rtx"],
    "text/rtf": ["*rtf"],
    "text/sgml": ["sgml", "sgm"],
    "text/shex": ["shex"],
    "text/slim": ["slim", "slm"],
    "text/spdx": ["spdx"],
    "text/stylus": ["stylus", "styl"],
    "text/tab-separated-values": ["tsv"],
    "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
    "text/turtle": ["ttl"],
    "text/uri-list": ["uri", "uris", "urls"],
    "text/vcard": ["vcard"],
    "text/vtt": ["vtt"],
    "text/xml": ["*xml"],
    "text/yaml": ["yaml", "yml"],
    "video/3gpp": ["3gp", "3gpp"],
    "video/3gpp2": ["3g2"],
    "video/h261": ["h261"],
    "video/h263": ["h263"],
    "video/h264": ["h264"],
    "video/iso.segment": ["m4s"],
    "video/jpeg": ["jpgv"],
    "video/jpm": ["*jpm", "jpgm"],
    "video/mj2": ["mj2", "mjp2"],
    "video/mp2t": ["ts"],
    "video/mp4": ["mp4", "mp4v", "mpg4"],
    "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
    "video/ogg": ["ogv"],
    "video/quicktime": ["qt", "mov"],
    "video/webm": ["webm"],
  };
});
var Pi = K((yD, $i) => {
  $i.exports = {
    "application/prs.cww": ["cww"],
    "application/vnd.1000minds.decision-model+xml": ["1km"],
    "application/vnd.3gpp.pic-bw-large": ["plb"],
    "application/vnd.3gpp.pic-bw-small": ["psb"],
    "application/vnd.3gpp.pic-bw-var": ["pvb"],
    "application/vnd.3gpp2.tcap": ["tcap"],
    "application/vnd.3m.post-it-notes": ["pwn"],
    "application/vnd.accpac.simply.aso": ["aso"],
    "application/vnd.accpac.simply.imp": ["imp"],
    "application/vnd.acucobol": ["acu"],
    "application/vnd.acucorp": ["atc", "acutc"],
    "application/vnd.adobe.air-application-installer-package+zip": ["air"],
    "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
    "application/vnd.adobe.fxp": ["fxp", "fxpl"],
    "application/vnd.adobe.xdp+xml": ["xdp"],
    "application/vnd.adobe.xfdf": ["xfdf"],
    "application/vnd.ahead.space": ["ahead"],
    "application/vnd.airzip.filesecure.azf": ["azf"],
    "application/vnd.airzip.filesecure.azs": ["azs"],
    "application/vnd.amazon.ebook": ["azw"],
    "application/vnd.americandynamics.acc": ["acc"],
    "application/vnd.amiga.ami": ["ami"],
    "application/vnd.android.package-archive": ["apk"],
    "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
    "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
    "application/vnd.antix.game-component": ["atx"],
    "application/vnd.apple.installer+xml": ["mpkg"],
    "application/vnd.apple.keynote": ["key"],
    "application/vnd.apple.mpegurl": ["m3u8"],
    "application/vnd.apple.numbers": ["numbers"],
    "application/vnd.apple.pages": ["pages"],
    "application/vnd.apple.pkpass": ["pkpass"],
    "application/vnd.aristanetworks.swi": ["swi"],
    "application/vnd.astraea-software.iota": ["iota"],
    "application/vnd.audiograph": ["aep"],
    "application/vnd.balsamiq.bmml+xml": ["bmml"],
    "application/vnd.blueice.multipass": ["mpm"],
    "application/vnd.bmi": ["bmi"],
    "application/vnd.businessobjects": ["rep"],
    "application/vnd.chemdraw+xml": ["cdxml"],
    "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
    "application/vnd.cinderella": ["cdy"],
    "application/vnd.citationstyles.style+xml": ["csl"],
    "application/vnd.claymore": ["cla"],
    "application/vnd.cloanto.rp9": ["rp9"],
    "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
    "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
    "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
    "application/vnd.commonspace": ["csp"],
    "application/vnd.contact.cmsg": ["cdbcmsg"],
    "application/vnd.cosmocaller": ["cmc"],
    "application/vnd.crick.clicker": ["clkx"],
    "application/vnd.crick.clicker.keyboard": ["clkk"],
    "application/vnd.crick.clicker.palette": ["clkp"],
    "application/vnd.crick.clicker.template": ["clkt"],
    "application/vnd.crick.clicker.wordbank": ["clkw"],
    "application/vnd.criticaltools.wbs+xml": ["wbs"],
    "application/vnd.ctc-posml": ["pml"],
    "application/vnd.cups-ppd": ["ppd"],
    "application/vnd.curl.car": ["car"],
    "application/vnd.curl.pcurl": ["pcurl"],
    "application/vnd.dart": ["dart"],
    "application/vnd.data-vision.rdz": ["rdz"],
    "application/vnd.dbf": ["dbf"],
    "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
    "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
    "application/vnd.dece.unspecified": ["uvx", "uvvx"],
    "application/vnd.dece.zip": ["uvz", "uvvz"],
    "application/vnd.denovo.fcselayout-link": ["fe_launch"],
    "application/vnd.dna": ["dna"],
    "application/vnd.dolby.mlp": ["mlp"],
    "application/vnd.dpgraph": ["dpg"],
    "application/vnd.dreamfactory": ["dfac"],
    "application/vnd.ds-keypoint": ["kpxx"],
    "application/vnd.dvb.ait": ["ait"],
    "application/vnd.dvb.service": ["svc"],
    "application/vnd.dynageo": ["geo"],
    "application/vnd.ecowin.chart": ["mag"],
    "application/vnd.enliven": ["nml"],
    "application/vnd.epson.esf": ["esf"],
    "application/vnd.epson.msf": ["msf"],
    "application/vnd.epson.quickanime": ["qam"],
    "application/vnd.epson.salt": ["slt"],
    "application/vnd.epson.ssf": ["ssf"],
    "application/vnd.eszigno3+xml": ["es3", "et3"],
    "application/vnd.ezpix-album": ["ez2"],
    "application/vnd.ezpix-package": ["ez3"],
    "application/vnd.fdf": ["fdf"],
    "application/vnd.fdsn.mseed": ["mseed"],
    "application/vnd.fdsn.seed": ["seed", "dataless"],
    "application/vnd.flographit": ["gph"],
    "application/vnd.fluxtime.clip": ["ftc"],
    "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
    "application/vnd.frogans.fnc": ["fnc"],
    "application/vnd.frogans.ltf": ["ltf"],
    "application/vnd.fsc.weblaunch": ["fsc"],
    "application/vnd.fujitsu.oasys": ["oas"],
    "application/vnd.fujitsu.oasys2": ["oa2"],
    "application/vnd.fujitsu.oasys3": ["oa3"],
    "application/vnd.fujitsu.oasysgp": ["fg5"],
    "application/vnd.fujitsu.oasysprs": ["bh2"],
    "application/vnd.fujixerox.ddd": ["ddd"],
    "application/vnd.fujixerox.docuworks": ["xdw"],
    "application/vnd.fujixerox.docuworks.binder": ["xbd"],
    "application/vnd.fuzzysheet": ["fzs"],
    "application/vnd.genomatix.tuxedo": ["txd"],
    "application/vnd.geogebra.file": ["ggb"],
    "application/vnd.geogebra.tool": ["ggt"],
    "application/vnd.geometry-explorer": ["gex", "gre"],
    "application/vnd.geonext": ["gxt"],
    "application/vnd.geoplan": ["g2w"],
    "application/vnd.geospace": ["g3w"],
    "application/vnd.gmx": ["gmx"],
    "application/vnd.google-apps.document": ["gdoc"],
    "application/vnd.google-apps.presentation": ["gslides"],
    "application/vnd.google-apps.spreadsheet": ["gsheet"],
    "application/vnd.google-earth.kml+xml": ["kml"],
    "application/vnd.google-earth.kmz": ["kmz"],
    "application/vnd.grafeq": ["gqf", "gqs"],
    "application/vnd.groove-account": ["gac"],
    "application/vnd.groove-help": ["ghf"],
    "application/vnd.groove-identity-message": ["gim"],
    "application/vnd.groove-injector": ["grv"],
    "application/vnd.groove-tool-message": ["gtm"],
    "application/vnd.groove-tool-template": ["tpl"],
    "application/vnd.groove-vcard": ["vcg"],
    "application/vnd.hal+xml": ["hal"],
    "application/vnd.handheld-entertainment+xml": ["zmm"],
    "application/vnd.hbci": ["hbci"],
    "application/vnd.hhe.lesson-player": ["les"],
    "application/vnd.hp-hpgl": ["hpgl"],
    "application/vnd.hp-hpid": ["hpid"],
    "application/vnd.hp-hps": ["hps"],
    "application/vnd.hp-jlyt": ["jlt"],
    "application/vnd.hp-pcl": ["pcl"],
    "application/vnd.hp-pclxl": ["pclxl"],
    "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
    "application/vnd.ibm.minipay": ["mpy"],
    "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
    "application/vnd.ibm.rights-management": ["irm"],
    "application/vnd.ibm.secure-container": ["sc"],
    "application/vnd.iccprofile": ["icc", "icm"],
    "application/vnd.igloader": ["igl"],
    "application/vnd.immervision-ivp": ["ivp"],
    "application/vnd.immervision-ivu": ["ivu"],
    "application/vnd.insors.igm": ["igm"],
    "application/vnd.intercon.formnet": ["xpw", "xpx"],
    "application/vnd.intergeo": ["i2g"],
    "application/vnd.intu.qbo": ["qbo"],
    "application/vnd.intu.qfx": ["qfx"],
    "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
    "application/vnd.irepository.package+xml": ["irp"],
    "application/vnd.is-xpr": ["xpr"],
    "application/vnd.isac.fcs": ["fcs"],
    "application/vnd.jam": ["jam"],
    "application/vnd.jcp.javame.midlet-rms": ["rms"],
    "application/vnd.jisp": ["jisp"],
    "application/vnd.joost.joda-archive": ["joda"],
    "application/vnd.kahootz": ["ktz", "ktr"],
    "application/vnd.kde.karbon": ["karbon"],
    "application/vnd.kde.kchart": ["chrt"],
    "application/vnd.kde.kformula": ["kfo"],
    "application/vnd.kde.kivio": ["flw"],
    "application/vnd.kde.kontour": ["kon"],
    "application/vnd.kde.kpresenter": ["kpr", "kpt"],
    "application/vnd.kde.kspread": ["ksp"],
    "application/vnd.kde.kword": ["kwd", "kwt"],
    "application/vnd.kenameaapp": ["htke"],
    "application/vnd.kidspiration": ["kia"],
    "application/vnd.kinar": ["kne", "knp"],
    "application/vnd.koan": ["skp", "skd", "skt", "skm"],
    "application/vnd.kodak-descriptor": ["sse"],
    "application/vnd.las.las+xml": ["lasxml"],
    "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
    "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
    "application/vnd.lotus-1-2-3": ["123"],
    "application/vnd.lotus-approach": ["apr"],
    "application/vnd.lotus-freelance": ["pre"],
    "application/vnd.lotus-notes": ["nsf"],
    "application/vnd.lotus-organizer": ["org"],
    "application/vnd.lotus-screencam": ["scm"],
    "application/vnd.lotus-wordpro": ["lwp"],
    "application/vnd.macports.portpkg": ["portpkg"],
    "application/vnd.mapbox-vector-tile": ["mvt"],
    "application/vnd.mcd": ["mcd"],
    "application/vnd.medcalcdata": ["mc1"],
    "application/vnd.mediastation.cdkey": ["cdkey"],
    "application/vnd.mfer": ["mwf"],
    "application/vnd.mfmp": ["mfm"],
    "application/vnd.micrografx.flo": ["flo"],
    "application/vnd.micrografx.igx": ["igx"],
    "application/vnd.mif": ["mif"],
    "application/vnd.mobius.daf": ["daf"],
    "application/vnd.mobius.dis": ["dis"],
    "application/vnd.mobius.mbk": ["mbk"],
    "application/vnd.mobius.mqy": ["mqy"],
    "application/vnd.mobius.msl": ["msl"],
    "application/vnd.mobius.plc": ["plc"],
    "application/vnd.mobius.txf": ["txf"],
    "application/vnd.mophun.application": ["mpn"],
    "application/vnd.mophun.certificate": ["mpc"],
    "application/vnd.mozilla.xul+xml": ["xul"],
    "application/vnd.ms-artgalry": ["cil"],
    "application/vnd.ms-cab-compressed": ["cab"],
    "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
    "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
    "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
    "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
    "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
    "application/vnd.ms-fontobject": ["eot"],
    "application/vnd.ms-htmlhelp": ["chm"],
    "application/vnd.ms-ims": ["ims"],
    "application/vnd.ms-lrm": ["lrm"],
    "application/vnd.ms-officetheme": ["thmx"],
    "application/vnd.ms-outlook": ["msg"],
    "application/vnd.ms-pki.seccat": ["cat"],
    "application/vnd.ms-pki.stl": ["*stl"],
    "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
    "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
    "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
    "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
    "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
    "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
    "application/vnd.ms-project": ["mpp", "mpt"],
    "application/vnd.ms-word.document.macroenabled.12": ["docm"],
    "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
    "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
    "application/vnd.ms-wpl": ["wpl"],
    "application/vnd.ms-xpsdocument": ["xps"],
    "application/vnd.mseq": ["mseq"],
    "application/vnd.musician": ["mus"],
    "application/vnd.muvee.style": ["msty"],
    "application/vnd.mynfc": ["taglet"],
    "application/vnd.neurolanguage.nlu": ["nlu"],
    "application/vnd.nitf": ["ntf", "nitf"],
    "application/vnd.noblenet-directory": ["nnd"],
    "application/vnd.noblenet-sealer": ["nns"],
    "application/vnd.noblenet-web": ["nnw"],
    "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
    "application/vnd.nokia.n-gage.data": ["ngdat"],
    "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
    "application/vnd.nokia.radio-preset": ["rpst"],
    "application/vnd.nokia.radio-presets": ["rpss"],
    "application/vnd.novadigm.edm": ["edm"],
    "application/vnd.novadigm.edx": ["edx"],
    "application/vnd.novadigm.ext": ["ext"],
    "application/vnd.oasis.opendocument.chart": ["odc"],
    "application/vnd.oasis.opendocument.chart-template": ["otc"],
    "application/vnd.oasis.opendocument.database": ["odb"],
    "application/vnd.oasis.opendocument.formula": ["odf"],
    "application/vnd.oasis.opendocument.formula-template": ["odft"],
    "application/vnd.oasis.opendocument.graphics": ["odg"],
    "application/vnd.oasis.opendocument.graphics-template": ["otg"],
    "application/vnd.oasis.opendocument.image": ["odi"],
    "application/vnd.oasis.opendocument.image-template": ["oti"],
    "application/vnd.oasis.opendocument.presentation": ["odp"],
    "application/vnd.oasis.opendocument.presentation-template": ["otp"],
    "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
    "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
    "application/vnd.oasis.opendocument.text": ["odt"],
    "application/vnd.oasis.opendocument.text-master": ["odm"],
    "application/vnd.oasis.opendocument.text-template": ["ott"],
    "application/vnd.oasis.opendocument.text-web": ["oth"],
    "application/vnd.olpc-sugar": ["xo"],
    "application/vnd.oma.dd2+xml": ["dd2"],
    "application/vnd.openblox.game+xml": ["obgx"],
    "application/vnd.openofficeorg.extension": ["oxt"],
    "application/vnd.openstreetmap.data+xml": ["osm"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ["pptx"],
    "application/vnd.openxmlformats-officedocument.presentationml.slide": [
      "sldx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
      "ppsx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.template": [
      "potx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      "xlsx",
    ],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
      "xltx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      "docx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
      "dotx",
    ],
    "application/vnd.osgeo.mapguide.package": ["mgp"],
    "application/vnd.osgi.dp": ["dp"],
    "application/vnd.osgi.subsystem": ["esa"],
    "application/vnd.palm": ["pdb", "pqa", "oprc"],
    "application/vnd.pawaafile": ["paw"],
    "application/vnd.pg.format": ["str"],
    "application/vnd.pg.osasli": ["ei6"],
    "application/vnd.picsel": ["efif"],
    "application/vnd.pmi.widget": ["wg"],
    "application/vnd.pocketlearn": ["plf"],
    "application/vnd.powerbuilder6": ["pbd"],
    "application/vnd.previewsystems.box": ["box"],
    "application/vnd.proteus.magazine": ["mgz"],
    "application/vnd.publishare-delta-tree": ["qps"],
    "application/vnd.pvi.ptid1": ["ptid"],
    "application/vnd.quark.quarkxpress": [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb",
    ],
    "application/vnd.rar": ["rar"],
    "application/vnd.realvnc.bed": ["bed"],
    "application/vnd.recordare.musicxml": ["mxl"],
    "application/vnd.recordare.musicxml+xml": ["musicxml"],
    "application/vnd.rig.cryptonote": ["cryptonote"],
    "application/vnd.rim.cod": ["cod"],
    "application/vnd.rn-realmedia": ["rm"],
    "application/vnd.rn-realmedia-vbr": ["rmvb"],
    "application/vnd.route66.link66+xml": ["link66"],
    "application/vnd.sailingtracker.track": ["st"],
    "application/vnd.seemail": ["see"],
    "application/vnd.sema": ["sema"],
    "application/vnd.semd": ["semd"],
    "application/vnd.semf": ["semf"],
    "application/vnd.shana.informed.formdata": ["ifm"],
    "application/vnd.shana.informed.formtemplate": ["itp"],
    "application/vnd.shana.informed.interchange": ["iif"],
    "application/vnd.shana.informed.package": ["ipk"],
    "application/vnd.simtech-mindmapper": ["twd", "twds"],
    "application/vnd.smaf": ["mmf"],
    "application/vnd.smart.teacher": ["teacher"],
    "application/vnd.software602.filler.form+xml": ["fo"],
    "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
    "application/vnd.spotfire.dxp": ["dxp"],
    "application/vnd.spotfire.sfs": ["sfs"],
    "application/vnd.stardivision.calc": ["sdc"],
    "application/vnd.stardivision.draw": ["sda"],
    "application/vnd.stardivision.impress": ["sdd"],
    "application/vnd.stardivision.math": ["smf"],
    "application/vnd.stardivision.writer": ["sdw", "vor"],
    "application/vnd.stardivision.writer-global": ["sgl"],
    "application/vnd.stepmania.package": ["smzip"],
    "application/vnd.stepmania.stepchart": ["sm"],
    "application/vnd.sun.wadl+xml": ["wadl"],
    "application/vnd.sun.xml.calc": ["sxc"],
    "application/vnd.sun.xml.calc.template": ["stc"],
    "application/vnd.sun.xml.draw": ["sxd"],
    "application/vnd.sun.xml.draw.template": ["std"],
    "application/vnd.sun.xml.impress": ["sxi"],
    "application/vnd.sun.xml.impress.template": ["sti"],
    "application/vnd.sun.xml.math": ["sxm"],
    "application/vnd.sun.xml.writer": ["sxw"],
    "application/vnd.sun.xml.writer.global": ["sxg"],
    "application/vnd.sun.xml.writer.template": ["stw"],
    "application/vnd.sus-calendar": ["sus", "susp"],
    "application/vnd.svd": ["svd"],
    "application/vnd.symbian.install": ["sis", "sisx"],
    "application/vnd.syncml+xml": ["xsm"],
    "application/vnd.syncml.dm+wbxml": ["bdm"],
    "application/vnd.syncml.dm+xml": ["xdm"],
    "application/vnd.syncml.dmddf+xml": ["ddf"],
    "application/vnd.tao.intent-module-archive": ["tao"],
    "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
    "application/vnd.tmobile-livetv": ["tmo"],
    "application/vnd.trid.tpt": ["tpt"],
    "application/vnd.triscape.mxs": ["mxs"],
    "application/vnd.trueapp": ["tra"],
    "application/vnd.ufdl": ["ufd", "ufdl"],
    "application/vnd.uiq.theme": ["utz"],
    "application/vnd.umajin": ["umj"],
    "application/vnd.unity": ["unityweb"],
    "application/vnd.uoml+xml": ["uoml"],
    "application/vnd.vcx": ["vcx"],
    "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
    "application/vnd.visionary": ["vis"],
    "application/vnd.vsf": ["vsf"],
    "application/vnd.wap.wbxml": ["wbxml"],
    "application/vnd.wap.wmlc": ["wmlc"],
    "application/vnd.wap.wmlscriptc": ["wmlsc"],
    "application/vnd.webturbo": ["wtb"],
    "application/vnd.wolfram.player": ["nbp"],
    "application/vnd.wordperfect": ["wpd"],
    "application/vnd.wqd": ["wqd"],
    "application/vnd.wt.stf": ["stf"],
    "application/vnd.xara": ["xar"],
    "application/vnd.xfdl": ["xfdl"],
    "application/vnd.yamaha.hv-dic": ["hvd"],
    "application/vnd.yamaha.hv-script": ["hvs"],
    "application/vnd.yamaha.hv-voice": ["hvp"],
    "application/vnd.yamaha.openscoreformat": ["osf"],
    "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
    "application/vnd.yamaha.smaf-audio": ["saf"],
    "application/vnd.yamaha.smaf-phrase": ["spf"],
    "application/vnd.yellowriver-custom-menu": ["cmp"],
    "application/vnd.zul": ["zir", "zirz"],
    "application/vnd.zzazz.deck+xml": ["zaz"],
    "application/x-7z-compressed": ["7z"],
    "application/x-abiword": ["abw"],
    "application/x-ace-compressed": ["ace"],
    "application/x-apple-diskimage": ["*dmg"],
    "application/x-arj": ["arj"],
    "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
    "application/x-authorware-map": ["aam"],
    "application/x-authorware-seg": ["aas"],
    "application/x-bcpio": ["bcpio"],
    "application/x-bdoc": ["*bdoc"],
    "application/x-bittorrent": ["torrent"],
    "application/x-blorb": ["blb", "blorb"],
    "application/x-bzip": ["bz"],
    "application/x-bzip2": ["bz2", "boz"],
    "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
    "application/x-cdlink": ["vcd"],
    "application/x-cfs-compressed": ["cfs"],
    "application/x-chat": ["chat"],
    "application/x-chess-pgn": ["pgn"],
    "application/x-chrome-extension": ["crx"],
    "application/x-cocoa": ["cco"],
    "application/x-conference": ["nsc"],
    "application/x-cpio": ["cpio"],
    "application/x-csh": ["csh"],
    "application/x-debian-package": ["*deb", "udeb"],
    "application/x-dgc-compressed": ["dgc"],
    "application/x-director": [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa",
    ],
    "application/x-doom": ["wad"],
    "application/x-dtbncx+xml": ["ncx"],
    "application/x-dtbook+xml": ["dtb"],
    "application/x-dtbresource+xml": ["res"],
    "application/x-dvi": ["dvi"],
    "application/x-envoy": ["evy"],
    "application/x-eva": ["eva"],
    "application/x-font-bdf": ["bdf"],
    "application/x-font-ghostscript": ["gsf"],
    "application/x-font-linux-psf": ["psf"],
    "application/x-font-pcf": ["pcf"],
    "application/x-font-snf": ["snf"],
    "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
    "application/x-freearc": ["arc"],
    "application/x-futuresplash": ["spl"],
    "application/x-gca-compressed": ["gca"],
    "application/x-glulx": ["ulx"],
    "application/x-gnumeric": ["gnumeric"],
    "application/x-gramps-xml": ["gramps"],
    "application/x-gtar": ["gtar"],
    "application/x-hdf": ["hdf"],
    "application/x-httpd-php": ["php"],
    "application/x-install-instructions": ["install"],
    "application/x-iso9660-image": ["*iso"],
    "application/x-iwork-keynote-sffkey": ["*key"],
    "application/x-iwork-numbers-sffnumbers": ["*numbers"],
    "application/x-iwork-pages-sffpages": ["*pages"],
    "application/x-java-archive-diff": ["jardiff"],
    "application/x-java-jnlp-file": ["jnlp"],
    "application/x-keepass2": ["kdbx"],
    "application/x-latex": ["latex"],
    "application/x-lua-bytecode": ["luac"],
    "application/x-lzh-compressed": ["lzh", "lha"],
    "application/x-makeself": ["run"],
    "application/x-mie": ["mie"],
    "application/x-mobipocket-ebook": ["prc", "mobi"],
    "application/x-ms-application": ["application"],
    "application/x-ms-shortcut": ["lnk"],
    "application/x-ms-wmd": ["wmd"],
    "application/x-ms-wmz": ["wmz"],
    "application/x-ms-xbap": ["xbap"],
    "application/x-msaccess": ["mdb"],
    "application/x-msbinder": ["obd"],
    "application/x-mscardfile": ["crd"],
    "application/x-msclip": ["clp"],
    "application/x-msdos-program": ["*exe"],
    "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
    "application/x-msmediaview": ["mvb", "m13", "m14"],
    "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
    "application/x-msmoney": ["mny"],
    "application/x-mspublisher": ["pub"],
    "application/x-msschedule": ["scd"],
    "application/x-msterminal": ["trm"],
    "application/x-mswrite": ["wri"],
    "application/x-netcdf": ["nc", "cdf"],
    "application/x-ns-proxy-autoconfig": ["pac"],
    "application/x-nzb": ["nzb"],
    "application/x-perl": ["pl", "pm"],
    "application/x-pilot": ["*prc", "*pdb"],
    "application/x-pkcs12": ["p12", "pfx"],
    "application/x-pkcs7-certificates": ["p7b", "spc"],
    "application/x-pkcs7-certreqresp": ["p7r"],
    "application/x-rar-compressed": ["*rar"],
    "application/x-redhat-package-manager": ["rpm"],
    "application/x-research-info-systems": ["ris"],
    "application/x-sea": ["sea"],
    "application/x-sh": ["sh"],
    "application/x-shar": ["shar"],
    "application/x-shockwave-flash": ["swf"],
    "application/x-silverlight-app": ["xap"],
    "application/x-sql": ["sql"],
    "application/x-stuffit": ["sit"],
    "application/x-stuffitx": ["sitx"],
    "application/x-subrip": ["srt"],
    "application/x-sv4cpio": ["sv4cpio"],
    "application/x-sv4crc": ["sv4crc"],
    "application/x-t3vm-image": ["t3"],
    "application/x-tads": ["gam"],
    "application/x-tar": ["tar"],
    "application/x-tcl": ["tcl", "tk"],
    "application/x-tex": ["tex"],
    "application/x-tex-tfm": ["tfm"],
    "application/x-texinfo": ["texinfo", "texi"],
    "application/x-tgif": ["*obj"],
    "application/x-ustar": ["ustar"],
    "application/x-virtualbox-hdd": ["hdd"],
    "application/x-virtualbox-ova": ["ova"],
    "application/x-virtualbox-ovf": ["ovf"],
    "application/x-virtualbox-vbox": ["vbox"],
    "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
    "application/x-virtualbox-vdi": ["vdi"],
    "application/x-virtualbox-vhd": ["vhd"],
    "application/x-virtualbox-vmdk": ["vmdk"],
    "application/x-wais-source": ["src"],
    "application/x-web-app-manifest+json": ["webapp"],
    "application/x-x509-ca-cert": ["der", "crt", "pem"],
    "application/x-xfig": ["fig"],
    "application/x-xliff+xml": ["*xlf"],
    "application/x-xpinstall": ["xpi"],
    "application/x-xz": ["xz"],
    "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
    "audio/vnd.dece.audio": ["uva", "uvva"],
    "audio/vnd.digital-winds": ["eol"],
    "audio/vnd.dra": ["dra"],
    "audio/vnd.dts": ["dts"],
    "audio/vnd.dts.hd": ["dtshd"],
    "audio/vnd.lucent.voice": ["lvp"],
    "audio/vnd.ms-playready.media.pya": ["pya"],
    "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
    "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
    "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
    "audio/vnd.rip": ["rip"],
    "audio/x-aac": ["aac"],
    "audio/x-aiff": ["aif", "aiff", "aifc"],
    "audio/x-caf": ["caf"],
    "audio/x-flac": ["flac"],
    "audio/x-m4a": ["*m4a"],
    "audio/x-matroska": ["mka"],
    "audio/x-mpegurl": ["m3u"],
    "audio/x-ms-wax": ["wax"],
    "audio/x-ms-wma": ["wma"],
    "audio/x-pn-realaudio": ["ram", "ra"],
    "audio/x-pn-realaudio-plugin": ["rmp"],
    "audio/x-realaudio": ["*ra"],
    "audio/x-wav": ["*wav"],
    "chemical/x-cdx": ["cdx"],
    "chemical/x-cif": ["cif"],
    "chemical/x-cmdf": ["cmdf"],
    "chemical/x-cml": ["cml"],
    "chemical/x-csml": ["csml"],
    "chemical/x-xyz": ["xyz"],
    "image/prs.btif": ["btif"],
    "image/prs.pti": ["pti"],
    "image/vnd.adobe.photoshop": ["psd"],
    "image/vnd.airzip.accelerator.azv": ["azv"],
    "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
    "image/vnd.djvu": ["djvu", "djv"],
    "image/vnd.dvb.subtitle": ["*sub"],
    "image/vnd.dwg": ["dwg"],
    "image/vnd.dxf": ["dxf"],
    "image/vnd.fastbidsheet": ["fbs"],
    "image/vnd.fpx": ["fpx"],
    "image/vnd.fst": ["fst"],
    "image/vnd.fujixerox.edmics-mmr": ["mmr"],
    "image/vnd.fujixerox.edmics-rlc": ["rlc"],
    "image/vnd.microsoft.icon": ["ico"],
    "image/vnd.ms-dds": ["dds"],
    "image/vnd.ms-modi": ["mdi"],
    "image/vnd.ms-photo": ["wdp"],
    "image/vnd.net-fpx": ["npx"],
    "image/vnd.pco.b16": ["b16"],
    "image/vnd.tencent.tap": ["tap"],
    "image/vnd.valve.source.texture": ["vtf"],
    "image/vnd.wap.wbmp": ["wbmp"],
    "image/vnd.xiff": ["xif"],
    "image/vnd.zbrush.pcx": ["pcx"],
    "image/x-3ds": ["3ds"],
    "image/x-cmu-raster": ["ras"],
    "image/x-cmx": ["cmx"],
    "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
    "image/x-icon": ["*ico"],
    "image/x-jng": ["jng"],
    "image/x-mrsid-image": ["sid"],
    "image/x-ms-bmp": ["*bmp"],
    "image/x-pcx": ["*pcx"],
    "image/x-pict": ["pic", "pct"],
    "image/x-portable-anymap": ["pnm"],
    "image/x-portable-bitmap": ["pbm"],
    "image/x-portable-graymap": ["pgm"],
    "image/x-portable-pixmap": ["ppm"],
    "image/x-rgb": ["rgb"],
    "image/x-tga": ["tga"],
    "image/x-xbitmap": ["xbm"],
    "image/x-xpixmap": ["xpm"],
    "image/x-xwindowdump": ["xwd"],
    "message/vnd.wfa.wsc": ["wsc"],
    "model/vnd.collada+xml": ["dae"],
    "model/vnd.dwf": ["dwf"],
    "model/vnd.gdl": ["gdl"],
    "model/vnd.gtw": ["gtw"],
    "model/vnd.mts": ["mts"],
    "model/vnd.opengex": ["ogex"],
    "model/vnd.parasolid.transmit.binary": ["x_b"],
    "model/vnd.parasolid.transmit.text": ["x_t"],
    "model/vnd.sap.vds": ["vds"],
    "model/vnd.usdz+zip": ["usdz"],
    "model/vnd.valve.source.compiled-map": ["bsp"],
    "model/vnd.vtu": ["vtu"],
    "text/prs.lines.tag": ["dsc"],
    "text/vnd.curl": ["curl"],
    "text/vnd.curl.dcurl": ["dcurl"],
    "text/vnd.curl.mcurl": ["mcurl"],
    "text/vnd.curl.scurl": ["scurl"],
    "text/vnd.dvb.subtitle": ["sub"],
    "text/vnd.fly": ["fly"],
    "text/vnd.fmi.flexstor": ["flx"],
    "text/vnd.graphviz": ["gv"],
    "text/vnd.in3d.3dml": ["3dml"],
    "text/vnd.in3d.spot": ["spot"],
    "text/vnd.sun.j2me.app-descriptor": ["jad"],
    "text/vnd.wap.wml": ["wml"],
    "text/vnd.wap.wmlscript": ["wmls"],
    "text/x-asm": ["s", "asm"],
    "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
    "text/x-component": ["htc"],
    "text/x-fortran": ["f", "for", "f77", "f90"],
    "text/x-handlebars-template": ["hbs"],
    "text/x-java-source": ["java"],
    "text/x-lua": ["lua"],
    "text/x-markdown": ["mkd"],
    "text/x-nfo": ["nfo"],
    "text/x-opml": ["opml"],
    "text/x-org": ["*org"],
    "text/x-pascal": ["p", "pas"],
    "text/x-processing": ["pde"],
    "text/x-sass": ["sass"],
    "text/x-scss": ["scss"],
    "text/x-setext": ["etx"],
    "text/x-sfv": ["sfv"],
    "text/x-suse-ymp": ["ymp"],
    "text/x-uuencode": ["uu"],
    "text/x-vcalendar": ["vcs"],
    "text/x-vcard": ["vcf"],
    "video/vnd.dece.hd": ["uvh", "uvvh"],
    "video/vnd.dece.mobile": ["uvm", "uvvm"],
    "video/vnd.dece.pd": ["uvp", "uvvp"],
    "video/vnd.dece.sd": ["uvs", "uvvs"],
    "video/vnd.dece.video": ["uvv", "uvvv"],
    "video/vnd.dvb.file": ["dvb"],
    "video/vnd.fvt": ["fvt"],
    "video/vnd.mpegurl": ["mxu", "m4u"],
    "video/vnd.ms-playready.media.pyv": ["pyv"],
    "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
    "video/vnd.vivo": ["viv"],
    "video/x-f4v": ["f4v"],
    "video/x-fli": ["fli"],
    "video/x-flv": ["flv"],
    "video/x-m4v": ["m4v"],
    "video/x-matroska": ["mkv", "mk3d", "mks"],
    "video/x-mng": ["mng"],
    "video/x-ms-asf": ["asf", "asx"],
    "video/x-ms-vob": ["vob"],
    "video/x-ms-wm": ["wm"],
    "video/x-ms-wmv": ["wmv"],
    "video/x-ms-wmx": ["wmx"],
    "video/x-ms-wvx": ["wvx"],
    "video/x-msvideo": ["avi"],
    "video/x-sgi-movie": ["movie"],
    "video/x-smv": ["smv"],
    "x-conference/x-cooltalk": ["ice"],
  };
});
var $e = K((FD, Ii) => {
  "use strict";
  var Pu = Ln();
  Ii.exports = new Pu(zn(), Pi());
});
function Un({ onlyFirst: e = !1 } = {}) {
  let t = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
  ].join("|");
  return new RegExp(t, e ? void 0 : "g");
}
var Mi = Z(() => {});
var ED,
  Oi = Z(() => {
    Mi();
    ED = Un();
  });
var Li = K((SD, Hn) => {
  var Fe = {};
  typeof Hn > "u" ? (window.eastasianwidth = Fe) : (Hn.exports = Fe);
  Fe.eastAsianWidth = function (e) {
    var t = e.charCodeAt(0),
      r = e.length == 2 ? e.charCodeAt(1) : 0,
      n = t;
    return (
      55296 <= t &&
        t <= 56319 &&
        56320 <= r &&
        r <= 57343 &&
        ((t &= 1023), (r &= 1023), (n = (t << 10) | r), (n += 65536)),
      n == 12288 || (65281 <= n && n <= 65376) || (65504 <= n && n <= 65510)
        ? "F"
        : n == 8361 ||
          (65377 <= n && n <= 65470) ||
          (65474 <= n && n <= 65479) ||
          (65482 <= n && n <= 65487) ||
          (65490 <= n && n <= 65495) ||
          (65498 <= n && n <= 65500) ||
          (65512 <= n && n <= 65518)
        ? "H"
        : (4352 <= n && n <= 4447) ||
          (4515 <= n && n <= 4519) ||
          (4602 <= n && n <= 4607) ||
          (9001 <= n && n <= 9002) ||
          (11904 <= n && n <= 11929) ||
          (11931 <= n && n <= 12019) ||
          (12032 <= n && n <= 12245) ||
          (12272 <= n && n <= 12283) ||
          (12289 <= n && n <= 12350) ||
          (12353 <= n && n <= 12438) ||
          (12441 <= n && n <= 12543) ||
          (12549 <= n && n <= 12589) ||
          (12593 <= n && n <= 12686) ||
          (12688 <= n && n <= 12730) ||
          (12736 <= n && n <= 12771) ||
          (12784 <= n && n <= 12830) ||
          (12832 <= n && n <= 12871) ||
          (12880 <= n && n <= 13054) ||
          (13056 <= n && n <= 19903) ||
          (19968 <= n && n <= 42124) ||
          (42128 <= n && n <= 42182) ||
          (43360 <= n && n <= 43388) ||
          (44032 <= n && n <= 55203) ||
          (55216 <= n && n <= 55238) ||
          (55243 <= n && n <= 55291) ||
          (63744 <= n && n <= 64255) ||
          (65040 <= n && n <= 65049) ||
          (65072 <= n && n <= 65106) ||
          (65108 <= n && n <= 65126) ||
          (65128 <= n && n <= 65131) ||
          (110592 <= n && n <= 110593) ||
          (127488 <= n && n <= 127490) ||
          (127504 <= n && n <= 127546) ||
          (127552 <= n && n <= 127560) ||
          (127568 <= n && n <= 127569) ||
          (131072 <= n && n <= 194367) ||
          (177984 <= n && n <= 196605) ||
          (196608 <= n && n <= 262141)
        ? "W"
        : (32 <= n && n <= 126) ||
          (162 <= n && n <= 163) ||
          (165 <= n && n <= 166) ||
          n == 172 ||
          n == 175 ||
          (10214 <= n && n <= 10221) ||
          (10629 <= n && n <= 10630)
        ? "Na"
        : n == 161 ||
          n == 164 ||
          (167 <= n && n <= 168) ||
          n == 170 ||
          (173 <= n && n <= 174) ||
          (176 <= n && n <= 180) ||
          (182 <= n && n <= 186) ||
          (188 <= n && n <= 191) ||
          n == 198 ||
          n == 208 ||
          (215 <= n && n <= 216) ||
          (222 <= n && n <= 225) ||
          n == 230 ||
          (232 <= n && n <= 234) ||
          (236 <= n && n <= 237) ||
          n == 240 ||
          (242 <= n && n <= 243) ||
          (247 <= n && n <= 250) ||
          n == 252 ||
          n == 254 ||
          n == 257 ||
          n == 273 ||
          n == 275 ||
          n == 283 ||
          (294 <= n && n <= 295) ||
          n == 299 ||
          (305 <= n && n <= 307) ||
          n == 312 ||
          (319 <= n && n <= 322) ||
          n == 324 ||
          (328 <= n && n <= 331) ||
          n == 333 ||
          (338 <= n && n <= 339) ||
          (358 <= n && n <= 359) ||
          n == 363 ||
          n == 462 ||
          n == 464 ||
          n == 466 ||
          n == 468 ||
          n == 470 ||
          n == 472 ||
          n == 474 ||
          n == 476 ||
          n == 593 ||
          n == 609 ||
          n == 708 ||
          n == 711 ||
          (713 <= n && n <= 715) ||
          n == 717 ||
          n == 720 ||
          (728 <= n && n <= 731) ||
          n == 733 ||
          n == 735 ||
          (768 <= n && n <= 879) ||
          (913 <= n && n <= 929) ||
          (931 <= n && n <= 937) ||
          (945 <= n && n <= 961) ||
          (963 <= n && n <= 969) ||
          n == 1025 ||
          (1040 <= n && n <= 1103) ||
          n == 1105 ||
          n == 8208 ||
          (8211 <= n && n <= 8214) ||
          (8216 <= n && n <= 8217) ||
          (8220 <= n && n <= 8221) ||
          (8224 <= n && n <= 8226) ||
          (8228 <= n && n <= 8231) ||
          n == 8240 ||
          (8242 <= n && n <= 8243) ||
          n == 8245 ||
          n == 8251 ||
          n == 8254 ||
          n == 8308 ||
          n == 8319 ||
          (8321 <= n && n <= 8324) ||
          n == 8364 ||
          n == 8451 ||
          n == 8453 ||
          n == 8457 ||
          n == 8467 ||
          n == 8470 ||
          (8481 <= n && n <= 8482) ||
          n == 8486 ||
          n == 8491 ||
          (8531 <= n && n <= 8532) ||
          (8539 <= n && n <= 8542) ||
          (8544 <= n && n <= 8555) ||
          (8560 <= n && n <= 8569) ||
          n == 8585 ||
          (8592 <= n && n <= 8601) ||
          (8632 <= n && n <= 8633) ||
          n == 8658 ||
          n == 8660 ||
          n == 8679 ||
          n == 8704 ||
          (8706 <= n && n <= 8707) ||
          (8711 <= n && n <= 8712) ||
          n == 8715 ||
          n == 8719 ||
          n == 8721 ||
          n == 8725 ||
          n == 8730 ||
          (8733 <= n && n <= 8736) ||
          n == 8739 ||
          n == 8741 ||
          (8743 <= n && n <= 8748) ||
          n == 8750 ||
          (8756 <= n && n <= 8759) ||
          (8764 <= n && n <= 8765) ||
          n == 8776 ||
          n == 8780 ||
          n == 8786 ||
          (8800 <= n && n <= 8801) ||
          (8804 <= n && n <= 8807) ||
          (8810 <= n && n <= 8811) ||
          (8814 <= n && n <= 8815) ||
          (8834 <= n && n <= 8835) ||
          (8838 <= n && n <= 8839) ||
          n == 8853 ||
          n == 8857 ||
          n == 8869 ||
          n == 8895 ||
          n == 8978 ||
          (9312 <= n && n <= 9449) ||
          (9451 <= n && n <= 9547) ||
          (9552 <= n && n <= 9587) ||
          (9600 <= n && n <= 9615) ||
          (9618 <= n && n <= 9621) ||
          (9632 <= n && n <= 9633) ||
          (9635 <= n && n <= 9641) ||
          (9650 <= n && n <= 9651) ||
          (9654 <= n && n <= 9655) ||
          (9660 <= n && n <= 9661) ||
          (9664 <= n && n <= 9665) ||
          (9670 <= n && n <= 9672) ||
          n == 9675 ||
          (9678 <= n && n <= 9681) ||
          (9698 <= n && n <= 9701) ||
          n == 9711 ||
          (9733 <= n && n <= 9734) ||
          n == 9737 ||
          (9742 <= n && n <= 9743) ||
          (9748 <= n && n <= 9749) ||
          n == 9756 ||
          n == 9758 ||
          n == 9792 ||
          n == 9794 ||
          (9824 <= n && n <= 9825) ||
          (9827 <= n && n <= 9829) ||
          (9831 <= n && n <= 9834) ||
          (9836 <= n && n <= 9837) ||
          n == 9839 ||
          (9886 <= n && n <= 9887) ||
          (9918 <= n && n <= 9919) ||
          (9924 <= n && n <= 9933) ||
          (9935 <= n && n <= 9953) ||
          n == 9955 ||
          (9960 <= n && n <= 9983) ||
          n == 10045 ||
          n == 10071 ||
          (10102 <= n && n <= 10111) ||
          (11093 <= n && n <= 11097) ||
          (12872 <= n && n <= 12879) ||
          (57344 <= n && n <= 63743) ||
          (65024 <= n && n <= 65039) ||
          n == 65533 ||
          (127232 <= n && n <= 127242) ||
          (127248 <= n && n <= 127277) ||
          (127280 <= n && n <= 127337) ||
          (127344 <= n && n <= 127386) ||
          (917760 <= n && n <= 917999) ||
          (983040 <= n && n <= 1048573) ||
          (1048576 <= n && n <= 1114109)
        ? "A"
        : "N"
    );
  };
  Fe.characterLength = function (e) {
    var t = this.eastAsianWidth(e);
    return t == "F" || t == "W" || t == "A" ? 2 : 1;
  };
  function Ni(e) {
    return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
  }
  Fe.length = function (e) {
    for (var t = Ni(e), r = 0, n = 0; n < t.length; n++)
      r = r + this.characterLength(t[n]);
    return r;
  };
  Fe.slice = function (e, t, r) {
    (textLen = Fe.length(e)),
      (t = t || 0),
      (r = r || 1),
      t < 0 && (t = textLen + t),
      r < 0 && (r = textLen + r);
    for (var n = "", o = 0, i = Ni(e), a = 0; a < i.length; a++) {
      var s = i[a],
        u = Fe.length(s);
      if (o >= t - (u == 2 ? 1 : 0))
        if (o + u <= r) n += s;
        else break;
      o += u;
    }
    return n;
  };
});
var Ui = K((kD, zi) => {
  "use strict";
  zi.exports = function () {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
  };
});
var Iu,
  Mu,
  Pe = Z(() => {
    Oi();
    (Iu = A(Li(), 1)), (Mu = A(Ui(), 1));
  });
var Qi = K((S) => {
  "use strict";
  var ut = Symbol.for("react.element"),
    Ou = Symbol.for("react.portal"),
    Nu = Symbol.for("react.fragment"),
    Lu = Symbol.for("react.strict_mode"),
    zu = Symbol.for("react.profiler"),
    Uu = Symbol.for("react.provider"),
    Hu = Symbol.for("react.context"),
    Vu = Symbol.for("react.forward_ref"),
    qu = Symbol.for("react.suspense"),
    Wu = Symbol.for("react.memo"),
    Gu = Symbol.for("react.lazy"),
    Hi = Symbol.iterator;
  function Ju(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Hi && e[Hi]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Wi = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    Gi = Object.assign,
    Ji = {};
  function Ye(e, t, r) {
    (this.props = e),
      (this.context = t),
      (this.refs = Ji),
      (this.updater = r || Wi);
  }
  Ye.prototype.isReactComponent = {};
  Ye.prototype.setState = function (e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
      throw Error(
        "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
      );
    this.updater.enqueueSetState(this, e, t, "setState");
  };
  Ye.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate");
  };
  function Xi() {}
  Xi.prototype = Ye.prototype;
  function qn(e, t, r) {
    (this.props = e),
      (this.context = t),
      (this.refs = Ji),
      (this.updater = r || Wi);
  }
  var Wn = (qn.prototype = new Xi());
  Wn.constructor = qn;
  Gi(Wn, Ye.prototype);
  Wn.isPureReactComponent = !0;
  var Vi = Array.isArray,
    Yi = Object.prototype.hasOwnProperty,
    Gn = { current: null },
    Zi = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ki(e, t, r) {
    var n,
      o = {},
      i = null,
      a = null;
    if (t != null)
      for (n in (t.ref !== void 0 && (a = t.ref),
      t.key !== void 0 && (i = "" + t.key),
      t))
        Yi.call(t, n) && !Zi.hasOwnProperty(n) && (o[n] = t[n]);
    var s = arguments.length - 2;
    if (s === 1) o.children = r;
    else if (1 < s) {
      for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
      o.children = u;
    }
    if (e && e.defaultProps)
      for (n in ((s = e.defaultProps), s)) o[n] === void 0 && (o[n] = s[n]);
    return {
      $$typeof: ut,
      type: e,
      key: i,
      ref: a,
      props: o,
      _owner: Gn.current,
    };
  }
  function Xu(e, t) {
    return {
      $$typeof: ut,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner,
    };
  }
  function Jn(e) {
    return typeof e == "object" && e !== null && e.$$typeof === ut;
  }
  function Yu(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (r) {
        return t[r];
      })
    );
  }
  var qi = /\/+/g;
  function Vn(e, t) {
    return typeof e == "object" && e !== null && e.key != null
      ? Yu("" + e.key)
      : t.toString(36);
  }
  function zt(e, t, r, n, o) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var a = !1;
    if (e === null) a = !0;
    else
      switch (i) {
        case "string":
        case "number":
          a = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case ut:
            case Ou:
              a = !0;
          }
      }
    if (a)
      return (
        (a = e),
        (o = o(a)),
        (e = n === "" ? "." + Vn(a, 0) : n),
        Vi(o)
          ? ((r = ""),
            e != null && (r = e.replace(qi, "$&/") + "/"),
            zt(o, t, r, "", function (c) {
              return c;
            }))
          : o != null &&
            (Jn(o) &&
              (o = Xu(
                o,
                r +
                  (!o.key || (a && a.key === o.key)
                    ? ""
                    : ("" + o.key).replace(qi, "$&/") + "/") +
                  e,
              )),
            t.push(o)),
        1
      );
    if (((a = 0), (n = n === "" ? "." : n + ":"), Vi(e)))
      for (var s = 0; s < e.length; s++) {
        i = e[s];
        var u = n + Vn(i, s);
        a += zt(i, t, r, u, o);
      }
    else if (((u = Ju(e)), typeof u == "function"))
      for (e = u.call(e), s = 0; !(i = e.next()).done; )
        (i = i.value), (u = n + Vn(i, s++)), (a += zt(i, t, r, u, o));
    else if (i === "object")
      throw (
        ((t = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            (t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t) +
            "). If you meant to render a collection of children, use an array instead.",
        ))
      );
    return a;
  }
  function Lt(e, t, r) {
    if (e == null) return e;
    var n = [],
      o = 0;
    return (
      zt(e, n, "", "", function (i) {
        return t.call(r, i, o++);
      }),
      n
    );
  }
  function Zu(e) {
    if (e._status === -1) {
      var t = e._result;
      (t = t()),
        t.then(
          function (r) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 1), (e._result = r));
          },
          function (r) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 2), (e._result = r));
          },
        ),
        e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var q = { current: null },
    Ut = { transition: null },
    Ku = {
      ReactCurrentDispatcher: q,
      ReactCurrentBatchConfig: Ut,
      ReactCurrentOwner: Gn,
    };
  S.Children = {
    map: Lt,
    forEach: function (e, t, r) {
      Lt(
        e,
        function () {
          t.apply(this, arguments);
        },
        r,
      );
    },
    count: function (e) {
      var t = 0;
      return (
        Lt(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        Lt(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!Jn(e))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return e;
    },
  };
  S.Component = Ye;
  S.Fragment = Nu;
  S.Profiler = zu;
  S.PureComponent = qn;
  S.StrictMode = Lu;
  S.Suspense = qu;
  S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ku;
  S.cloneElement = function (e, t, r) {
    if (e == null)
      throw Error(
        "React.cloneElement(...): The argument must be a React element, but you passed " +
          e +
          ".",
      );
    var n = Gi({}, e.props),
      o = e.key,
      i = e.ref,
      a = e._owner;
    if (t != null) {
      if (
        (t.ref !== void 0 && ((i = t.ref), (a = Gn.current)),
        t.key !== void 0 && (o = "" + t.key),
        e.type && e.type.defaultProps)
      )
        var s = e.type.defaultProps;
      for (u in t)
        Yi.call(t, u) &&
          !Zi.hasOwnProperty(u) &&
          (n[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
    }
    var u = arguments.length - 2;
    if (u === 1) n.children = r;
    else if (1 < u) {
      s = Array(u);
      for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
      n.children = s;
    }
    return { $$typeof: ut, type: e.type, key: o, ref: i, props: n, _owner: a };
  };
  S.createContext = function (e) {
    return (
      (e = {
        $$typeof: Hu,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      }),
      (e.Provider = { $$typeof: Uu, _context: e }),
      (e.Consumer = e)
    );
  };
  S.createElement = Ki;
  S.createFactory = function (e) {
    var t = Ki.bind(null, e);
    return (t.type = e), t;
  };
  S.createRef = function () {
    return { current: null };
  };
  S.forwardRef = function (e) {
    return { $$typeof: Vu, render: e };
  };
  S.isValidElement = Jn;
  S.lazy = function (e) {
    return { $$typeof: Gu, _payload: { _status: -1, _result: e }, _init: Zu };
  };
  S.memo = function (e, t) {
    return { $$typeof: Wu, type: e, compare: t === void 0 ? null : t };
  };
  S.startTransition = function (e) {
    var t = Ut.transition;
    Ut.transition = {};
    try {
      e();
    } finally {
      Ut.transition = t;
    }
  };
  S.unstable_act = function () {
    throw Error("act(...) is not supported in production builds of React.");
  };
  S.useCallback = function (e, t) {
    return q.current.useCallback(e, t);
  };
  S.useContext = function (e) {
    return q.current.useContext(e);
  };
  S.useDebugValue = function () {};
  S.useDeferredValue = function (e) {
    return q.current.useDeferredValue(e);
  };
  S.useEffect = function (e, t) {
    return q.current.useEffect(e, t);
  };
  S.useId = function () {
    return q.current.useId();
  };
  S.useImperativeHandle = function (e, t, r) {
    return q.current.useImperativeHandle(e, t, r);
  };
  S.useInsertionEffect = function (e, t) {
    return q.current.useInsertionEffect(e, t);
  };
  S.useLayoutEffect = function (e, t) {
    return q.current.useLayoutEffect(e, t);
  };
  S.useMemo = function (e, t) {
    return q.current.useMemo(e, t);
  };
  S.useReducer = function (e, t, r) {
    return q.current.useReducer(e, t, r);
  };
  S.useRef = function (e) {
    return q.current.useRef(e);
  };
  S.useState = function (e) {
    return q.current.useState(e);
  };
  S.useSyncExternalStore = function (e, t, r) {
    return q.current.useSyncExternalStore(e, t, r);
  };
  S.useTransition = function () {
    return q.current.useTransition();
  };
  S.version = "18.2.0";
});
var De = K((_D, eo) => {
  "use strict";
  eo.exports = Qi();
});
var Wo = K((Ze) => {
  "use strict";
  var wo = De();
  function v(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        r = 1;
      r < arguments.length;
      r++
    )
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var X = Object.prototype.hasOwnProperty,
    Qu =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    to = {},
    no = {};
  function Co(e) {
    return X.call(no, e)
      ? !0
      : X.call(to, e)
      ? !1
      : Qu.test(e)
      ? (no[e] = !0)
      : ((to[e] = !0), !1);
  }
  function G(e, t, r, n, o, i, a) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = n),
      (this.attributeNamespace = o),
      (this.mustUseProperty = r),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i),
      (this.removeEmptyString = a);
  }
  var z = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      z[e] = new G(e, 0, !1, e, null, !1, !1);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (e) {
    var t = e[0];
    z[t] = new G(t, 1, !1, e[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    z[e] = new G(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (e) {
    z[e] = new G(e, 2, !1, e, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
      z[e] = new G(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    z[e] = new G(e, 3, !0, e, null, !1, !1);
  });
  ["capture", "download"].forEach(function (e) {
    z[e] = new G(e, 4, !1, e, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function (e) {
    z[e] = new G(e, 6, !1, e, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function (e) {
    z[e] = new G(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var rr = /[\-:]([a-z])/g;
  function ir(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(rr, ir);
      z[t] = new G(t, 1, !1, e, null, !1, !1);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(rr, ir);
      z[t] = new G(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
  ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(rr, ir);
    z[t] = new G(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function (e) {
    z[e] = new G(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  z.xlinkHref = new G(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
  );
  ["src", "href", "action", "formAction"].forEach(function (e) {
    z[e] = new G(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  var qt = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    el = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qt).forEach(function (e) {
    el.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (qt[t] = qt[e]);
    });
  });
  var tl = /["'&<>]/;
  function W(e) {
    if (typeof e == "boolean" || typeof e == "number") return "" + e;
    e = "" + e;
    var t = tl.exec(e);
    if (t) {
      var r = "",
        n,
        o = 0;
      for (n = t.index; n < e.length; n++) {
        switch (e.charCodeAt(n)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        o !== n && (r += e.substring(o, n)), (o = n + 1), (r += t);
      }
      e = o !== n ? r + e.substring(o, n) : r;
    }
    return e;
  }
  var nl = /([A-Z])/g,
    rl = /^ms-/,
    Kn = Array.isArray;
  function me(e, t) {
    return { insertionMode: e, selectedValue: t };
  }
  function il(e, t, r) {
    switch (t) {
      case "select":
        return me(1, r.value != null ? r.value : r.defaultValue);
      case "svg":
        return me(2, null);
      case "math":
        return me(3, null);
      case "foreignObject":
        return me(1, null);
      case "table":
        return me(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return me(5, null);
      case "colgroup":
        return me(7, null);
      case "tr":
        return me(6, null);
    }
    return 4 <= e.insertionMode || e.insertionMode === 0 ? me(1, null) : e;
  }
  var ro = new Map();
  function Eo(e, t, r) {
    if (typeof r != "object") throw Error(v(62));
    t = !0;
    for (var n in r)
      if (X.call(r, n)) {
        var o = r[n];
        if (o != null && typeof o != "boolean" && o !== "") {
          if (n.indexOf("--") === 0) {
            var i = W(n);
            o = W(("" + o).trim());
          } else {
            i = n;
            var a = ro.get(i);
            a !== void 0 ||
              ((a = W(i.replace(nl, "-$1").toLowerCase().replace(rl, "-ms-"))),
              ro.set(i, a)),
              (i = a),
              (o =
                typeof o == "number"
                  ? o === 0 || X.call(qt, n)
                    ? "" + o
                    : o + "px"
                  : W(("" + o).trim()));
          }
          t
            ? ((t = !1), e.push(' style="', i, ":", o))
            : e.push(";", i, ":", o);
        }
      }
    t || e.push('"');
  }
  function Q(e, t, r, n) {
    switch (r) {
      case "style":
        Eo(e, t, n);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (
      !(2 < r.length) ||
      (r[0] !== "o" && r[0] !== "O") ||
      (r[1] !== "n" && r[1] !== "N")
    ) {
      if (((t = z.hasOwnProperty(r) ? z[r] : null), t !== null)) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!t.acceptsBooleans) return;
        }
        switch (((r = t.attributeName), t.type)) {
          case 3:
            n && e.push(" ", r, '=""');
            break;
          case 4:
            n === !0
              ? e.push(" ", r, '=""')
              : n !== !1 && e.push(" ", r, '="', W(n), '"');
            break;
          case 5:
            isNaN(n) || e.push(" ", r, '="', W(n), '"');
            break;
          case 6:
            !isNaN(n) && 1 <= n && e.push(" ", r, '="', W(n), '"');
            break;
          default:
            t.sanitizeURL && (n = "" + n), e.push(" ", r, '="', W(n), '"');
        }
      } else if (Co(r)) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (
              ((t = r.toLowerCase().slice(0, 5)),
              t !== "data-" && t !== "aria-")
            )
              return;
        }
        e.push(" ", r, '="', W(n), '"');
      }
    }
  }
  function Wt(e, t, r) {
    if (t != null) {
      if (r != null) throw Error(v(60));
      if (typeof t != "object" || !("__html" in t)) throw Error(v(61));
      (t = t.__html), t != null && e.push("" + t);
    }
  }
  function ol(e) {
    var t = "";
    return (
      wo.Children.forEach(e, function (r) {
        r != null && (t += r);
      }),
      t
    );
  }
  function Xn(e, t, r, n) {
    e.push(ce(r));
    var o = (r = null),
      i;
    for (i in t)
      if (X.call(t, i)) {
        var a = t[i];
        if (a != null)
          switch (i) {
            case "children":
              r = a;
              break;
            case "dangerouslySetInnerHTML":
              o = a;
              break;
            default:
              Q(e, n, i, a);
          }
      }
    return (
      e.push(">"), Wt(e, o, r), typeof r == "string" ? (e.push(W(r)), null) : r
    );
  }
  var al = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    io = new Map();
  function ce(e) {
    var t = io.get(e);
    if (t === void 0) {
      if (!al.test(e)) throw Error(v(65, e));
      (t = "<" + e), io.set(e, t);
    }
    return t;
  }
  function sl(e, t, r, n, o) {
    switch (t) {
      case "select":
        e.push(ce("select"));
        var i = null,
          a = null;
        for (l in r)
          if (X.call(r, l)) {
            var s = r[l];
            if (s != null)
              switch (l) {
                case "children":
                  i = s;
                  break;
                case "dangerouslySetInnerHTML":
                  a = s;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  Q(e, n, l, s);
              }
          }
        return e.push(">"), Wt(e, a, i), i;
      case "option":
        (a = o.selectedValue), e.push(ce("option"));
        var u = (s = null),
          c = null,
          l = null;
        for (i in r)
          if (X.call(r, i)) {
            var p = r[i];
            if (p != null)
              switch (i) {
                case "children":
                  s = p;
                  break;
                case "selected":
                  c = p;
                  break;
                case "dangerouslySetInnerHTML":
                  l = p;
                  break;
                case "value":
                  u = p;
                default:
                  Q(e, n, i, p);
              }
          }
        if (a != null)
          if (((r = u !== null ? "" + u : ol(s)), Kn(a))) {
            for (n = 0; n < a.length; n++)
              if ("" + a[n] === r) {
                e.push(' selected=""');
                break;
              }
          } else "" + a === r && e.push(' selected=""');
        else c && e.push(' selected=""');
        return e.push(">"), Wt(e, l, s), s;
      case "textarea":
        e.push(ce("textarea")), (l = a = i = null);
        for (s in r)
          if (X.call(r, s) && ((u = r[s]), u != null))
            switch (s) {
              case "children":
                l = u;
                break;
              case "value":
                i = u;
                break;
              case "defaultValue":
                a = u;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(v(91));
              default:
                Q(e, n, s, u);
            }
        if ((i === null && a !== null && (i = a), e.push(">"), l != null)) {
          if (i != null) throw Error(v(92));
          if (Kn(l) && 1 < l.length) throw Error(v(93));
          i = "" + l;
        }
        return (
          typeof i == "string" &&
            i[0] ===
              `
` &&
            e.push(`
`),
          i !== null && e.push(W("" + i)),
          null
        );
      case "input":
        e.push(ce("input")), (u = l = s = i = null);
        for (a in r)
          if (X.call(r, a) && ((c = r[a]), c != null))
            switch (a) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(v(399, "input"));
              case "defaultChecked":
                u = c;
                break;
              case "defaultValue":
                s = c;
                break;
              case "checked":
                l = c;
                break;
              case "value":
                i = c;
                break;
              default:
                Q(e, n, a, c);
            }
        return (
          l !== null
            ? Q(e, n, "checked", l)
            : u !== null && Q(e, n, "checked", u),
          i !== null ? Q(e, n, "value", i) : s !== null && Q(e, n, "value", s),
          e.push("/>"),
          null
        );
      case "menuitem":
        e.push(ce("menuitem"));
        for (var f in r)
          if (X.call(r, f) && ((i = r[f]), i != null))
            switch (f) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(v(400));
              default:
                Q(e, n, f, i);
            }
        return e.push(">"), null;
      case "title":
        e.push(ce("title")), (i = null);
        for (p in r)
          if (X.call(r, p) && ((a = r[p]), a != null))
            switch (p) {
              case "children":
                i = a;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(v(434));
              default:
                Q(e, n, p, a);
            }
        return e.push(">"), i;
      case "listing":
      case "pre":
        e.push(ce(t)), (a = i = null);
        for (u in r)
          if (X.call(r, u) && ((s = r[u]), s != null))
            switch (u) {
              case "children":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                a = s;
                break;
              default:
                Q(e, n, u, s);
            }
        if ((e.push(">"), a != null)) {
          if (i != null) throw Error(v(60));
          if (typeof a != "object" || !("__html" in a)) throw Error(v(61));
          (r = a.__html),
            r != null &&
              (typeof r == "string" &&
              0 < r.length &&
              r[0] ===
                `
`
                ? e.push(
                    `
`,
                    r,
                  )
                : e.push("" + r));
        }
        return (
          typeof i == "string" &&
            i[0] ===
              `
` &&
            e.push(`
`),
          i
        );
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        e.push(ce(t));
        for (var x in r)
          if (X.call(r, x) && ((i = r[x]), i != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(v(399, t));
              default:
                Q(e, n, x, i);
            }
        return e.push("/>"), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return Xn(e, r, t, n);
      case "html":
        return (
          o.insertionMode === 0 && e.push("<!DOCTYPE html>"), Xn(e, r, t, n)
        );
      default:
        if (t.indexOf("-") === -1 && typeof r.is != "string")
          return Xn(e, r, t, n);
        e.push(ce(t)), (a = i = null);
        for (c in r)
          if (X.call(r, c) && ((s = r[c]), s != null))
            switch (c) {
              case "children":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                a = s;
                break;
              case "style":
                Eo(e, n, s);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                Co(c) &&
                  typeof s != "function" &&
                  typeof s != "symbol" &&
                  e.push(" ", c, '="', W(s), '"');
            }
        return e.push(">"), Wt(e, a, i), i;
    }
  }
  function oo(e, t, r) {
    if ((e.push('<!--$?--><template id="'), r === null)) throw Error(v(395));
    return e.push(r), e.push('"></template>');
  }
  function ul(e, t, r, n) {
    switch (r.insertionMode) {
      case 0:
      case 1:
        return (
          e.push('<div hidden id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      case 2:
        return (
          e.push('<svg aria-hidden="true" style="display:none" id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      case 3:
        return (
          e.push('<math aria-hidden="true" style="display:none" id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      case 4:
        return (
          e.push('<table hidden id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      case 5:
        return (
          e.push('<table hidden><tbody id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      case 6:
        return (
          e.push('<table hidden><tr id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      case 7:
        return (
          e.push('<table hidden><colgroup id="'),
          e.push(t.segmentPrefix),
          (t = n.toString(16)),
          e.push(t),
          e.push('">')
        );
      default:
        throw Error(v(397));
    }
  }
  function ll(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
        return e.push("</div>");
      case 2:
        return e.push("</svg>");
      case 3:
        return e.push("</math>");
      case 4:
        return e.push("</table>");
      case 5:
        return e.push("</tbody></table>");
      case 6:
        return e.push("</tr></table>");
      case 7:
        return e.push("</colgroup></table>");
      default:
        throw Error(v(397));
    }
  }
  var cl = /[<\u2028\u2029]/g;
  function Yn(e) {
    return JSON.stringify(e).replace(cl, function (t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
          );
      }
    });
  }
  function pl(e, t) {
    return (
      (t = t === void 0 ? "" : t),
      {
        bootstrapChunks: [],
        startInlineScript: "<script>",
        placeholderPrefix: t + "P:",
        segmentPrefix: t + "S:",
        boundaryPrefix: t + "B:",
        idPrefix: t,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: !1,
        sentCompleteBoundaryFunction: !1,
        sentClientRenderFunction: !1,
        generateStaticMarkup: e,
      }
    );
  }
  function ao(e, t, r, n) {
    return r.generateStaticMarkup
      ? (e.push(W(t)), !1)
      : (t === "" ? (e = n) : (n && e.push("<!-- -->"), e.push(W(t)), (e = !0)),
        e);
  }
  var pt = Object.assign,
    dl = Symbol.for("react.element"),
    bo = Symbol.for("react.portal"),
    So = Symbol.for("react.fragment"),
    ko = Symbol.for("react.strict_mode"),
    Ao = Symbol.for("react.profiler"),
    Bo = Symbol.for("react.provider"),
    Ro = Symbol.for("react.context"),
    jo = Symbol.for("react.forward_ref"),
    _o = Symbol.for("react.suspense"),
    To = Symbol.for("react.suspense_list"),
    $o = Symbol.for("react.memo"),
    or = Symbol.for("react.lazy"),
    fl = Symbol.for("react.scope"),
    Dl = Symbol.for("react.debug_trace_mode"),
    ml = Symbol.for("react.legacy_hidden"),
    hl = Symbol.for("react.default_value"),
    so = Symbol.iterator;
  function Qn(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case So:
        return "Fragment";
      case bo:
        return "Portal";
      case Ao:
        return "Profiler";
      case ko:
        return "StrictMode";
      case _o:
        return "Suspense";
      case To:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ro:
          return (e.displayName || "Context") + ".Consumer";
        case Bo:
          return (e._context.displayName || "Context") + ".Provider";
        case jo:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case $o:
          return (
            (t = e.displayName || null), t !== null ? t : Qn(e.type) || "Memo"
          );
        case or:
          (t = e._payload), (e = e._init);
          try {
            return Qn(e(t));
          } catch {}
      }
    return null;
  }
  var Po = {};
  function uo(e, t) {
    if (((e = e.contextTypes), !e)) return Po;
    var r = {},
      n;
    for (n in e) r[n] = t[n];
    return r;
  }
  var Me = null;
  function tn(e, t) {
    if (e !== t) {
      (e.context._currentValue2 = e.parentValue), (e = e.parent);
      var r = t.parent;
      if (e === null) {
        if (r !== null) throw Error(v(401));
      } else {
        if (r === null) throw Error(v(401));
        tn(e, r);
      }
      t.context._currentValue2 = t.value;
    }
  }
  function Io(e) {
    (e.context._currentValue2 = e.parentValue),
      (e = e.parent),
      e !== null && Io(e);
  }
  function Mo(e) {
    var t = e.parent;
    t !== null && Mo(t), (e.context._currentValue2 = e.value);
  }
  function Oo(e, t) {
    if (
      ((e.context._currentValue2 = e.parentValue), (e = e.parent), e === null)
    )
      throw Error(v(402));
    e.depth === t.depth ? tn(e, t) : Oo(e, t);
  }
  function No(e, t) {
    var r = t.parent;
    if (r === null) throw Error(v(402));
    e.depth === r.depth ? tn(e, r) : No(e, r),
      (t.context._currentValue2 = t.value);
  }
  function Yt(e) {
    var t = Me;
    t !== e &&
      (t === null
        ? Mo(e)
        : e === null
        ? Io(t)
        : t.depth === e.depth
        ? tn(t, e)
        : t.depth > e.depth
        ? Oo(t, e)
        : No(t, e),
      (Me = e));
  }
  var lo = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (e, t) {
      (e = e._reactInternals), e.queue !== null && e.queue.push(t);
    },
    enqueueReplaceState: function (e, t) {
      (e = e._reactInternals), (e.replace = !0), (e.queue = [t]);
    },
    enqueueForceUpdate: function () {},
  };
  function co(e, t, r, n) {
    var o = e.state !== void 0 ? e.state : null;
    (e.updater = lo), (e.props = r), (e.state = o);
    var i = { queue: [], replace: !1 };
    e._reactInternals = i;
    var a = t.contextType;
    if (
      ((e.context = typeof a == "object" && a !== null ? a._currentValue2 : n),
      (a = t.getDerivedStateFromProps),
      typeof a == "function" &&
        ((a = a(r, o)), (o = a == null ? o : pt({}, o, a)), (e.state = o)),
      typeof t.getDerivedStateFromProps != "function" &&
        typeof e.getSnapshotBeforeUpdate != "function" &&
        (typeof e.UNSAFE_componentWillMount == "function" ||
          typeof e.componentWillMount == "function"))
    )
      if (
        ((t = e.state),
        typeof e.componentWillMount == "function" && e.componentWillMount(),
        typeof e.UNSAFE_componentWillMount == "function" &&
          e.UNSAFE_componentWillMount(),
        t !== e.state && lo.enqueueReplaceState(e, e.state, null),
        i.queue !== null && 0 < i.queue.length)
      )
        if (
          ((t = i.queue),
          (a = i.replace),
          (i.queue = null),
          (i.replace = !1),
          a && t.length === 1)
        )
          e.state = t[0];
        else {
          for (
            i = a ? t[0] : e.state, o = !0, a = a ? 1 : 0;
            a < t.length;
            a++
          ) {
            var s = t[a];
            (s = typeof s == "function" ? s.call(e, i, r, n) : s),
              s != null && (o ? ((o = !1), (i = pt({}, i, s))) : pt(i, s));
          }
          e.state = i;
        }
      else i.queue = null;
  }
  var gl = { id: 1, overflow: "" };
  function er(e, t, r) {
    var n = e.id;
    e = e.overflow;
    var o = 32 - Gt(n) - 1;
    (n &= ~(1 << o)), (r += 1);
    var i = 32 - Gt(t) + o;
    if (30 < i) {
      var a = o - (o % 5);
      return (
        (i = (n & ((1 << a) - 1)).toString(32)),
        (n >>= a),
        (o -= a),
        { id: (1 << (32 - Gt(t) + o)) | (r << o) | n, overflow: i + e }
      );
    }
    return { id: (1 << i) | (r << o) | n, overflow: e };
  }
  var Gt = Math.clz32 ? Math.clz32 : yl,
    xl = Math.log,
    vl = Math.LN2;
  function yl(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((xl(e) / vl) | 0)) | 0;
  }
  function Fl(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var wl = typeof Object.is == "function" ? Object.is : Fl,
    he = null,
    ar = null,
    Jt = null,
    _ = null,
    lt = !1,
    Zt = !1,
    dt = 0,
    we = null,
    nn = 0;
  function Ie() {
    if (he === null) throw Error(v(321));
    return he;
  }
  function po() {
    if (0 < nn) throw Error(v(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function sr() {
    return (
      _ === null
        ? Jt === null
          ? ((lt = !1), (Jt = _ = po()))
          : ((lt = !0), (_ = Jt))
        : _.next === null
        ? ((lt = !1), (_ = _.next = po()))
        : ((lt = !0), (_ = _.next)),
      _
    );
  }
  function ur() {
    (ar = he = null), (Zt = !1), (Jt = null), (nn = 0), (_ = we = null);
  }
  function Lo(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function fo(e, t, r) {
    if (((he = Ie()), (_ = sr()), lt)) {
      var n = _.queue;
      if (((t = n.dispatch), we !== null && ((r = we.get(n)), r !== void 0))) {
        we.delete(n), (n = _.memoizedState);
        do (n = e(n, r.action)), (r = r.next);
        while (r !== null);
        return (_.memoizedState = n), [n, t];
      }
      return [_.memoizedState, t];
    }
    return (
      (e =
        e === Lo
          ? typeof t == "function"
            ? t()
            : t
          : r !== void 0
          ? r(t)
          : t),
      (_.memoizedState = e),
      (e = _.queue = { last: null, dispatch: null }),
      (e = e.dispatch = Cl.bind(null, he, e)),
      [_.memoizedState, e]
    );
  }
  function Do(e, t) {
    if (((he = Ie()), (_ = sr()), (t = t === void 0 ? null : t), _ !== null)) {
      var r = _.memoizedState;
      if (r !== null && t !== null) {
        var n = r[1];
        e: if (n === null) n = !1;
        else {
          for (var o = 0; o < n.length && o < t.length; o++)
            if (!wl(t[o], n[o])) {
              n = !1;
              break e;
            }
          n = !0;
        }
        if (n) return r[0];
      }
    }
    return (e = e()), (_.memoizedState = [e, t]), e;
  }
  function Cl(e, t, r) {
    if (25 <= nn) throw Error(v(301));
    if (e === he)
      if (
        ((Zt = !0),
        (e = { action: r, next: null }),
        we === null && (we = new Map()),
        (r = we.get(t)),
        r === void 0)
      )
        we.set(t, e);
      else {
        for (t = r; t.next !== null; ) t = t.next;
        t.next = e;
      }
  }
  function El() {
    throw Error(v(394));
  }
  function Ht() {}
  var mo = {
      readContext: function (e) {
        return e._currentValue2;
      },
      useContext: function (e) {
        return Ie(), e._currentValue2;
      },
      useMemo: Do,
      useReducer: fo,
      useRef: function (e) {
        (he = Ie()), (_ = sr());
        var t = _.memoizedState;
        return t === null ? ((e = { current: e }), (_.memoizedState = e)) : t;
      },
      useState: function (e) {
        return fo(Lo, e);
      },
      useInsertionEffect: Ht,
      useLayoutEffect: function () {},
      useCallback: function (e, t) {
        return Do(function () {
          return e;
        }, t);
      },
      useImperativeHandle: Ht,
      useEffect: Ht,
      useDebugValue: Ht,
      useDeferredValue: function (e) {
        return Ie(), e;
      },
      useTransition: function () {
        return Ie(), [!1, El];
      },
      useId: function () {
        var e = ar.treeContext,
          t = e.overflow;
        (e = e.id), (e = (e & ~(1 << (32 - Gt(e) - 1))).toString(32) + t);
        var r = Xt;
        if (r === null) throw Error(v(404));
        return (
          (t = dt++),
          (e = ":" + r.idPrefix + "R" + e),
          0 < t && (e += "H" + t.toString(32)),
          e + ":"
        );
      },
      useMutableSource: function (e, t) {
        return Ie(), t(e._source);
      },
      useSyncExternalStore: function (e, t, r) {
        if (r === void 0) throw Error(v(407));
        return r();
      },
    },
    Xt = null,
    Zn =
      wo.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
  function bl(e) {
    return console.error(e), null;
  }
  function ct() {}
  function Sl(e, t, r, n, o, i, a, s, u) {
    var c = [],
      l = new Set();
    return (
      (t = {
        destination: null,
        responseState: t,
        progressiveChunkSize: n === void 0 ? 12800 : n,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: l,
        pingedTasks: c,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: o === void 0 ? bl : o,
        onAllReady: i === void 0 ? ct : i,
        onShellReady: a === void 0 ? ct : a,
        onShellError: s === void 0 ? ct : s,
        onFatalError: u === void 0 ? ct : u,
      }),
      (r = Kt(t, 0, null, r, !1, !1)),
      (r.parentFlushed = !0),
      (e = lr(t, e, null, r, l, Po, null, gl)),
      c.push(e),
      t
    );
  }
  function lr(e, t, r, n, o, i, a, s) {
    e.allPendingTasks++, r === null ? e.pendingRootTasks++ : r.pendingTasks++;
    var u = {
      node: t,
      ping: function () {
        var c = e.pingedTasks;
        c.push(u), c.length === 1 && Ho(e);
      },
      blockedBoundary: r,
      blockedSegment: n,
      abortSet: o,
      legacyContext: i,
      context: a,
      treeContext: s,
    };
    return o.add(u), u;
  }
  function Kt(e, t, r, n, o, i) {
    return {
      status: 0,
      id: -1,
      index: t,
      parentFlushed: !1,
      chunks: [],
      children: [],
      formatContext: n,
      boundary: r,
      lastPushedText: o,
      textEmbedded: i,
    };
  }
  function ft(e, t) {
    if (((e = e.onError(t)), e != null && typeof e != "string"))
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
          typeof e +
          '" instead',
      );
    return e;
  }
  function Qt(e, t) {
    var r = e.onShellError;
    r(t),
      (r = e.onFatalError),
      r(t),
      e.destination !== null
        ? ((e.status = 2), e.destination.destroy(t))
        : ((e.status = 1), (e.fatalError = t));
  }
  function ho(e, t, r, n, o) {
    for (he = {}, ar = t, dt = 0, e = r(n, o); Zt; )
      (Zt = !1), (dt = 0), (nn += 1), (_ = null), (e = r(n, o));
    return ur(), e;
  }
  function go(e, t, r, n) {
    var o = r.render(),
      i = n.childContextTypes;
    if (i != null) {
      var a = t.legacyContext;
      if (typeof r.getChildContext != "function") n = a;
      else {
        r = r.getChildContext();
        for (var s in r)
          if (!(s in i)) throw Error(v(108, Qn(n) || "Unknown", s));
        n = pt({}, a, r);
      }
      (t.legacyContext = n), ee(e, t, o), (t.legacyContext = a);
    } else ee(e, t, o);
  }
  function xo(e, t) {
    if (e && e.defaultProps) {
      (t = pt({}, t)), (e = e.defaultProps);
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function tr(e, t, r, n, o) {
    if (typeof r == "function")
      if (r.prototype && r.prototype.isReactComponent) {
        o = uo(r, t.legacyContext);
        var i = r.contextType;
        (i = new r(
          n,
          typeof i == "object" && i !== null ? i._currentValue2 : o,
        )),
          co(i, r, n, o),
          go(e, t, i, r);
      } else {
        (i = uo(r, t.legacyContext)), (o = ho(e, t, r, n, i));
        var a = dt !== 0;
        if (
          typeof o == "object" &&
          o !== null &&
          typeof o.render == "function" &&
          o.$$typeof === void 0
        )
          co(o, r, n, i), go(e, t, o, r);
        else if (a) {
          (n = t.treeContext), (t.treeContext = er(n, 1, 0));
          try {
            ee(e, t, o);
          } finally {
            t.treeContext = n;
          }
        } else ee(e, t, o);
      }
    else if (typeof r == "string") {
      switch (
        ((o = t.blockedSegment),
        (i = sl(o.chunks, r, n, e.responseState, o.formatContext)),
        (o.lastPushedText = !1),
        (a = o.formatContext),
        (o.formatContext = il(a, r, n)),
        nr(e, t, i),
        (o.formatContext = a),
        r)
      ) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          o.chunks.push("</", r, ">");
      }
      o.lastPushedText = !1;
    } else {
      switch (r) {
        case ml:
        case Dl:
        case ko:
        case Ao:
        case So:
          ee(e, t, n.children);
          return;
        case To:
          ee(e, t, n.children);
          return;
        case fl:
          throw Error(v(343));
        case _o:
          e: {
            (r = t.blockedBoundary),
              (o = t.blockedSegment),
              (i = n.fallback),
              (n = n.children),
              (a = new Set());
            var s = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: !1,
                pendingTasks: 0,
                forceClientRender: !1,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: a,
                errorDigest: null,
              },
              u = Kt(e, o.chunks.length, s, o.formatContext, !1, !1);
            o.children.push(u), (o.lastPushedText = !1);
            var c = Kt(e, 0, null, o.formatContext, !1, !1);
            (c.parentFlushed = !0),
              (t.blockedBoundary = s),
              (t.blockedSegment = c);
            try {
              if (
                (nr(e, t, n),
                e.responseState.generateStaticMarkup ||
                  (c.lastPushedText &&
                    c.textEmbedded &&
                    c.chunks.push("<!-- -->")),
                (c.status = 1),
                en(s, c),
                s.pendingTasks === 0)
              )
                break e;
            } catch (l) {
              (c.status = 4),
                (s.forceClientRender = !0),
                (s.errorDigest = ft(e, l));
            } finally {
              (t.blockedBoundary = r), (t.blockedSegment = o);
            }
            (t = lr(e, i, r, u, a, t.legacyContext, t.context, t.treeContext)),
              e.pingedTasks.push(t);
          }
          return;
      }
      if (typeof r == "object" && r !== null)
        switch (r.$$typeof) {
          case jo:
            if (((n = ho(e, t, r.render, n, o)), dt !== 0)) {
              (r = t.treeContext), (t.treeContext = er(r, 1, 0));
              try {
                ee(e, t, n);
              } finally {
                t.treeContext = r;
              }
            } else ee(e, t, n);
            return;
          case $o:
            (r = r.type), (n = xo(r, n)), tr(e, t, r, n, o);
            return;
          case Bo:
            if (
              ((o = n.children),
              (r = r._context),
              (n = n.value),
              (i = r._currentValue2),
              (r._currentValue2 = n),
              (a = Me),
              (Me = n =
                {
                  parent: a,
                  depth: a === null ? 0 : a.depth + 1,
                  context: r,
                  parentValue: i,
                  value: n,
                }),
              (t.context = n),
              ee(e, t, o),
              (e = Me),
              e === null)
            )
              throw Error(v(403));
            (n = e.parentValue),
              (e.context._currentValue2 =
                n === hl ? e.context._defaultValue : n),
              (e = Me = e.parent),
              (t.context = e);
            return;
          case Ro:
            (n = n.children), (n = n(r._currentValue2)), ee(e, t, n);
            return;
          case or:
            (o = r._init),
              (r = o(r._payload)),
              (n = xo(r, n)),
              tr(e, t, r, n, void 0);
            return;
        }
      throw Error(v(130, r == null ? r : typeof r, ""));
    }
  }
  function ee(e, t, r) {
    if (((t.node = r), typeof r == "object" && r !== null)) {
      switch (r.$$typeof) {
        case dl:
          tr(e, t, r.type, r.props, r.ref);
          return;
        case bo:
          throw Error(v(257));
        case or:
          var n = r._init;
          (r = n(r._payload)), ee(e, t, r);
          return;
      }
      if (Kn(r)) {
        vo(e, t, r);
        return;
      }
      if (
        (r === null || typeof r != "object"
          ? (n = null)
          : ((n = (so && r[so]) || r["@@iterator"]),
            (n = typeof n == "function" ? n : null)),
        n && (n = n.call(r)))
      ) {
        if (((r = n.next()), !r.done)) {
          var o = [];
          do o.push(r.value), (r = n.next());
          while (!r.done);
          vo(e, t, o);
        }
        return;
      }
      throw (
        ((e = Object.prototype.toString.call(r)),
        Error(
          v(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(r).join(", ") + "}"
              : e,
          ),
        ))
      );
    }
    typeof r == "string"
      ? ((n = t.blockedSegment),
        (n.lastPushedText = ao(
          t.blockedSegment.chunks,
          r,
          e.responseState,
          n.lastPushedText,
        )))
      : typeof r == "number" &&
        ((n = t.blockedSegment),
        (n.lastPushedText = ao(
          t.blockedSegment.chunks,
          "" + r,
          e.responseState,
          n.lastPushedText,
        )));
  }
  function vo(e, t, r) {
    for (var n = r.length, o = 0; o < n; o++) {
      var i = t.treeContext;
      t.treeContext = er(i, n, o);
      try {
        nr(e, t, r[o]);
      } finally {
        t.treeContext = i;
      }
    }
  }
  function nr(e, t, r) {
    var n = t.blockedSegment.formatContext,
      o = t.legacyContext,
      i = t.context;
    try {
      return ee(e, t, r);
    } catch (u) {
      if (
        (ur(),
        typeof u == "object" && u !== null && typeof u.then == "function")
      ) {
        r = u;
        var a = t.blockedSegment,
          s = Kt(
            e,
            a.chunks.length,
            null,
            a.formatContext,
            a.lastPushedText,
            !0,
          );
        a.children.push(s),
          (a.lastPushedText = !1),
          (e = lr(
            e,
            t.node,
            t.blockedBoundary,
            s,
            t.abortSet,
            t.legacyContext,
            t.context,
            t.treeContext,
          ).ping),
          r.then(e, e),
          (t.blockedSegment.formatContext = n),
          (t.legacyContext = o),
          (t.context = i),
          Yt(i);
      } else
        throw (
          ((t.blockedSegment.formatContext = n),
          (t.legacyContext = o),
          (t.context = i),
          Yt(i),
          u)
        );
    }
  }
  function kl(e) {
    var t = e.blockedBoundary;
    (e = e.blockedSegment), (e.status = 3), Uo(this, t, e);
  }
  function zo(e, t, r) {
    var n = e.blockedBoundary;
    (e.blockedSegment.status = 3),
      n === null
        ? (t.allPendingTasks--,
          t.status !== 2 &&
            ((t.status = 2),
            t.destination !== null && t.destination.push(null)))
        : (n.pendingTasks--,
          n.forceClientRender ||
            ((n.forceClientRender = !0),
            (e = r === void 0 ? Error(v(432)) : r),
            (n.errorDigest = t.onError(e)),
            n.parentFlushed && t.clientRenderedBoundaries.push(n)),
          n.fallbackAbortableTasks.forEach(function (o) {
            return zo(o, t, r);
          }),
          n.fallbackAbortableTasks.clear(),
          t.allPendingTasks--,
          t.allPendingTasks === 0 && ((n = t.onAllReady), n()));
  }
  function en(e, t) {
    if (
      t.chunks.length === 0 &&
      t.children.length === 1 &&
      t.children[0].boundary === null
    ) {
      var r = t.children[0];
      (r.id = t.id), (r.parentFlushed = !0), r.status === 1 && en(e, r);
    } else e.completedSegments.push(t);
  }
  function Uo(e, t, r) {
    if (t === null) {
      if (r.parentFlushed) {
        if (e.completedRootSegment !== null) throw Error(v(389));
        e.completedRootSegment = r;
      }
      e.pendingRootTasks--,
        e.pendingRootTasks === 0 &&
          ((e.onShellError = ct), (t = e.onShellReady), t());
    } else
      t.pendingTasks--,
        t.forceClientRender ||
          (t.pendingTasks === 0
            ? (r.parentFlushed && r.status === 1 && en(t, r),
              t.parentFlushed && e.completedBoundaries.push(t),
              t.fallbackAbortableTasks.forEach(kl, e),
              t.fallbackAbortableTasks.clear())
            : r.parentFlushed &&
              r.status === 1 &&
              (en(t, r),
              t.completedSegments.length === 1 &&
                t.parentFlushed &&
                e.partialBoundaries.push(t)));
    e.allPendingTasks--, e.allPendingTasks === 0 && ((e = e.onAllReady), e());
  }
  function Ho(e) {
    if (e.status !== 2) {
      var t = Me,
        r = Zn.current;
      Zn.current = mo;
      var n = Xt;
      Xt = e.responseState;
      try {
        var o = e.pingedTasks,
          i;
        for (i = 0; i < o.length; i++) {
          var a = o[i],
            s = e,
            u = a.blockedSegment;
          if (u.status === 0) {
            Yt(a.context);
            try {
              ee(s, a, a.node),
                s.responseState.generateStaticMarkup ||
                  (u.lastPushedText &&
                    u.textEmbedded &&
                    u.chunks.push("<!-- -->")),
                a.abortSet.delete(a),
                (u.status = 1),
                Uo(s, a.blockedBoundary, u);
            } catch (g) {
              if (
                (ur(),
                typeof g == "object" &&
                  g !== null &&
                  typeof g.then == "function")
              ) {
                var c = a.ping;
                g.then(c, c);
              } else {
                a.abortSet.delete(a), (u.status = 4);
                var l = a.blockedBoundary,
                  p = g,
                  f = ft(s, p);
                if (
                  (l === null
                    ? Qt(s, p)
                    : (l.pendingTasks--,
                      l.forceClientRender ||
                        ((l.forceClientRender = !0),
                        (l.errorDigest = f),
                        l.parentFlushed && s.clientRenderedBoundaries.push(l))),
                  s.allPendingTasks--,
                  s.allPendingTasks === 0)
                ) {
                  var x = s.onAllReady;
                  x();
                }
              }
            } finally {
            }
          }
        }
        o.splice(0, i), e.destination !== null && cr(e, e.destination);
      } catch (g) {
        ft(e, g), Qt(e, g);
      } finally {
        (Xt = n), (Zn.current = r), r === mo && Yt(t);
      }
    }
  }
  function Vt(e, t, r) {
    switch (((r.parentFlushed = !0), r.status)) {
      case 0:
        var n = (r.id = e.nextSegmentId++);
        return (
          (r.lastPushedText = !1),
          (r.textEmbedded = !1),
          (e = e.responseState),
          t.push('<template id="'),
          t.push(e.placeholderPrefix),
          (e = n.toString(16)),
          t.push(e),
          t.push('"></template>')
        );
      case 1:
        r.status = 2;
        var o = !0;
        n = r.chunks;
        var i = 0;
        r = r.children;
        for (var a = 0; a < r.length; a++) {
          for (o = r[a]; i < o.index; i++) t.push(n[i]);
          o = rn(e, t, o);
        }
        for (; i < n.length - 1; i++) t.push(n[i]);
        return i < n.length && (o = t.push(n[i])), o;
      default:
        throw Error(v(390));
    }
  }
  function rn(e, t, r) {
    var n = r.boundary;
    if (n === null) return Vt(e, t, r);
    if (((n.parentFlushed = !0), n.forceClientRender))
      return (
        e.responseState.generateStaticMarkup ||
          ((n = n.errorDigest),
          t.push("<!--$!-->"),
          t.push("<template"),
          n && (t.push(' data-dgst="'), (n = W(n)), t.push(n), t.push('"')),
          t.push("></template>")),
        Vt(e, t, r),
        (e = e.responseState.generateStaticMarkup ? !0 : t.push("<!--/$-->")),
        e
      );
    if (0 < n.pendingTasks) {
      (n.rootSegmentID = e.nextSegmentId++),
        0 < n.completedSegments.length && e.partialBoundaries.push(n);
      var o = e.responseState,
        i = o.nextSuspenseID++;
      return (
        (o = o.boundaryPrefix + i.toString(16)),
        (n = n.id = o),
        oo(t, e.responseState, n),
        Vt(e, t, r),
        t.push("<!--/$-->")
      );
    }
    if (n.byteSize > e.progressiveChunkSize)
      return (
        (n.rootSegmentID = e.nextSegmentId++),
        e.completedBoundaries.push(n),
        oo(t, e.responseState, n.id),
        Vt(e, t, r),
        t.push("<!--/$-->")
      );
    if (
      (e.responseState.generateStaticMarkup || t.push("<!--$-->"),
      (r = n.completedSegments),
      r.length !== 1)
    )
      throw Error(v(391));
    return (
      rn(e, t, r[0]),
      (e = e.responseState.generateStaticMarkup ? !0 : t.push("<!--/$-->")),
      e
    );
  }
  function yo(e, t, r) {
    return (
      ul(t, e.responseState, r.formatContext, r.id),
      rn(e, t, r),
      ll(t, r.formatContext)
    );
  }
  function Fo(e, t, r) {
    for (var n = r.completedSegments, o = 0; o < n.length; o++)
      Vo(e, t, r, n[o]);
    if (
      ((n.length = 0),
      (e = e.responseState),
      (n = r.id),
      (r = r.rootSegmentID),
      t.push(e.startInlineScript),
      e.sentCompleteBoundaryFunction
        ? t.push('$RC("')
        : ((e.sentCompleteBoundaryFunction = !0),
          t.push(
            'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
          )),
      n === null)
    )
      throw Error(v(395));
    return (
      (r = r.toString(16)),
      t.push(n),
      t.push('","'),
      t.push(e.segmentPrefix),
      t.push(r),
      t.push('")</script>')
    );
  }
  function Vo(e, t, r, n) {
    if (n.status === 2) return !0;
    var o = n.id;
    if (o === -1) {
      if ((n.id = r.rootSegmentID) === -1) throw Error(v(392));
      return yo(e, t, n);
    }
    return (
      yo(e, t, n),
      (e = e.responseState),
      t.push(e.startInlineScript),
      e.sentCompleteSegmentFunction
        ? t.push('$RS("')
        : ((e.sentCompleteSegmentFunction = !0),
          t.push(
            'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
          )),
      t.push(e.segmentPrefix),
      (o = o.toString(16)),
      t.push(o),
      t.push('","'),
      t.push(e.placeholderPrefix),
      t.push(o),
      t.push('")</script>')
    );
  }
  function cr(e, t) {
    try {
      var r = e.completedRootSegment;
      if (r !== null && e.pendingRootTasks === 0) {
        rn(e, t, r), (e.completedRootSegment = null);
        var n = e.responseState.bootstrapChunks;
        for (r = 0; r < n.length - 1; r++) t.push(n[r]);
        r < n.length && t.push(n[r]);
      }
      var o = e.clientRenderedBoundaries,
        i;
      for (i = 0; i < o.length; i++) {
        var a = o[i];
        n = t;
        var s = e.responseState,
          u = a.id,
          c = a.errorDigest,
          l = a.errorMessage,
          p = a.errorComponentStack;
        if (
          (n.push(s.startInlineScript),
          s.sentClientRenderFunction
            ? n.push('$RX("')
            : ((s.sentClientRenderFunction = !0),
              n.push(
                'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
              )),
          u === null)
        )
          throw Error(v(395));
        if ((n.push(u), n.push('"'), c || l || p)) {
          n.push(",");
          var f = Yn(c || "");
          n.push(f);
        }
        if (l || p) {
          n.push(",");
          var x = Yn(l || "");
          n.push(x);
        }
        if (p) {
          n.push(",");
          var g = Yn(p);
          n.push(g);
        }
        if (!n.push(")</script>")) {
          (e.destination = null), i++, o.splice(0, i);
          return;
        }
      }
      o.splice(0, i);
      var E = e.completedBoundaries;
      for (i = 0; i < E.length; i++)
        if (!Fo(e, t, E[i])) {
          (e.destination = null), i++, E.splice(0, i);
          return;
        }
      E.splice(0, i);
      var k = e.partialBoundaries;
      for (i = 0; i < k.length; i++) {
        var $ = k[i];
        e: {
          (o = e), (a = t);
          var M = $.completedSegments;
          for (s = 0; s < M.length; s++)
            if (!Vo(o, a, $, M[s])) {
              s++, M.splice(0, s);
              var V = !1;
              break e;
            }
          M.splice(0, s), (V = !0);
        }
        if (!V) {
          (e.destination = null), i++, k.splice(0, i);
          return;
        }
      }
      k.splice(0, i);
      var b = e.completedBoundaries;
      for (i = 0; i < b.length; i++)
        if (!Fo(e, t, b[i])) {
          (e.destination = null), i++, b.splice(0, i);
          return;
        }
      b.splice(0, i);
    } finally {
      e.allPendingTasks === 0 &&
        e.pingedTasks.length === 0 &&
        e.clientRenderedBoundaries.length === 0 &&
        e.completedBoundaries.length === 0 &&
        t.push(null);
    }
  }
  function Al(e, t) {
    try {
      var r = e.abortableTasks;
      r.forEach(function (n) {
        return zo(n, e, t);
      }),
        r.clear(),
        e.destination !== null && cr(e, e.destination);
    } catch (n) {
      ft(e, n), Qt(e, n);
    }
  }
  function Bl() {}
  function qo(e, t, r, n) {
    var o = !1,
      i = null,
      a = "",
      s = {
        push: function (c) {
          return c !== null && (a += c), !0;
        },
        destroy: function (c) {
          (o = !0), (i = c);
        },
      },
      u = !1;
    if (
      ((e = Sl(
        e,
        pl(r, t ? t.identifierPrefix : void 0),
        { insertionMode: 1, selectedValue: null },
        1 / 0,
        Bl,
        void 0,
        function () {
          u = !0;
        },
        void 0,
        void 0,
      )),
      Ho(e),
      Al(e, n),
      e.status === 1)
    )
      (e.status = 2), s.destroy(e.fatalError);
    else if (e.status !== 2 && e.destination === null) {
      e.destination = s;
      try {
        cr(e, s);
      } catch (c) {
        ft(e, c), Qt(e, c);
      }
    }
    if (o) throw i;
    if (!u) throw Error(v(426));
    return a;
  }
  Ze.renderToNodeStream = function () {
    throw Error(v(207));
  };
  Ze.renderToStaticMarkup = function (e, t) {
    return qo(
      e,
      t,
      !0,
      'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
    );
  };
  Ze.renderToStaticNodeStream = function () {
    throw Error(v(208));
  };
  Ze.renderToString = function (e, t) {
    return qo(
      e,
      t,
      !1,
      'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server',
    );
  };
  Ze.version = "18.2.0";
});
var Va = K((jr) => {
  "use strict";
  var va = De();
  function w(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        r = 1;
      r < arguments.length;
      r++
    )
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var ne = null,
    re = 0;
  function m(e, t) {
    if (t.length !== 0)
      if (512 < t.length)
        0 < re &&
          (e.enqueue(new Uint8Array(ne.buffer, 0, re)),
          (ne = new Uint8Array(512)),
          (re = 0)),
          e.enqueue(t);
      else {
        var r = ne.length - re;
        r < t.length &&
          (r === 0
            ? e.enqueue(ne)
            : (ne.set(t.subarray(0, r), re),
              e.enqueue(ne),
              (t = t.subarray(r))),
          (ne = new Uint8Array(512)),
          (re = 0)),
          ne.set(t, re),
          (re += t.length);
      }
  }
  function P(e, t) {
    return m(e, t), !0;
  }
  function Go(e) {
    ne &&
      0 < re &&
      (e.enqueue(new Uint8Array(ne.buffer, 0, re)), (ne = null), (re = 0));
  }
  var ya = new TextEncoder();
  function C(e) {
    return ya.encode(e);
  }
  function d(e) {
    return ya.encode(e);
  }
  function Fa(e, t) {
    typeof e.error == "function" ? e.error(t) : e.close();
  }
  var Y = Object.prototype.hasOwnProperty,
    Rl =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Jo = {},
    Xo = {};
  function wa(e) {
    return Y.call(Xo, e)
      ? !0
      : Y.call(Jo, e)
      ? !1
      : Rl.test(e)
      ? (Xo[e] = !0)
      : ((Jo[e] = !0), !1);
  }
  function J(e, t, r, n, o, i, a) {
    (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = n),
      (this.attributeNamespace = o),
      (this.mustUseProperty = r),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = i),
      (this.removeEmptyString = a);
  }
  var H = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      H[e] = new J(e, 0, !1, e, null, !1, !1);
    });
  [
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
  ].forEach(function (e) {
    var t = e[0];
    H[t] = new J(t, 1, !1, e[1], null, !1, !1);
  });
  ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
    H[e] = new J(e, 2, !1, e.toLowerCase(), null, !1, !1);
  });
  [
    "autoReverse",
    "externalResourcesRequired",
    "focusable",
    "preserveAlpha",
  ].forEach(function (e) {
    H[e] = new J(e, 2, !1, e, null, !1, !1);
  });
  "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
    .split(" ")
    .forEach(function (e) {
      H[e] = new J(e, 3, !1, e.toLowerCase(), null, !1, !1);
    });
  ["checked", "multiple", "muted", "selected"].forEach(function (e) {
    H[e] = new J(e, 3, !0, e, null, !1, !1);
  });
  ["capture", "download"].forEach(function (e) {
    H[e] = new J(e, 4, !1, e, null, !1, !1);
  });
  ["cols", "rows", "size", "span"].forEach(function (e) {
    H[e] = new J(e, 6, !1, e, null, !1, !1);
  });
  ["rowSpan", "start"].forEach(function (e) {
    H[e] = new J(e, 5, !1, e.toLowerCase(), null, !1, !1);
  });
  var wr = /[\-:]([a-z])/g;
  function Cr(e) {
    return e[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(wr, Cr);
      H[t] = new J(t, 1, !1, e, null, !1, !1);
    });
  "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(wr, Cr);
      H[t] = new J(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
    });
  ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
    var t = e.replace(wr, Cr);
    H[t] = new J(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
  });
  ["tabIndex", "crossOrigin"].forEach(function (e) {
    H[e] = new J(e, 1, !1, e.toLowerCase(), null, !1, !1);
  });
  H.xlinkHref = new J(
    "xlinkHref",
    1,
    !1,
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    !1,
  );
  ["src", "href", "action", "formAction"].forEach(function (e) {
    H[e] = new J(e, 1, !1, e.toLowerCase(), null, !0, !0);
  });
  var sn = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    jl = ["Webkit", "ms", "Moz", "O"];
  Object.keys(sn).forEach(function (e) {
    jl.forEach(function (t) {
      (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (sn[t] = sn[e]);
    });
  });
  var _l = /["'&<>]/;
  function U(e) {
    if (typeof e == "boolean" || typeof e == "number") return "" + e;
    e = "" + e;
    var t = _l.exec(e);
    if (t) {
      var r = "",
        n,
        o = 0;
      for (n = t.index; n < e.length; n++) {
        switch (e.charCodeAt(n)) {
          case 34:
            t = "&quot;";
            break;
          case 38:
            t = "&amp;";
            break;
          case 39:
            t = "&#x27;";
            break;
          case 60:
            t = "&lt;";
            break;
          case 62:
            t = "&gt;";
            break;
          default:
            continue;
        }
        o !== n && (r += e.substring(o, n)), (o = n + 1), (r += t);
      }
      e = o !== n ? r + e.substring(o, n) : r;
    }
    return e;
  }
  var Tl = /([A-Z])/g,
    $l = /^ms-/,
    gr = Array.isArray,
    Pl = d("<script>"),
    Il = d("</script>"),
    Ml = d('<script src="'),
    Ol = d('<script type="module" src="'),
    Yo = d('" async=""></script>'),
    Nl = /(<\/|<)(s)(cript)/gi;
  function Ll(e, t, r, n) {
    return "" + t + (r === "s" ? "\\u0073" : "\\u0053") + n;
  }
  function zl(e, t, r, n, o) {
    (e = e === void 0 ? "" : e),
      (t = t === void 0 ? Pl : d('<script nonce="' + U(t) + '">'));
    var i = [];
    if (
      (r !== void 0 && i.push(t, C(("" + r).replace(Nl, Ll)), Il), n !== void 0)
    )
      for (r = 0; r < n.length; r++) i.push(Ml, C(U(n[r])), Yo);
    if (o !== void 0) for (n = 0; n < o.length; n++) i.push(Ol, C(U(o[n])), Yo);
    return {
      bootstrapChunks: i,
      startInlineScript: t,
      placeholderPrefix: d(e + "P:"),
      segmentPrefix: d(e + "S:"),
      boundaryPrefix: e + "B:",
      idPrefix: e,
      nextSuspenseID: 0,
      sentCompleteSegmentFunction: !1,
      sentCompleteBoundaryFunction: !1,
      sentClientRenderFunction: !1,
    };
  }
  function pe(e, t) {
    return { insertionMode: e, selectedValue: t };
  }
  function Ul(e) {
    return pe(
      e === "http://www.w3.org/2000/svg"
        ? 2
        : e === "http://www.w3.org/1998/Math/MathML"
        ? 3
        : 0,
      null,
    );
  }
  function Hl(e, t, r) {
    switch (t) {
      case "select":
        return pe(1, r.value != null ? r.value : r.defaultValue);
      case "svg":
        return pe(2, null);
      case "math":
        return pe(3, null);
      case "foreignObject":
        return pe(1, null);
      case "table":
        return pe(4, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return pe(5, null);
      case "colgroup":
        return pe(7, null);
      case "tr":
        return pe(6, null);
    }
    return 4 <= e.insertionMode || e.insertionMode === 0 ? pe(1, null) : e;
  }
  var Er = d("<!-- -->");
  function Zo(e, t, r, n) {
    return t === "" ? n : (n && e.push(Er), e.push(C(U(t))), !0);
  }
  var Ko = new Map(),
    Vl = d(' style="'),
    Qo = d(":"),
    ql = d(";");
  function Ca(e, t, r) {
    if (typeof r != "object") throw Error(w(62));
    t = !0;
    for (var n in r)
      if (Y.call(r, n)) {
        var o = r[n];
        if (o != null && typeof o != "boolean" && o !== "") {
          if (n.indexOf("--") === 0) {
            var i = C(U(n));
            o = C(U(("" + o).trim()));
          } else {
            i = n;
            var a = Ko.get(i);
            a !== void 0 ||
              ((a = d(
                U(i.replace(Tl, "-$1").toLowerCase().replace($l, "-ms-")),
              )),
              Ko.set(i, a)),
              (i = a),
              (o =
                typeof o == "number"
                  ? o === 0 || Y.call(sn, n)
                    ? C("" + o)
                    : C(o + "px")
                  : C(U(("" + o).trim())));
          }
          t ? ((t = !1), e.push(Vl, i, Qo, o)) : e.push(ql, i, Qo, o);
        }
      }
    t || e.push(Oe);
  }
  var Ce = d(" "),
    Ke = d('="'),
    Oe = d('"'),
    ea = d('=""');
  function te(e, t, r, n) {
    switch (r) {
      case "style":
        Ca(e, t, n);
        return;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
        return;
    }
    if (
      !(2 < r.length) ||
      (r[0] !== "o" && r[0] !== "O") ||
      (r[1] !== "n" && r[1] !== "N")
    ) {
      if (((t = H.hasOwnProperty(r) ? H[r] : null), t !== null)) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (!t.acceptsBooleans) return;
        }
        switch (((r = C(t.attributeName)), t.type)) {
          case 3:
            n && e.push(Ce, r, ea);
            break;
          case 4:
            n === !0
              ? e.push(Ce, r, ea)
              : n !== !1 && e.push(Ce, r, Ke, C(U(n)), Oe);
            break;
          case 5:
            isNaN(n) || e.push(Ce, r, Ke, C(U(n)), Oe);
            break;
          case 6:
            !isNaN(n) && 1 <= n && e.push(Ce, r, Ke, C(U(n)), Oe);
            break;
          default:
            t.sanitizeURL && (n = "" + n), e.push(Ce, r, Ke, C(U(n)), Oe);
        }
      } else if (wa(r)) {
        switch (typeof n) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            if (
              ((t = r.toLowerCase().slice(0, 5)),
              t !== "data-" && t !== "aria-")
            )
              return;
        }
        e.push(Ce, C(r), Ke, C(U(n)), Oe);
      }
    }
  }
  var Ee = d(">"),
    ta = d("/>");
  function un(e, t, r) {
    if (t != null) {
      if (r != null) throw Error(w(60));
      if (typeof t != "object" || !("__html" in t)) throw Error(w(61));
      (t = t.__html), t != null && e.push(C("" + t));
    }
  }
  function Wl(e) {
    var t = "";
    return (
      va.Children.forEach(e, function (r) {
        r != null && (t += r);
      }),
      t
    );
  }
  var pr = d(' selected=""');
  function dr(e, t, r, n) {
    e.push(de(r));
    var o = (r = null),
      i;
    for (i in t)
      if (Y.call(t, i)) {
        var a = t[i];
        if (a != null)
          switch (i) {
            case "children":
              r = a;
              break;
            case "dangerouslySetInnerHTML":
              o = a;
              break;
            default:
              te(e, n, i, a);
          }
      }
    return (
      e.push(Ee),
      un(e, o, r),
      typeof r == "string" ? (e.push(C(U(r))), null) : r
    );
  }
  var fr = d(`
`),
    Gl = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,
    na = new Map();
  function de(e) {
    var t = na.get(e);
    if (t === void 0) {
      if (!Gl.test(e)) throw Error(w(65, e));
      (t = d("<" + e)), na.set(e, t);
    }
    return t;
  }
  var Jl = d("<!DOCTYPE html>");
  function Xl(e, t, r, n, o) {
    switch (t) {
      case "select":
        e.push(de("select"));
        var i = null,
          a = null;
        for (l in r)
          if (Y.call(r, l)) {
            var s = r[l];
            if (s != null)
              switch (l) {
                case "children":
                  i = s;
                  break;
                case "dangerouslySetInnerHTML":
                  a = s;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  te(e, n, l, s);
              }
          }
        return e.push(Ee), un(e, a, i), i;
      case "option":
        (a = o.selectedValue), e.push(de("option"));
        var u = (s = null),
          c = null,
          l = null;
        for (i in r)
          if (Y.call(r, i)) {
            var p = r[i];
            if (p != null)
              switch (i) {
                case "children":
                  s = p;
                  break;
                case "selected":
                  c = p;
                  break;
                case "dangerouslySetInnerHTML":
                  l = p;
                  break;
                case "value":
                  u = p;
                default:
                  te(e, n, i, p);
              }
          }
        if (a != null)
          if (((r = u !== null ? "" + u : Wl(s)), gr(a))) {
            for (n = 0; n < a.length; n++)
              if ("" + a[n] === r) {
                e.push(pr);
                break;
              }
          } else "" + a === r && e.push(pr);
        else c && e.push(pr);
        return e.push(Ee), un(e, l, s), s;
      case "textarea":
        e.push(de("textarea")), (l = a = i = null);
        for (s in r)
          if (Y.call(r, s) && ((u = r[s]), u != null))
            switch (s) {
              case "children":
                l = u;
                break;
              case "value":
                i = u;
                break;
              case "defaultValue":
                a = u;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(w(91));
              default:
                te(e, n, s, u);
            }
        if ((i === null && a !== null && (i = a), e.push(Ee), l != null)) {
          if (i != null) throw Error(w(92));
          if (gr(l) && 1 < l.length) throw Error(w(93));
          i = "" + l;
        }
        return (
          typeof i == "string" &&
            i[0] ===
              `
` &&
            e.push(fr),
          i !== null && e.push(C(U("" + i))),
          null
        );
      case "input":
        e.push(de("input")), (u = l = s = i = null);
        for (a in r)
          if (Y.call(r, a) && ((c = r[a]), c != null))
            switch (a) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(w(399, "input"));
              case "defaultChecked":
                u = c;
                break;
              case "defaultValue":
                s = c;
                break;
              case "checked":
                l = c;
                break;
              case "value":
                i = c;
                break;
              default:
                te(e, n, a, c);
            }
        return (
          l !== null
            ? te(e, n, "checked", l)
            : u !== null && te(e, n, "checked", u),
          i !== null
            ? te(e, n, "value", i)
            : s !== null && te(e, n, "value", s),
          e.push(ta),
          null
        );
      case "menuitem":
        e.push(de("menuitem"));
        for (var f in r)
          if (Y.call(r, f) && ((i = r[f]), i != null))
            switch (f) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(w(400));
              default:
                te(e, n, f, i);
            }
        return e.push(Ee), null;
      case "title":
        e.push(de("title")), (i = null);
        for (p in r)
          if (Y.call(r, p) && ((a = r[p]), a != null))
            switch (p) {
              case "children":
                i = a;
                break;
              case "dangerouslySetInnerHTML":
                throw Error(w(434));
              default:
                te(e, n, p, a);
            }
        return e.push(Ee), i;
      case "listing":
      case "pre":
        e.push(de(t)), (a = i = null);
        for (u in r)
          if (Y.call(r, u) && ((s = r[u]), s != null))
            switch (u) {
              case "children":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                a = s;
                break;
              default:
                te(e, n, u, s);
            }
        if ((e.push(Ee), a != null)) {
          if (i != null) throw Error(w(60));
          if (typeof a != "object" || !("__html" in a)) throw Error(w(61));
          (r = a.__html),
            r != null &&
              (typeof r == "string" &&
              0 < r.length &&
              r[0] ===
                `
`
                ? e.push(fr, C(r))
                : e.push(C("" + r)));
        }
        return (
          typeof i == "string" &&
            i[0] ===
              `
` &&
            e.push(fr),
          i
        );
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        e.push(de(t));
        for (var x in r)
          if (Y.call(r, x) && ((i = r[x]), i != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(w(399, t));
              default:
                te(e, n, x, i);
            }
        return e.push(ta), null;
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return dr(e, r, t, n);
      case "html":
        return o.insertionMode === 0 && e.push(Jl), dr(e, r, t, n);
      default:
        if (t.indexOf("-") === -1 && typeof r.is != "string")
          return dr(e, r, t, n);
        e.push(de(t)), (a = i = null);
        for (c in r)
          if (Y.call(r, c) && ((s = r[c]), s != null))
            switch (c) {
              case "children":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                a = s;
                break;
              case "style":
                Ca(e, n, s);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
                break;
              default:
                wa(c) &&
                  typeof s != "function" &&
                  typeof s != "symbol" &&
                  e.push(Ce, C(c), Ke, C(U(s)), Oe);
            }
        return e.push(Ee), un(e, a, i), i;
    }
  }
  var Yl = d("</"),
    Zl = d(">"),
    Kl = d('<template id="'),
    Ql = d('"></template>'),
    ec = d("<!--$-->"),
    tc = d('<!--$?--><template id="'),
    nc = d('"></template>'),
    rc = d("<!--$!-->"),
    ic = d("<!--/$-->"),
    oc = d("<template"),
    ac = d('"'),
    sc = d(' data-dgst="');
  d(' data-msg="');
  d(' data-stck="');
  var uc = d("></template>");
  function ra(e, t, r) {
    if ((m(e, tc), r === null)) throw Error(w(395));
    return m(e, r), P(e, nc);
  }
  var lc = d('<div hidden id="'),
    cc = d('">'),
    pc = d("</div>"),
    dc = d('<svg aria-hidden="true" style="display:none" id="'),
    fc = d('">'),
    Dc = d("</svg>"),
    mc = d('<math aria-hidden="true" style="display:none" id="'),
    hc = d('">'),
    gc = d("</math>"),
    xc = d('<table hidden id="'),
    vc = d('">'),
    yc = d("</table>"),
    Fc = d('<table hidden><tbody id="'),
    wc = d('">'),
    Cc = d("</tbody></table>"),
    Ec = d('<table hidden><tr id="'),
    bc = d('">'),
    Sc = d("</tr></table>"),
    kc = d('<table hidden><colgroup id="'),
    Ac = d('">'),
    Bc = d("</colgroup></table>");
  function Rc(e, t, r, n) {
    switch (r.insertionMode) {
      case 0:
      case 1:
        return (
          m(e, lc), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, cc)
        );
      case 2:
        return (
          m(e, dc), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, fc)
        );
      case 3:
        return (
          m(e, mc), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, hc)
        );
      case 4:
        return (
          m(e, xc), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, vc)
        );
      case 5:
        return (
          m(e, Fc), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, wc)
        );
      case 6:
        return (
          m(e, Ec), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, bc)
        );
      case 7:
        return (
          m(e, kc), m(e, t.segmentPrefix), m(e, C(n.toString(16))), P(e, Ac)
        );
      default:
        throw Error(w(397));
    }
  }
  function jc(e, t) {
    switch (t.insertionMode) {
      case 0:
      case 1:
        return P(e, pc);
      case 2:
        return P(e, Dc);
      case 3:
        return P(e, gc);
      case 4:
        return P(e, yc);
      case 5:
        return P(e, Cc);
      case 6:
        return P(e, Sc);
      case 7:
        return P(e, Bc);
      default:
        throw Error(w(397));
    }
  }
  var _c = d(
      'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("',
    ),
    Tc = d('$RS("'),
    $c = d('","'),
    Pc = d('")</script>'),
    Ic = d(
      'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("',
    ),
    Mc = d('$RC("'),
    Oc = d('","'),
    Nc = d('")</script>'),
    Lc = d(
      'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("',
    ),
    zc = d('$RX("'),
    Uc = d('"'),
    Hc = d(")</script>"),
    Dr = d(","),
    Vc = /[<\u2028\u2029]/g;
  function mr(e) {
    return JSON.stringify(e).replace(Vc, function (t) {
      switch (t) {
        case "<":
          return "\\u003c";
        case "\u2028":
          return "\\u2028";
        case "\u2029":
          return "\\u2029";
        default:
          throw Error(
            "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React",
          );
      }
    });
  }
  var ht = Object.assign,
    qc = Symbol.for("react.element"),
    Ea = Symbol.for("react.portal"),
    ba = Symbol.for("react.fragment"),
    Sa = Symbol.for("react.strict_mode"),
    ka = Symbol.for("react.profiler"),
    Aa = Symbol.for("react.provider"),
    Ba = Symbol.for("react.context"),
    Ra = Symbol.for("react.forward_ref"),
    ja = Symbol.for("react.suspense"),
    _a = Symbol.for("react.suspense_list"),
    Ta = Symbol.for("react.memo"),
    br = Symbol.for("react.lazy"),
    Wc = Symbol.for("react.scope"),
    Gc = Symbol.for("react.debug_trace_mode"),
    Jc = Symbol.for("react.legacy_hidden"),
    Xc = Symbol.for("react.default_value"),
    ia = Symbol.iterator;
  function xr(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case ba:
        return "Fragment";
      case Ea:
        return "Portal";
      case ka:
        return "Profiler";
      case Sa:
        return "StrictMode";
      case ja:
        return "Suspense";
      case _a:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ba:
          return (e.displayName || "Context") + ".Consumer";
        case Aa:
          return (e._context.displayName || "Context") + ".Provider";
        case Ra:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Ta:
          return (
            (t = e.displayName || null), t !== null ? t : xr(e.type) || "Memo"
          );
        case br:
          (t = e._payload), (e = e._init);
          try {
            return xr(e(t));
          } catch {}
      }
    return null;
  }
  var $a = {};
  function oa(e, t) {
    if (((e = e.contextTypes), !e)) return $a;
    var r = {},
      n;
    for (n in e) r[n] = t[n];
    return r;
  }
  var Le = null;
  function gn(e, t) {
    if (e !== t) {
      (e.context._currentValue = e.parentValue), (e = e.parent);
      var r = t.parent;
      if (e === null) {
        if (r !== null) throw Error(w(401));
      } else {
        if (r === null) throw Error(w(401));
        gn(e, r);
      }
      t.context._currentValue = t.value;
    }
  }
  function Pa(e) {
    (e.context._currentValue = e.parentValue),
      (e = e.parent),
      e !== null && Pa(e);
  }
  function Ia(e) {
    var t = e.parent;
    t !== null && Ia(t), (e.context._currentValue = e.value);
  }
  function Ma(e, t) {
    if (((e.context._currentValue = e.parentValue), (e = e.parent), e === null))
      throw Error(w(402));
    e.depth === t.depth ? gn(e, t) : Ma(e, t);
  }
  function Oa(e, t) {
    var r = t.parent;
    if (r === null) throw Error(w(402));
    e.depth === r.depth ? gn(e, r) : Oa(e, r),
      (t.context._currentValue = t.value);
  }
  function dn(e) {
    var t = Le;
    t !== e &&
      (t === null
        ? Ia(e)
        : e === null
        ? Pa(t)
        : t.depth === e.depth
        ? gn(t, e)
        : t.depth > e.depth
        ? Ma(t, e)
        : Oa(t, e),
      (Le = e));
  }
  var aa = {
    isMounted: function () {
      return !1;
    },
    enqueueSetState: function (e, t) {
      (e = e._reactInternals), e.queue !== null && e.queue.push(t);
    },
    enqueueReplaceState: function (e, t) {
      (e = e._reactInternals), (e.replace = !0), (e.queue = [t]);
    },
    enqueueForceUpdate: function () {},
  };
  function sa(e, t, r, n) {
    var o = e.state !== void 0 ? e.state : null;
    (e.updater = aa), (e.props = r), (e.state = o);
    var i = { queue: [], replace: !1 };
    e._reactInternals = i;
    var a = t.contextType;
    if (
      ((e.context = typeof a == "object" && a !== null ? a._currentValue : n),
      (a = t.getDerivedStateFromProps),
      typeof a == "function" &&
        ((a = a(r, o)), (o = a == null ? o : ht({}, o, a)), (e.state = o)),
      typeof t.getDerivedStateFromProps != "function" &&
        typeof e.getSnapshotBeforeUpdate != "function" &&
        (typeof e.UNSAFE_componentWillMount == "function" ||
          typeof e.componentWillMount == "function"))
    )
      if (
        ((t = e.state),
        typeof e.componentWillMount == "function" && e.componentWillMount(),
        typeof e.UNSAFE_componentWillMount == "function" &&
          e.UNSAFE_componentWillMount(),
        t !== e.state && aa.enqueueReplaceState(e, e.state, null),
        i.queue !== null && 0 < i.queue.length)
      )
        if (
          ((t = i.queue),
          (a = i.replace),
          (i.queue = null),
          (i.replace = !1),
          a && t.length === 1)
        )
          e.state = t[0];
        else {
          for (
            i = a ? t[0] : e.state, o = !0, a = a ? 1 : 0;
            a < t.length;
            a++
          ) {
            var s = t[a];
            (s = typeof s == "function" ? s.call(e, i, r, n) : s),
              s != null && (o ? ((o = !1), (i = ht({}, i, s))) : ht(i, s));
          }
          e.state = i;
        }
      else i.queue = null;
  }
  var Yc = { id: 1, overflow: "" };
  function vr(e, t, r) {
    var n = e.id;
    e = e.overflow;
    var o = 32 - ln(n) - 1;
    (n &= ~(1 << o)), (r += 1);
    var i = 32 - ln(t) + o;
    if (30 < i) {
      var a = o - (o % 5);
      return (
        (i = (n & ((1 << a) - 1)).toString(32)),
        (n >>= a),
        (o -= a),
        { id: (1 << (32 - ln(t) + o)) | (r << o) | n, overflow: i + e }
      );
    }
    return { id: (1 << i) | (r << o) | n, overflow: e };
  }
  var ln = Math.clz32 ? Math.clz32 : Qc,
    Zc = Math.log,
    Kc = Math.LN2;
  function Qc(e) {
    return (e >>>= 0), e === 0 ? 32 : (31 - ((Zc(e) / Kc) | 0)) | 0;
  }
  function ep(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var tp = typeof Object.is == "function" ? Object.is : ep,
    ge = null,
    Sr = null,
    cn = null,
    T = null,
    Dt = !1,
    fn = !1,
    gt = 0,
    be = null,
    xn = 0;
  function Ne() {
    if (ge === null) throw Error(w(321));
    return ge;
  }
  function ua() {
    if (0 < xn) throw Error(w(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function kr() {
    return (
      T === null
        ? cn === null
          ? ((Dt = !1), (cn = T = ua()))
          : ((Dt = !0), (T = cn))
        : T.next === null
        ? ((Dt = !1), (T = T.next = ua()))
        : ((Dt = !0), (T = T.next)),
      T
    );
  }
  function Ar() {
    (Sr = ge = null), (fn = !1), (cn = null), (xn = 0), (T = be = null);
  }
  function Na(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function la(e, t, r) {
    if (((ge = Ne()), (T = kr()), Dt)) {
      var n = T.queue;
      if (((t = n.dispatch), be !== null && ((r = be.get(n)), r !== void 0))) {
        be.delete(n), (n = T.memoizedState);
        do (n = e(n, r.action)), (r = r.next);
        while (r !== null);
        return (T.memoizedState = n), [n, t];
      }
      return [T.memoizedState, t];
    }
    return (
      (e =
        e === Na
          ? typeof t == "function"
            ? t()
            : t
          : r !== void 0
          ? r(t)
          : t),
      (T.memoizedState = e),
      (e = T.queue = { last: null, dispatch: null }),
      (e = e.dispatch = np.bind(null, ge, e)),
      [T.memoizedState, e]
    );
  }
  function ca(e, t) {
    if (((ge = Ne()), (T = kr()), (t = t === void 0 ? null : t), T !== null)) {
      var r = T.memoizedState;
      if (r !== null && t !== null) {
        var n = r[1];
        e: if (n === null) n = !1;
        else {
          for (var o = 0; o < n.length && o < t.length; o++)
            if (!tp(t[o], n[o])) {
              n = !1;
              break e;
            }
          n = !0;
        }
        if (n) return r[0];
      }
    }
    return (e = e()), (T.memoizedState = [e, t]), e;
  }
  function np(e, t, r) {
    if (25 <= xn) throw Error(w(301));
    if (e === ge)
      if (
        ((fn = !0),
        (e = { action: r, next: null }),
        be === null && (be = new Map()),
        (r = be.get(t)),
        r === void 0)
      )
        be.set(t, e);
      else {
        for (t = r; t.next !== null; ) t = t.next;
        t.next = e;
      }
  }
  function rp() {
    throw Error(w(394));
  }
  function on() {}
  var pa = {
      readContext: function (e) {
        return e._currentValue;
      },
      useContext: function (e) {
        return Ne(), e._currentValue;
      },
      useMemo: ca,
      useReducer: la,
      useRef: function (e) {
        (ge = Ne()), (T = kr());
        var t = T.memoizedState;
        return t === null ? ((e = { current: e }), (T.memoizedState = e)) : t;
      },
      useState: function (e) {
        return la(Na, e);
      },
      useInsertionEffect: on,
      useLayoutEffect: function () {},
      useCallback: function (e, t) {
        return ca(function () {
          return e;
        }, t);
      },
      useImperativeHandle: on,
      useEffect: on,
      useDebugValue: on,
      useDeferredValue: function (e) {
        return Ne(), e;
      },
      useTransition: function () {
        return Ne(), [!1, rp];
      },
      useId: function () {
        var e = Sr.treeContext,
          t = e.overflow;
        (e = e.id), (e = (e & ~(1 << (32 - ln(e) - 1))).toString(32) + t);
        var r = pn;
        if (r === null) throw Error(w(404));
        return (
          (t = gt++),
          (e = ":" + r.idPrefix + "R" + e),
          0 < t && (e += "H" + t.toString(32)),
          e + ":"
        );
      },
      useMutableSource: function (e, t) {
        return Ne(), t(e._source);
      },
      useSyncExternalStore: function (e, t, r) {
        if (r === void 0) throw Error(w(407));
        return r();
      },
    },
    pn = null,
    hr =
      va.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
  function ip(e) {
    return console.error(e), null;
  }
  function mt() {}
  function op(e, t, r, n, o, i, a, s, u) {
    var c = [],
      l = new Set();
    return (
      (t = {
        destination: null,
        responseState: t,
        progressiveChunkSize: n === void 0 ? 12800 : n,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: l,
        pingedTasks: c,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: o === void 0 ? ip : o,
        onAllReady: i === void 0 ? mt : i,
        onShellReady: a === void 0 ? mt : a,
        onShellError: s === void 0 ? mt : s,
        onFatalError: u === void 0 ? mt : u,
      }),
      (r = Dn(t, 0, null, r, !1, !1)),
      (r.parentFlushed = !0),
      (e = Br(t, e, null, r, l, $a, null, Yc)),
      c.push(e),
      t
    );
  }
  function Br(e, t, r, n, o, i, a, s) {
    e.allPendingTasks++, r === null ? e.pendingRootTasks++ : r.pendingTasks++;
    var u = {
      node: t,
      ping: function () {
        var c = e.pingedTasks;
        c.push(u), c.length === 1 && Ua(e);
      },
      blockedBoundary: r,
      blockedSegment: n,
      abortSet: o,
      legacyContext: i,
      context: a,
      treeContext: s,
    };
    return o.add(u), u;
  }
  function Dn(e, t, r, n, o, i) {
    return {
      status: 0,
      id: -1,
      index: t,
      parentFlushed: !1,
      chunks: [],
      children: [],
      formatContext: n,
      boundary: r,
      lastPushedText: o,
      textEmbedded: i,
    };
  }
  function xt(e, t) {
    if (((e = e.onError(t)), e != null && typeof e != "string"))
      throw Error(
        'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
          typeof e +
          '" instead',
      );
    return e;
  }
  function mn(e, t) {
    var r = e.onShellError;
    r(t),
      (r = e.onFatalError),
      r(t),
      e.destination !== null
        ? ((e.status = 2), Fa(e.destination, t))
        : ((e.status = 1), (e.fatalError = t));
  }
  function da(e, t, r, n, o) {
    for (ge = {}, Sr = t, gt = 0, e = r(n, o); fn; )
      (fn = !1), (gt = 0), (xn += 1), (T = null), (e = r(n, o));
    return Ar(), e;
  }
  function fa(e, t, r, n) {
    var o = r.render(),
      i = n.childContextTypes;
    if (i != null) {
      var a = t.legacyContext;
      if (typeof r.getChildContext != "function") n = a;
      else {
        r = r.getChildContext();
        for (var s in r)
          if (!(s in i)) throw Error(w(108, xr(n) || "Unknown", s));
        n = ht({}, a, r);
      }
      (t.legacyContext = n), ie(e, t, o), (t.legacyContext = a);
    } else ie(e, t, o);
  }
  function Da(e, t) {
    if (e && e.defaultProps) {
      (t = ht({}, t)), (e = e.defaultProps);
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function yr(e, t, r, n, o) {
    if (typeof r == "function")
      if (r.prototype && r.prototype.isReactComponent) {
        o = oa(r, t.legacyContext);
        var i = r.contextType;
        (i = new r(
          n,
          typeof i == "object" && i !== null ? i._currentValue : o,
        )),
          sa(i, r, n, o),
          fa(e, t, i, r);
      } else {
        (i = oa(r, t.legacyContext)), (o = da(e, t, r, n, i));
        var a = gt !== 0;
        if (
          typeof o == "object" &&
          o !== null &&
          typeof o.render == "function" &&
          o.$$typeof === void 0
        )
          sa(o, r, n, i), fa(e, t, o, r);
        else if (a) {
          (n = t.treeContext), (t.treeContext = vr(n, 1, 0));
          try {
            ie(e, t, o);
          } finally {
            t.treeContext = n;
          }
        } else ie(e, t, o);
      }
    else if (typeof r == "string") {
      switch (
        ((o = t.blockedSegment),
        (i = Xl(o.chunks, r, n, e.responseState, o.formatContext)),
        (o.lastPushedText = !1),
        (a = o.formatContext),
        (o.formatContext = Hl(a, r, n)),
        Fr(e, t, i),
        (o.formatContext = a),
        r)
      ) {
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "input":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          break;
        default:
          o.chunks.push(Yl, C(r), Zl);
      }
      o.lastPushedText = !1;
    } else {
      switch (r) {
        case Jc:
        case Gc:
        case Sa:
        case ka:
        case ba:
          ie(e, t, n.children);
          return;
        case _a:
          ie(e, t, n.children);
          return;
        case Wc:
          throw Error(w(343));
        case ja:
          e: {
            (r = t.blockedBoundary),
              (o = t.blockedSegment),
              (i = n.fallback),
              (n = n.children),
              (a = new Set());
            var s = {
                id: null,
                rootSegmentID: -1,
                parentFlushed: !1,
                pendingTasks: 0,
                forceClientRender: !1,
                completedSegments: [],
                byteSize: 0,
                fallbackAbortableTasks: a,
                errorDigest: null,
              },
              u = Dn(e, o.chunks.length, s, o.formatContext, !1, !1);
            o.children.push(u), (o.lastPushedText = !1);
            var c = Dn(e, 0, null, o.formatContext, !1, !1);
            (c.parentFlushed = !0),
              (t.blockedBoundary = s),
              (t.blockedSegment = c);
            try {
              if (
                (Fr(e, t, n),
                c.lastPushedText && c.textEmbedded && c.chunks.push(Er),
                (c.status = 1),
                hn(s, c),
                s.pendingTasks === 0)
              )
                break e;
            } catch (l) {
              (c.status = 4),
                (s.forceClientRender = !0),
                (s.errorDigest = xt(e, l));
            } finally {
              (t.blockedBoundary = r), (t.blockedSegment = o);
            }
            (t = Br(e, i, r, u, a, t.legacyContext, t.context, t.treeContext)),
              e.pingedTasks.push(t);
          }
          return;
      }
      if (typeof r == "object" && r !== null)
        switch (r.$$typeof) {
          case Ra:
            if (((n = da(e, t, r.render, n, o)), gt !== 0)) {
              (r = t.treeContext), (t.treeContext = vr(r, 1, 0));
              try {
                ie(e, t, n);
              } finally {
                t.treeContext = r;
              }
            } else ie(e, t, n);
            return;
          case Ta:
            (r = r.type), (n = Da(r, n)), yr(e, t, r, n, o);
            return;
          case Aa:
            if (
              ((o = n.children),
              (r = r._context),
              (n = n.value),
              (i = r._currentValue),
              (r._currentValue = n),
              (a = Le),
              (Le = n =
                {
                  parent: a,
                  depth: a === null ? 0 : a.depth + 1,
                  context: r,
                  parentValue: i,
                  value: n,
                }),
              (t.context = n),
              ie(e, t, o),
              (e = Le),
              e === null)
            )
              throw Error(w(403));
            (n = e.parentValue),
              (e.context._currentValue =
                n === Xc ? e.context._defaultValue : n),
              (e = Le = e.parent),
              (t.context = e);
            return;
          case Ba:
            (n = n.children), (n = n(r._currentValue)), ie(e, t, n);
            return;
          case br:
            (o = r._init),
              (r = o(r._payload)),
              (n = Da(r, n)),
              yr(e, t, r, n, void 0);
            return;
        }
      throw Error(w(130, r == null ? r : typeof r, ""));
    }
  }
  function ie(e, t, r) {
    if (((t.node = r), typeof r == "object" && r !== null)) {
      switch (r.$$typeof) {
        case qc:
          yr(e, t, r.type, r.props, r.ref);
          return;
        case Ea:
          throw Error(w(257));
        case br:
          var n = r._init;
          (r = n(r._payload)), ie(e, t, r);
          return;
      }
      if (gr(r)) {
        ma(e, t, r);
        return;
      }
      if (
        (r === null || typeof r != "object"
          ? (n = null)
          : ((n = (ia && r[ia]) || r["@@iterator"]),
            (n = typeof n == "function" ? n : null)),
        n && (n = n.call(r)))
      ) {
        if (((r = n.next()), !r.done)) {
          var o = [];
          do o.push(r.value), (r = n.next());
          while (!r.done);
          ma(e, t, o);
        }
        return;
      }
      throw (
        ((e = Object.prototype.toString.call(r)),
        Error(
          w(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(r).join(", ") + "}"
              : e,
          ),
        ))
      );
    }
    typeof r == "string"
      ? ((n = t.blockedSegment),
        (n.lastPushedText = Zo(
          t.blockedSegment.chunks,
          r,
          e.responseState,
          n.lastPushedText,
        )))
      : typeof r == "number" &&
        ((n = t.blockedSegment),
        (n.lastPushedText = Zo(
          t.blockedSegment.chunks,
          "" + r,
          e.responseState,
          n.lastPushedText,
        )));
  }
  function ma(e, t, r) {
    for (var n = r.length, o = 0; o < n; o++) {
      var i = t.treeContext;
      t.treeContext = vr(i, n, o);
      try {
        Fr(e, t, r[o]);
      } finally {
        t.treeContext = i;
      }
    }
  }
  function Fr(e, t, r) {
    var n = t.blockedSegment.formatContext,
      o = t.legacyContext,
      i = t.context;
    try {
      return ie(e, t, r);
    } catch (u) {
      if (
        (Ar(),
        typeof u == "object" && u !== null && typeof u.then == "function")
      ) {
        r = u;
        var a = t.blockedSegment,
          s = Dn(
            e,
            a.chunks.length,
            null,
            a.formatContext,
            a.lastPushedText,
            !0,
          );
        a.children.push(s),
          (a.lastPushedText = !1),
          (e = Br(
            e,
            t.node,
            t.blockedBoundary,
            s,
            t.abortSet,
            t.legacyContext,
            t.context,
            t.treeContext,
          ).ping),
          r.then(e, e),
          (t.blockedSegment.formatContext = n),
          (t.legacyContext = o),
          (t.context = i),
          dn(i);
      } else
        throw (
          ((t.blockedSegment.formatContext = n),
          (t.legacyContext = o),
          (t.context = i),
          dn(i),
          u)
        );
    }
  }
  function ap(e) {
    var t = e.blockedBoundary;
    (e = e.blockedSegment), (e.status = 3), za(this, t, e);
  }
  function La(e, t, r) {
    var n = e.blockedBoundary;
    (e.blockedSegment.status = 3),
      n === null
        ? (t.allPendingTasks--,
          t.status !== 2 &&
            ((t.status = 2), t.destination !== null && t.destination.close()))
        : (n.pendingTasks--,
          n.forceClientRender ||
            ((n.forceClientRender = !0),
            (e = r === void 0 ? Error(w(432)) : r),
            (n.errorDigest = t.onError(e)),
            n.parentFlushed && t.clientRenderedBoundaries.push(n)),
          n.fallbackAbortableTasks.forEach(function (o) {
            return La(o, t, r);
          }),
          n.fallbackAbortableTasks.clear(),
          t.allPendingTasks--,
          t.allPendingTasks === 0 && ((n = t.onAllReady), n()));
  }
  function hn(e, t) {
    if (
      t.chunks.length === 0 &&
      t.children.length === 1 &&
      t.children[0].boundary === null
    ) {
      var r = t.children[0];
      (r.id = t.id), (r.parentFlushed = !0), r.status === 1 && hn(e, r);
    } else e.completedSegments.push(t);
  }
  function za(e, t, r) {
    if (t === null) {
      if (r.parentFlushed) {
        if (e.completedRootSegment !== null) throw Error(w(389));
        e.completedRootSegment = r;
      }
      e.pendingRootTasks--,
        e.pendingRootTasks === 0 &&
          ((e.onShellError = mt), (t = e.onShellReady), t());
    } else
      t.pendingTasks--,
        t.forceClientRender ||
          (t.pendingTasks === 0
            ? (r.parentFlushed && r.status === 1 && hn(t, r),
              t.parentFlushed && e.completedBoundaries.push(t),
              t.fallbackAbortableTasks.forEach(ap, e),
              t.fallbackAbortableTasks.clear())
            : r.parentFlushed &&
              r.status === 1 &&
              (hn(t, r),
              t.completedSegments.length === 1 &&
                t.parentFlushed &&
                e.partialBoundaries.push(t)));
    e.allPendingTasks--, e.allPendingTasks === 0 && ((e = e.onAllReady), e());
  }
  function Ua(e) {
    if (e.status !== 2) {
      var t = Le,
        r = hr.current;
      hr.current = pa;
      var n = pn;
      pn = e.responseState;
      try {
        var o = e.pingedTasks,
          i;
        for (i = 0; i < o.length; i++) {
          var a = o[i],
            s = e,
            u = a.blockedSegment;
          if (u.status === 0) {
            dn(a.context);
            try {
              ie(s, a, a.node),
                u.lastPushedText && u.textEmbedded && u.chunks.push(Er),
                a.abortSet.delete(a),
                (u.status = 1),
                za(s, a.blockedBoundary, u);
            } catch (g) {
              if (
                (Ar(),
                typeof g == "object" &&
                  g !== null &&
                  typeof g.then == "function")
              ) {
                var c = a.ping;
                g.then(c, c);
              } else {
                a.abortSet.delete(a), (u.status = 4);
                var l = a.blockedBoundary,
                  p = g,
                  f = xt(s, p);
                if (
                  (l === null
                    ? mn(s, p)
                    : (l.pendingTasks--,
                      l.forceClientRender ||
                        ((l.forceClientRender = !0),
                        (l.errorDigest = f),
                        l.parentFlushed && s.clientRenderedBoundaries.push(l))),
                  s.allPendingTasks--,
                  s.allPendingTasks === 0)
                ) {
                  var x = s.onAllReady;
                  x();
                }
              }
            } finally {
            }
          }
        }
        o.splice(0, i), e.destination !== null && Rr(e, e.destination);
      } catch (g) {
        xt(e, g), mn(e, g);
      } finally {
        (pn = n), (hr.current = r), r === pa && dn(t);
      }
    }
  }
  function an(e, t, r) {
    switch (((r.parentFlushed = !0), r.status)) {
      case 0:
        var n = (r.id = e.nextSegmentId++);
        return (
          (r.lastPushedText = !1),
          (r.textEmbedded = !1),
          (e = e.responseState),
          m(t, Kl),
          m(t, e.placeholderPrefix),
          (e = C(n.toString(16))),
          m(t, e),
          P(t, Ql)
        );
      case 1:
        r.status = 2;
        var o = !0;
        n = r.chunks;
        var i = 0;
        r = r.children;
        for (var a = 0; a < r.length; a++) {
          for (o = r[a]; i < o.index; i++) m(t, n[i]);
          o = vn(e, t, o);
        }
        for (; i < n.length - 1; i++) m(t, n[i]);
        return i < n.length && (o = P(t, n[i])), o;
      default:
        throw Error(w(390));
    }
  }
  function vn(e, t, r) {
    var n = r.boundary;
    if (n === null) return an(e, t, r);
    if (((n.parentFlushed = !0), n.forceClientRender))
      (n = n.errorDigest),
        P(t, rc),
        m(t, oc),
        n && (m(t, sc), m(t, C(U(n))), m(t, ac)),
        P(t, uc),
        an(e, t, r);
    else if (0 < n.pendingTasks) {
      (n.rootSegmentID = e.nextSegmentId++),
        0 < n.completedSegments.length && e.partialBoundaries.push(n);
      var o = e.responseState,
        i = o.nextSuspenseID++;
      (o = d(o.boundaryPrefix + i.toString(16))),
        (n = n.id = o),
        ra(t, e.responseState, n),
        an(e, t, r);
    } else if (n.byteSize > e.progressiveChunkSize)
      (n.rootSegmentID = e.nextSegmentId++),
        e.completedBoundaries.push(n),
        ra(t, e.responseState, n.id),
        an(e, t, r);
    else {
      if ((P(t, ec), (r = n.completedSegments), r.length !== 1))
        throw Error(w(391));
      vn(e, t, r[0]);
    }
    return P(t, ic);
  }
  function ha(e, t, r) {
    return (
      Rc(t, e.responseState, r.formatContext, r.id),
      vn(e, t, r),
      jc(t, r.formatContext)
    );
  }
  function ga(e, t, r) {
    for (var n = r.completedSegments, o = 0; o < n.length; o++)
      Ha(e, t, r, n[o]);
    if (
      ((n.length = 0),
      (e = e.responseState),
      (n = r.id),
      (r = r.rootSegmentID),
      m(t, e.startInlineScript),
      e.sentCompleteBoundaryFunction
        ? m(t, Mc)
        : ((e.sentCompleteBoundaryFunction = !0), m(t, Ic)),
      n === null)
    )
      throw Error(w(395));
    return (
      (r = C(r.toString(16))),
      m(t, n),
      m(t, Oc),
      m(t, e.segmentPrefix),
      m(t, r),
      P(t, Nc)
    );
  }
  function Ha(e, t, r, n) {
    if (n.status === 2) return !0;
    var o = n.id;
    if (o === -1) {
      if ((n.id = r.rootSegmentID) === -1) throw Error(w(392));
      return ha(e, t, n);
    }
    return (
      ha(e, t, n),
      (e = e.responseState),
      m(t, e.startInlineScript),
      e.sentCompleteSegmentFunction
        ? m(t, Tc)
        : ((e.sentCompleteSegmentFunction = !0), m(t, _c)),
      m(t, e.segmentPrefix),
      (o = C(o.toString(16))),
      m(t, o),
      m(t, $c),
      m(t, e.placeholderPrefix),
      m(t, o),
      P(t, Pc)
    );
  }
  function Rr(e, t) {
    (ne = new Uint8Array(512)), (re = 0);
    try {
      var r = e.completedRootSegment;
      if (r !== null && e.pendingRootTasks === 0) {
        vn(e, t, r), (e.completedRootSegment = null);
        var n = e.responseState.bootstrapChunks;
        for (r = 0; r < n.length - 1; r++) m(t, n[r]);
        r < n.length && P(t, n[r]);
      }
      var o = e.clientRenderedBoundaries,
        i;
      for (i = 0; i < o.length; i++) {
        var a = o[i];
        n = t;
        var s = e.responseState,
          u = a.id,
          c = a.errorDigest,
          l = a.errorMessage,
          p = a.errorComponentStack;
        if (
          (m(n, s.startInlineScript),
          s.sentClientRenderFunction
            ? m(n, zc)
            : ((s.sentClientRenderFunction = !0), m(n, Lc)),
          u === null)
        )
          throw Error(w(395));
        if (
          (m(n, u),
          m(n, Uc),
          (c || l || p) && (m(n, Dr), m(n, C(mr(c || "")))),
          (l || p) && (m(n, Dr), m(n, C(mr(l || "")))),
          p && (m(n, Dr), m(n, C(mr(p)))),
          !P(n, Hc))
        ) {
          (e.destination = null), i++, o.splice(0, i);
          return;
        }
      }
      o.splice(0, i);
      var f = e.completedBoundaries;
      for (i = 0; i < f.length; i++)
        if (!ga(e, t, f[i])) {
          (e.destination = null), i++, f.splice(0, i);
          return;
        }
      f.splice(0, i), Go(t), (ne = new Uint8Array(512)), (re = 0);
      var x = e.partialBoundaries;
      for (i = 0; i < x.length; i++) {
        var g = x[i];
        e: {
          (o = e), (a = t);
          var E = g.completedSegments;
          for (s = 0; s < E.length; s++)
            if (!Ha(o, a, g, E[s])) {
              s++, E.splice(0, s);
              var k = !1;
              break e;
            }
          E.splice(0, s), (k = !0);
        }
        if (!k) {
          (e.destination = null), i++, x.splice(0, i);
          return;
        }
      }
      x.splice(0, i);
      var $ = e.completedBoundaries;
      for (i = 0; i < $.length; i++)
        if (!ga(e, t, $[i])) {
          (e.destination = null), i++, $.splice(0, i);
          return;
        }
      $.splice(0, i);
    } finally {
      Go(t),
        e.allPendingTasks === 0 &&
          e.pingedTasks.length === 0 &&
          e.clientRenderedBoundaries.length === 0 &&
          e.completedBoundaries.length === 0 &&
          t.close();
    }
  }
  function xa(e, t) {
    try {
      var r = e.abortableTasks;
      r.forEach(function (n) {
        return La(n, e, t);
      }),
        r.clear(),
        e.destination !== null && Rr(e, e.destination);
    } catch (n) {
      xt(e, n), mn(e, n);
    }
  }
  jr.renderToReadableStream = function (e, t) {
    return new Promise(function (r, n) {
      var o,
        i,
        a = new Promise(function (l, p) {
          (i = l), (o = p);
        }),
        s = op(
          e,
          zl(
            t ? t.identifierPrefix : void 0,
            t ? t.nonce : void 0,
            t ? t.bootstrapScriptContent : void 0,
            t ? t.bootstrapScripts : void 0,
            t ? t.bootstrapModules : void 0,
          ),
          Ul(t ? t.namespaceURI : void 0),
          t ? t.progressiveChunkSize : void 0,
          t ? t.onError : void 0,
          i,
          function () {
            var l = new ReadableStream(
              {
                type: "bytes",
                pull: function (p) {
                  if (s.status === 1) (s.status = 2), Fa(p, s.fatalError);
                  else if (s.status !== 2 && s.destination === null) {
                    s.destination = p;
                    try {
                      Rr(s, p);
                    } catch (f) {
                      xt(s, f), mn(s, f);
                    }
                  }
                },
                cancel: function () {
                  xa(s);
                },
              },
              { highWaterMark: 0 },
            );
            (l.allReady = a), r(l);
          },
          function (l) {
            a.catch(function () {}), n(l);
          },
          o,
        );
      if (t && t.signal) {
        var u = t.signal,
          c = function () {
            xa(s, u.reason), u.removeEventListener("abort", c);
          };
        u.addEventListener("abort", c);
      }
      Ua(s);
    });
  };
  jr.version = "18.2.0";
});
var Ue = K((ze) => {
  "use strict";
  var Qe, qa;
  (Qe = Wo()), (qa = Va());
  ze.version = Qe.version;
  ze.renderToString = Qe.renderToString;
  ze.renderToStaticMarkup = Qe.renderToStaticMarkup;
  ze.renderToNodeStream = Qe.renderToNodeStream;
  ze.renderToStaticNodeStream = Qe.renderToStaticNodeStream;
  ze.renderToReadableStream = qa.renderToReadableStream;
});
var He = K((ID, Wa) => {
  "use strict";
  var sp = Ln();
  Wa.exports = new sp(zn());
});
var up,
  lp,
  cp,
  pp,
  Ga,
  Ve = Z(() => {
    ({ replace: up } = ""),
      (lp = /[&<>'"]/g),
      (cp = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }),
      (pp = (e) => cp[e]),
      (Ga = (e) => up.call(e, lp, pp));
  });
var Ja = {};
Xe(Ja, { default: () => dp });
var ND,
  UD,
  VD,
  qD,
  WD,
  dp,
  Xa = Z(() => {
    "use strict";
    qe();
    ND = A(je(), 1);
    _e();
    Te();
    UD = A($e(), 1);
    Pe();
    (VD = A(De(), 1)), (qD = A(Ue(), 1)), (WD = A(He(), 1));
    Ve();
    dp = {
      ..._r,
      async transform(e, t, r) {
        return await (
          await new Function("return import('astro/assets/services/squoosh')")()
        ).default.transform(e, t, r);
      },
    };
  });
var tu = {};
Xe(tu, {
  $: () => eu,
  A: () => St,
  a: () => Fs,
  b: () => An,
  c: () => Cs,
  d: () => Ns,
  e: () => di,
  f: () => Lp,
  g: () => xi,
  h: () => _r,
  i: () => Ef,
  m: () => pi,
  o: () => Re,
  r: () => Di,
  renderers: () => fe,
  u: () => bt,
});
function fp(e) {
  return e.replace(
    /\r\n|\r(?!\n)|\n/g,
    `
`,
  );
}
function Dp(e) {
  let t = Object.entries(D).find((r) => r[1].title === e);
  if (t) return { name: t[0], data: t[1] };
}
function mp(e, t) {
  if (!t || t.line === void 0 || t.column === void 0) return "";
  let r = fp(e)
      .split(
        `
`,
      )
      .map((a) => a.replace(/\t/g, "  ")),
    n = [];
  for (let a = -2; a <= 2; a++) r[t.line + a] && n.push(t.line + a);
  let o = 0;
  for (let a of n) {
    let s = `> ${a}`;
    s.length > o && (o = s.length);
  }
  let i = "";
  for (let a of n) {
    let s = a === t.line - 1;
    (i += s ? "> " : "  "),
      (i += `${a + 1} | ${r[a]}
`),
      s &&
        (i += `${Array.from({ length: o }).join(" ")}  | ${Array.from({
          length: t.column,
        }).join(" ")}^
`);
  }
  return i;
}
function hp(e) {
  return !(e.length !== 3 || !e[0] || typeof e[0] != "object");
}
function ys(e, t, r) {
  var n;
  let o =
      ((n = t?.split("/").pop()) == null ? void 0 : n.replace(".astro", "")) ??
      "",
    i = (...a) => {
      if (!hp(a))
        throw new y({
          ...D.InvalidComponentArgs,
          message: D.InvalidComponentArgs.message(o),
        });
      return e(...a);
    };
  return (
    Object.defineProperty(i, "name", { value: o, writable: !1 }),
    (i.isAstroComponentFactory = !0),
    (i.moduleId = t),
    (i.propagation = r),
    i
  );
}
function gp(e) {
  return ys(e.factory, e.moduleId, e.propagation);
}
function Fs(e, t, r) {
  return typeof e == "function" ? ys(e, t, r) : gp(e);
}
function xp() {
  return (t) => {
    if (typeof t == "string")
      throw new y({
        ...D.AstroGlobUsedOutside,
        message: D.AstroGlobUsedOutside.message(JSON.stringify(t)),
      });
    let r = [...Object.values(t)];
    if (r.length === 0)
      throw new y({
        ...D.AstroGlobNoMatch,
        message: D.AstroGlobNoMatch.message(JSON.stringify(t)),
      });
    return Promise.all(r.map((n) => n()));
  };
}
function Cs(e) {
  return {
    site: e ? new URL(e) : void 0,
    generator: `Astro v${ws}`,
    glob: xp(),
  };
}
function vp(e, t) {
  if (e[t]) return e[t];
  if (t === "delete" && e.del) return e.del;
  if (e.all) return e.all;
}
async function Ya(e, t, r) {
  var n;
  let { request: o, params: i } = t,
    a = (n = o.method) == null ? void 0 : n.toLowerCase(),
    s = vp(e, a);
  if (
    (!r &&
      r === !1 &&
      a &&
      a !== "get" &&
      console.warn(`
${a} requests are not available when building a static site. Update your config to \`output: 'server'\` or \`output: 'hybrid'\` with an \`export const prerender = false\` to handle ${a} requests.`),
    !s || typeof s != "function")
  )
    return new Response(null, {
      status: 404,
      headers: { "X-Astro-Response": "Not-Found" },
    });
  s.length > 1 &&
    console.warn(`
API routes with 2 arguments have been deprecated. Instead they take a single argument in the form of:

export function get({ params, request }) {
	//...
}

Update your code to remove this warning.`);
  let u = new Proxy(t, {
    get(c, l) {
      return l in c
        ? Reflect.get(c, l)
        : l in i
        ? (console.warn(`
API routes no longer pass params as the first argument. Instead an object containing a params property is provided in the form of:

export function get({ params }) {
	// ...
}

Update your code to remove this warning.`),
          Reflect.get(i, l))
        : void 0;
    },
  });
  return s.call(e, u, o);
}
function Es(e) {
  let t = {};
  return r(e), Object.keys(t).join(" ");
  function r(n) {
    n && typeof n.forEach == "function"
      ? n.forEach(r)
      : n === Object(n)
      ? Object.keys(n).forEach((o) => {
          n[o] && r(o);
        })
      : ((n = n === !1 || n == null ? "" : String(n).trim()),
        n &&
          n.split(/\s+/).forEach((o) => {
            t[o] = !0;
          }));
  }
}
function ui(e) {
  return !!e && typeof e == "object" && typeof e.then == "function";
}
async function* Hr(e) {
  let t = e.getReader();
  try {
    for (;;) {
      let { done: r, value: n } = await t.read();
      if (r) return;
      yield n;
    }
  } finally {
    t.releaseLock();
  }
}
function yp(e) {
  return Object.prototype.toString.call(e) === "[object HTMLString]";
}
function Fp(e) {
  return new yn(e);
}
function bs(e) {
  return typeof e.getReader == "function";
}
async function* Za(e) {
  if (bs(e)) for await (let t of Hr(e)) yield bt(t);
  else for await (let t of e) yield bt(t);
}
function* wp(e) {
  for (let t of e) yield bt(t);
}
function bt(e) {
  if (e && typeof e == "object") {
    if (e instanceof Uint8Array) return Fp(e);
    if (e instanceof Response && e.body) {
      let t = e.body;
      return Za(t);
    } else {
      if (typeof e.then == "function")
        return Promise.resolve(e).then((t) => bt(t));
      if (Symbol.iterator in e) return wp(e);
      if (Symbol.asyncIterator in e || bs(e)) return Za(e);
    }
  }
  return B(e);
}
function Tr(e, t = {}, r = new WeakSet()) {
  if (r.has(e))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e);
  let n = e.map((o) => ks(o, t, r));
  return r.delete(e), n;
}
function Ss(e, t = {}, r = new WeakSet()) {
  if (r.has(e))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  r.add(e);
  let n = Object.fromEntries(
    Object.entries(e).map(([o, i]) => [o, ks(i, t, r)]),
  );
  return r.delete(e), n;
}
function ks(e, t = {}, r = new WeakSet()) {
  switch (Object.prototype.toString.call(e)) {
    case "[object Date]":
      return [oe.Date, e.toISOString()];
    case "[object RegExp]":
      return [oe.RegExp, e.source];
    case "[object Map]":
      return [oe.Map, JSON.stringify(Tr(Array.from(e), t, r))];
    case "[object Set]":
      return [oe.Set, JSON.stringify(Tr(Array.from(e), t, r))];
    case "[object BigInt]":
      return [oe.BigInt, e.toString()];
    case "[object URL]":
      return [oe.URL, e.toString()];
    case "[object Array]":
      return [oe.JSON, JSON.stringify(Tr(e, t, r))];
    case "[object Uint8Array]":
      return [oe.Uint8Array, JSON.stringify(Array.from(e))];
    case "[object Uint16Array]":
      return [oe.Uint16Array, JSON.stringify(Array.from(e))];
    case "[object Uint32Array]":
      return [oe.Uint32Array, JSON.stringify(Array.from(e))];
    default:
      return e !== null && typeof e == "object"
        ? [oe.Value, Ss(e, t, r)]
        : e === void 0
        ? [oe.Value]
        : [oe.Value, e];
  }
}
function As(e, t) {
  return JSON.stringify(Ss(e, t));
}
function Cp(e, t) {
  let r = { isPage: !1, hydration: null, props: {} };
  for (let [n, o] of Object.entries(e))
    if (
      (n.startsWith("server:") && n === "server:root" && (r.isPage = !0),
      n.startsWith("client:"))
    )
      switch (
        (r.hydration ||
          (r.hydration = {
            directive: "",
            value: "",
            componentUrl: "",
            componentExport: { value: "" },
          }),
        n)
      ) {
        case "client:component-path": {
          r.hydration.componentUrl = o;
          break;
        }
        case "client:component-export": {
          r.hydration.componentExport.value = o;
          break;
        }
        case "client:component-hydration":
          break;
        case "client:display-name":
          break;
        default: {
          if (
            ((r.hydration.directive = n.split(":")[1]),
            (r.hydration.value = o),
            !t.has(r.hydration.directive))
          ) {
            let i = Array.from(t.keys())
              .map((a) => `client:${a}`)
              .join(", ");
            throw new Error(
              `Error: invalid hydration directive "${n}". Supported hydration methods: ${i}`,
            );
          }
          if (
            r.hydration.directive === "media" &&
            typeof r.hydration.value != "string"
          )
            throw new y(D.MissingMediaQueryDirective);
          break;
        }
      }
    else
      n === "class:list"
        ? o && (r.props[n.slice(0, -5)] = Es(o))
        : (r.props[n] = o);
  for (let n of Object.getOwnPropertySymbols(e)) r.props[n] = e[n];
  return r;
}
async function Ep(e, t) {
  let { renderer: r, result: n, astroId: o, props: i, attrs: a } = e,
    { hydrate: s, componentUrl: u, componentExport: c } = t;
  if (!c.value)
    throw new Error(
      `Unable to resolve a valid export for "${t.displayName}"! Please open an issue at https://astro.build/issues!`,
    );
  let l = { children: "", props: { uid: o } };
  if (a) for (let [f, x] of Object.entries(a)) l.props[f] = yt(x);
  (l.props["component-url"] = await n.resolve(decodeURI(u))),
    r.clientEntrypoint &&
      ((l.props["component-export"] = c.value),
      (l.props["renderer-url"] = await n.resolve(
        decodeURI(r.clientEntrypoint),
      )),
      (l.props.props = yt(As(i, t)))),
    (l.props.ssr = ""),
    (l.props.client = s);
  let p = await n.resolve("astro:scripts/before-hydration.js");
  return (
    p.length && (l.props["before-hydration-url"] = p),
    (l.props.opts = yt(
      JSON.stringify({ name: t.displayName, value: t.hydrateArgs || "" }),
    )),
    l
  );
}
function bp(e) {
  let t = 0;
  if (e.length === 0) return t;
  for (let r = 0; r < e.length; r++) {
    let n = e.charCodeAt(r);
    (t = (t << 5) - t + n), (t = t & t);
  }
  return t;
}
function Sp(e) {
  let t,
    r = "",
    n = bp(e),
    o = n < 0 ? "Z" : "";
  for (n = Math.abs(n); n >= $r; )
    (t = n % $r), (n = Math.floor(n / $r)), (r = Vr[t] + r);
  return n > 0 && (r = Vr[n] + r), o + r;
}
function Bs(e) {
  return e == null ? !1 : e.isAstroComponentFactory === !0;
}
function kp(e, t) {
  let r = t.propagation || "none";
  return (
    t.moduleId &&
      e.componentMetadata.has(t.moduleId) &&
      r === "none" &&
      (r = e.componentMetadata.get(t.moduleId).propagation),
    r === "in-tree" || r === "self"
  );
}
function li(e) {
  return typeof e == "object" && !!e[Ap];
}
function jp(e) {
  return e._metadata.hasHydrationScript
    ? !1
    : (e._metadata.hasHydrationScript = !0);
}
function _p(e, t) {
  return e._metadata.hasDirectives.has(t)
    ? !1
    : (e._metadata.hasDirectives.add(t), !0);
}
function Ka(e, t) {
  let n = e.clientDirectives.get(t);
  if (!n) throw new Error(`Unknown directive: ${t}`);
  return n;
}
function Tp(e, t, r) {
  switch (t) {
    case "both":
      return `${Rp}<script>${Ka(e, r)};${Bp}<\/script>`;
    case "directive":
      return `<script>${Ka(e, r)}<\/script>`;
  }
  return "";
}
function Np(e) {
  var t;
  let r = "";
  for (let [n, o] of Object.entries(e))
    r += `const ${Op(n)} = ${
      (t = JSON.stringify(o)) == null
        ? void 0
        : t.replace(/<\/script>/g, "\\x3C/script>")
    };
`;
  return B(r);
}
function es(e) {
  return e.length === 1
    ? e[0]
    : `${e.slice(0, -1).join(", ")} or ${e[e.length - 1]}`;
}
function An(e, t, r = !0) {
  if (e == null) return "";
  if (e === !1) return Pp.test(t) || Ip.test(t) ? B(` ${t}="false"`) : "";
  if (Mp.has(t))
    return (
      console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`),
      ""
    );
  if (t === "class:list") {
    let n = et(Es(e), r);
    return n === "" ? "" : B(` ${t.slice(0, -5)}="${n}"`);
  }
  if (t === "style" && !(e instanceof We)) {
    if (Array.isArray(e) && e.length === 2)
      return B(` ${t}="${et(`${Qa(e[0])};${e[1]}`, r)}"`);
    if (typeof e == "object") return B(` ${t}="${et(Qa(e), r)}"`);
  }
  return t === "className"
    ? B(` class="${et(e, r)}"`)
    : e === !0 && (t.startsWith("data-") || $p.test(t))
    ? B(` ${t}`)
    : B(` ${t}="${et(e, r)}"`);
}
function qr(e, t = !0) {
  let r = "";
  for (let [n, o] of Object.entries(e)) r += An(o, n, t);
  return B(r);
}
function vt(e, { props: t, children: r = "" }, n = !0) {
  let { lang: o, "data-astro-id": i, "define:vars": a, ...s } = t;
  return (
    a &&
      (e === "style" && (delete s["is:global"], delete s["is:scoped"]),
      e === "script" &&
        (delete s.hoist,
        (r =
          Np(a) +
          `
` +
          r))),
    (r == null || r == "") && ci.test(e)
      ? `<${e}${qr(s, n)} />`
      : `<${e}${qr(s, n)}>${r}</${e}>`
  );
}
function ts(e) {
  e._metadata.hasRenderedHead = !0;
  let t = Array.from(e.styles)
    .filter(Ir)
    .map((i) =>
      i.props.rel === "stylesheet" ? vt("link", i) : vt("style", i),
    );
  e.styles.clear();
  let r = Array.from(e.scripts)
      .filter(Ir)
      .map((i) => vt("script", i, !1)),
    o =
      Array.from(e.links)
        .filter(Ir)
        .map((i) => vt("link", i, !1)).join(`
`) +
      t.join(`
`) +
      r.join(`
`);
  if (e._metadata.extraHead.length > 0)
    for (let i of e._metadata.extraHead) o += i;
  return B(o);
}
function* Lp() {
  yield { type: "head" };
}
function* pi() {
  yield { type: "maybe-head" };
}
function zp(e) {
  return !!e[Rs];
}
function di(e, t, r) {
  return !t && r
    ? di(e, r)
    : {
        async render(n) {
          await tt(n, typeof t == "function" ? t(e) : t);
        },
      };
}
async function ot(e, t, r) {
  let n = "",
    o = null,
    i = {
      write(s) {
        s instanceof Response ||
          (typeof s == "object" && "type" in s && typeof s.type == "string"
            ? (o === null && (o = []), o.push(s))
            : (n += Ge(e, s)));
      },
    };
  return await di(e, t, r).render(i), B(new Fn(n, o));
}
async function js(e, t = {}) {
  let r = null,
    n = {};
  return (
    t &&
      (await Promise.all(
        Object.entries(t).map(([o, i]) =>
          ot(e, i).then((a) => {
            a.instructions &&
              (r === null && (r = []), r.push(...a.instructions)),
              (n[o] = a);
          }),
        ),
      )),
    { slotInstructions: r, children: n }
  );
}
function fi(e, t) {
  if (typeof t.type == "string") {
    let r = t;
    switch (r.type) {
      case "directive": {
        let { hydration: n } = r,
          o = n && jp(e),
          i = n && _p(e, n.directive),
          a = o ? "both" : i ? "directive" : null;
        if (a) {
          let s = Tp(e, a, n.directive);
          return B(s);
        } else return "";
      }
      case "head":
        return e._metadata.hasRenderedHead ? "" : ts(e);
      case "maybe-head":
        return e._metadata.hasRenderedHead || e._metadata.headInTree
          ? ""
          : ts(e);
      default: {
        if (t instanceof Response) return "";
        throw new Error(`Unknown chunk type: ${t.type}`);
      }
    }
  } else {
    if (zp(t)) {
      let r = "",
        n = t;
      if (n.instructions) for (let o of n.instructions) r += fi(e, o);
      return (r += t.toString()), r;
    }
    return t.toString();
  }
}
function Ge(e, t) {
  return ArrayBuffer.isView(t) ? Hp.decode(t) : fi(e, t);
}
function Vp(e, t) {
  if (ArrayBuffer.isView(t)) return t;
  {
    let r = fi(e, t);
    return wn.encode(r.toString());
  }
}
function qp(e) {
  return (
    !!e &&
    typeof e == "object" &&
    "render" in e &&
    typeof e.render == "function"
  );
}
async function tt(e, t) {
  if (((t = await t), t instanceof Fn)) e.write(t);
  else if (yp(t)) e.write(t);
  else if (Array.isArray(t)) for (let r of t) await tt(e, r);
  else if (typeof t == "function") await tt(e, t());
  else if (typeof t == "string") e.write(B(yt(t)));
  else if (!(!t && t !== 0))
    if (qp(t)) await t.render(e);
    else if (Is(t)) await t.render(e);
    else if (Jp(t)) await t.render(e);
    else if (ArrayBuffer.isView(t)) e.write(t);
    else if (
      typeof t == "object" &&
      (Symbol.asyncIterator in t || Symbol.iterator in t)
    )
      for await (let r of t) await tt(e, r);
    else e.write(t);
}
function Wp(e, t) {
  if (e != null)
    for (let r of Object.keys(e))
      r.startsWith("client:") &&
        console.warn(
          `You are attempting to render <${t} ${r} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`,
        );
}
function Gp(e, t, r, n, o = {}) {
  Wp(n, t);
  let i = new Gr(e, n, o, r);
  return (
    kp(e, r) &&
      !e._metadata.propagators.has(r) &&
      e._metadata.propagators.set(r, i),
    i
  );
}
function Jp(e) {
  return typeof e == "object" && !!e[Ts];
}
function Is(e) {
  return typeof e == "object" && !!e[Ps];
}
function Di(e, ...t) {
  return new Jr(e, t);
}
async function Ms(e, t, r, n, o = !1, i) {
  let a = await Os(e, t, r, n, i);
  if (a instanceof Response) return a;
  let s = "",
    u = !1,
    c = {
      write(l) {
        if (o && !u && ((u = !0), !/<!doctype html/i.test(String(l)))) {
          let p = e.compressHTML
            ? "<!DOCTYPE html>"
            : `<!DOCTYPE html>
`;
          s += p;
        }
        l instanceof Response || (s += Ge(e, l));
      },
    };
  return await a.render(c), s;
}
async function Xp(e, t, r, n, o = !1, i) {
  let a = await Os(e, t, r, n, i);
  if (a instanceof Response) return a;
  let s = !1;
  return (
    o && (await Yp(e)),
    new ReadableStream({
      start(u) {
        let c = {
          write(l) {
            if (o && !s && ((s = !0), !/<!doctype html/i.test(String(l)))) {
              let f = e.compressHTML
                ? "<!DOCTYPE html>"
                : `<!DOCTYPE html>
`;
              u.enqueue(wn.encode(f));
            }
            if (l instanceof Response) throw new y({ ...D.ResponseSentError });
            let p = Vp(e, l);
            u.enqueue(p);
          },
        };
        (async () => {
          try {
            await a.render(c), u.close();
          } catch (l) {
            y.is(l) && !l.loc && l.setLocation({ file: i?.component }),
              setTimeout(() => u.error(l), 0);
          }
        })();
      },
    })
  );
}
async function Os(e, t, r, n, o) {
  let i = await t(e, r, n);
  if (i instanceof Response) return i;
  if (!Is(i))
    throw new y({
      ...D.OnlyResponseCanBeReturned,
      message: D.OnlyResponseCanBeReturned.message(o?.route, typeof i),
      location: { file: o?.component },
    });
  return li(i) ? i.content : i;
}
async function Yp(e) {
  let t = e._metadata.propagators.values();
  for (;;) {
    let { value: r, done: n } = t.next();
    if (n) break;
    let o = await r.init(e);
    li(o) && e._metadata.extraHead.push(o.head);
  }
}
function Zp(e) {
  return typeof HTMLElement < "u" && HTMLElement.isPrototypeOf(e);
}
async function Kp(e, t, r, n) {
  let o = Qp(t),
    i = "";
  for (let a in r) i += ` ${a}="${et(await r[a])}"`;
  return B(`<${o}${i}>${await ot(e, n?.default)}</${o}>`);
}
function Qp(e) {
  let t = customElements.getName(e);
  return (
    t ||
    e.name
      .replace(/^HTML|Element$/g, "")
      .replace(/[A-Z]/g, "-$&")
      .toLowerCase()
      .replace(/^-/, "html-")
  );
}
function td(e) {
  switch (e?.split(".").pop()) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue (jsx)",
      ];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid-js",
        "@astrojs/vue",
        "@astrojs/svelte",
        "@astrojs/lit",
      ];
  }
}
function nd(e) {
  return e === Up;
}
function rd(e) {
  return e && e["astro:html"] === !0;
}
function ad(e, t) {
  let r = t ? od : id;
  return e.replace(r, "");
}
async function sd(e, t, r, n, o = {}) {
  var i, a, s;
  if (!r && !n["client:only"])
    throw new Error(`Unable to render ${t} because it is ${r}!
Did you forget to import the component or is it possible there is a typo?`);
  let { renderers: u, clientDirectives: c } = e,
    l = { astroStaticSlot: !0, displayName: t },
    { hydration: p, isPage: f, props: x } = Cp(n, c),
    g = "",
    E;
  p &&
    ((l.hydrate = p.directive),
    (l.hydrateArgs = p.value),
    (l.componentExport = p.componentExport),
    (l.componentUrl = p.componentUrl));
  let k = td(l.componentUrl),
    $ = u.filter((F) => F.name !== "astro:jsx"),
    { children: M, slotInstructions: V } = await js(e, o),
    b;
  if (l.hydrate !== "only") {
    let F = !1;
    try {
      F = r && r[Wr];
    } catch {}
    if (F) {
      let R = r[Wr];
      b = u.find(({ name: N }) => N === R);
    }
    if (!b) {
      let R;
      for (let N of u)
        try {
          if (await N.ssr.check.call({ result: e }, r, x, M)) {
            b = N;
            break;
          }
        } catch (_n) {
          R ?? (R = _n);
        }
      if (!b && R) throw R;
    }
    if (!b && typeof HTMLElement == "function" && Zp(r)) {
      let R = await Kp(e, r, n, o);
      return {
        render(N) {
          N.write(R);
        },
      };
    }
  } else {
    if (l.hydrateArgs) {
      let F = l.hydrateArgs,
        R = ns.has(F) ? ns.get(F) : F;
      b = u.find(({ name: N }) => N === `@astrojs/${R}` || N === R);
    }
    if ((!b && $.length === 1 && (b = $[0]), !b)) {
      let F = (i = l.componentUrl) == null ? void 0 : i.split(".").pop();
      b = u.filter(({ name: R }) => R === `@astrojs/${F}` || R === F)[0];
    }
  }
  if (b)
    l.hydrate === "only"
      ? (g = await ot(e, o?.fallback))
      : ({ html: g, attrs: E } = await b.ssr.renderToStaticMarkup.call(
          { result: e },
          r,
          x,
          M,
          l,
        ));
  else {
    if (l.hydrate === "only")
      throw new y({
        ...D.NoClientOnlyHint,
        message: D.NoClientOnlyHint.message(l.displayName),
        hint: D.NoClientOnlyHint.hint(
          k.map((F) => F.replace("@astrojs/", "")).join("|"),
        ),
      });
    if (typeof r != "string") {
      let F = $.filter((N) => k.includes(N.name)),
        R = $.length > 1;
      if (F.length === 0)
        throw new y({
          ...D.NoMatchingRenderer,
          message: D.NoMatchingRenderer.message(
            l.displayName,
            (a = l?.componentUrl) == null ? void 0 : a.split(".").pop(),
            R,
            $.length,
          ),
          hint: D.NoMatchingRenderer.hint(es(k.map((N) => "`" + N + "`"))),
        });
      if (F.length === 1)
        (b = F[0]),
          ({ html: g, attrs: E } = await b.ssr.renderToStaticMarkup.call(
            { result: e },
            r,
            x,
            M,
            l,
          ));
      else
        throw new Error(`Unable to render ${l.displayName}!

This component likely uses ${es(k)},
but Astro encountered an error during server-side rendering.

Please ensure that ${l.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
    }
  }
  if (b && !b.clientEntrypoint && b.name !== "@astrojs/lit" && l.hydrate)
    throw new y({
      ...D.NoClientEntrypoint,
      message: D.NoClientEntrypoint.message(t, l.hydrate, b.name),
    });
  if (!g && typeof r == "string") {
    let F = ud(r),
      R = Object.values(M).join(""),
      N = Di`<${F}${qr(x)}${B(R === "" && ci.test(F) ? "/>" : `>${R}</${F}>`)}`;
    g = "";
    let _n = {
      write(yi) {
        yi instanceof Response || (g += Ge(e, yi));
      },
    };
    await N.render(_n);
  }
  if (!p)
    return {
      render(F) {
        var R;
        if (V) for (let N of V) F.write(N);
        f || b?.name === "astro:jsx"
          ? F.write(g)
          : g &&
            g.length > 0 &&
            F.write(
              B(
                ad(
                  g,
                  ((R = b?.ssr) == null ? void 0 : R.supportsAstroStaticSlot) ??
                    !1,
                ),
              ),
            );
      },
    };
  let at = Sp(`<!--${l.componentExport.value}:${l.componentUrl}-->
${g}
${As(x, l)}`),
    se = await Ep(
      { renderer: b, result: e, astroId: at, props: x, attrs: E },
      l,
    ),
    le = [];
  if (g) {
    if (Object.keys(M).length > 0)
      for (let F of Object.keys(M)) {
        let R =
            (s = b?.ssr) != null && s.supportsAstroStaticSlot
              ? l.hydrate
                ? "astro-slot"
                : "astro-static-slot"
              : "astro-slot",
          N = F === "default" ? `<${R}>` : `<${R} name="${F}">`;
        g.includes(N) || le.push(F);
      }
  } else le = Object.keys(M);
  let Pt =
    le.length > 0
      ? le
          .map(
            (F) =>
              `<template data-astro-template${
                F !== "default" ? `="${F}"` : ""
              }>${M[F]}</template>`,
          )
          .join("")
      : "";
  return (
    (se.children = `${g ?? ""}${Pt}`),
    se.children && (se.props["await-children"] = ""),
    {
      render(F) {
        if (V) for (let R of V) F.write(R);
        F.write({ type: "directive", hydration: p }),
          F.write(B(vt("astro-island", se, !1)));
      },
    }
  );
}
function ud(e) {
  let t = /[&<>'"\s]+/g;
  return t.test(e) ? e.trim().split(t)[0].trim() : e;
}
async function ld(e, t = {}) {
  let r = await ot(e, t?.default);
  return {
    render(n) {
      r != null && n.write(r);
    },
  };
}
async function cd(e, t, r, n = {}) {
  let { slotInstructions: o, children: i } = await js(e, n),
    a = t({ slots: i }),
    s = o ? o.map((u) => Ge(e, u)).join("") : "";
  return {
    render(u) {
      u.write(B(s + a));
    },
  };
}
async function pd(e, t, r, n, o = {}) {
  let i = Gp(e, t, r, n, o),
    a = [],
    s = { write: (u) => a.push(u) };
  return (
    await i.render(s),
    {
      render(u) {
        for (let c of a) u.write(c);
      },
    }
  );
}
async function Ns(e, t, r, n, o = {}) {
  return (
    ui(r) && (r = await r),
    nd(r)
      ? await ld(e, o)
      : rd(r)
      ? await cd(e, r, n, o)
      : Bs(r)
      ? await pd(e, t, r, n, o)
      : await sd(e, t, r, n, o)
  );
}
async function Xr(e, t, r, n, o = {}, i = !1, a) {
  let s = "",
    u = !1,
    c = "";
  if (dd(r)) for (let l of pi()) c += Ge(e, l);
  try {
    let l = {
      write(f) {
        if (i && !u && ((u = !0), !/<!doctype html/i.test(String(f)))) {
          let x = e.compressHTML
            ? "<!DOCTYPE html>"
            : `<!DOCTYPE html>
`;
          s += x + c;
        }
        f instanceof Response || (s += Ge(e, f));
      },
    };
    await (await Ns(e, t, r, n, o)).render(l);
  } catch (l) {
    throw (y.is(l) && !l.loc && l.setLocation({ file: a?.component }), l);
  }
  return s;
}
function dd(e) {
  return !!e?.[ed];
}
async function Be(e, t) {
  switch (!0) {
    case t instanceof We:
      return t.toString().trim() === "" ? "" : t;
    case typeof t == "string":
      return B(yt(t));
    case typeof t == "function":
      return t;
    case !t && t !== 0:
      return "";
    case Array.isArray(t):
      return B((await Promise.all(t.map((n) => Be(e, n)))).join(""));
  }
  let r;
  return (
    t.props
      ? t.props[Ae.symbol]
        ? (r = t.props[Ae.symbol])
        : (r = new Ae(t))
      : (r = new Ae(t)),
    Zr(e, t, r)
  );
}
async function Zr(e, t, r) {
  if (wt(t)) {
    switch (!0) {
      case !t.type:
        throw new Error(`Unable to render ${e.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      case t.type === Symbol.for("astro:fragment"):
        return Be(e, t.props.children);
      case t.type.isAstroComponentFactory: {
        let n = {},
          o = {};
        for (let [s, u] of Object.entries(t.props ?? {}))
          s === "children" || (u && typeof u == "object" && u.$$slot)
            ? (o[s === "children" ? "default" : s] = () => Be(e, u))
            : (n[s] = u);
        let i = await Ms(e, t.type, n, o);
        if (i instanceof Response) throw i;
        return B(i);
      }
      case !t.type && t.type !== 0:
        return "";
      case typeof t.type == "string" && t.type !== rs:
        return B(await fd(e, t.type, t.props ?? {}));
    }
    if (t.type) {
      let n = function (l) {
        if (Array.isArray(l)) return l.map((p) => n(p));
        if (!wt(l)) {
          a.default.push(l);
          return;
        }
        if ("slot" in l.props) {
          (a[l.props.slot] = [...(a[l.props.slot] ?? []), l]),
            delete l.props.slot;
          return;
        }
        a.default.push(l);
      };
      if (
        (typeof t.type == "function" &&
          t.type["astro:renderer"] &&
          r.increment(),
        typeof t.type == "function" && t.props["server:root"])
      ) {
        let l = await t.type(t.props ?? {});
        return await Be(e, l);
      }
      if (typeof t.type == "function")
        if (r.haveNoTried() || r.isCompleted()) {
          md();
          try {
            let l = await t.type(t.props ?? {}),
              p;
            if (l?.[Bn]) return (p = await Zr(e, l, r)), p;
            if (!l) return (p = await Zr(e, l, r)), p;
          } catch (l) {
            if (r.isCompleted()) throw l;
            r.increment();
          } finally {
            hd();
          }
        } else r.increment();
      let { children: o = null, ...i } = t.props ?? {},
        a = { default: [] };
      n(o);
      for (let [l, p] of Object.entries(i))
        p.$$slot && ((a[l] = p), delete i[l]);
      let s = [],
        u = {};
      for (let [l, p] of Object.entries(a))
        s.push(
          Be(e, p).then((f) => {
            f.toString().trim().length !== 0 && (u[l] = () => f);
          }),
        );
      await Promise.all(s), (i[Ae.symbol] = r);
      let c;
      return (
        t.type === rs && t.props["client:only"]
          ? (c = await Xr(e, t.props["client:display-name"] ?? "", null, i, u))
          : (c = await Xr(
              e,
              typeof t.type == "function" ? t.type.name : t.type,
              t.type,
              i,
              u,
            )),
        B(c)
      );
    }
  }
  return B(`${t}`);
}
async function fd(e, t, { children: r, ...n }) {
  return B(
    `<${t}${Ls(n)}${B(
      (r == null || r == "") && ci.test(t)
        ? "/>"
        : `>${r == null ? "" : await Be(e, Dd(t, r))}</${t}>`,
    )}`,
  );
}
function Dd(e, t) {
  return typeof t == "string" && (e === "style" || e === "script") ? B(t) : t;
}
function md() {
  if ((mi++, !Yr)) {
    Yr = console.error;
    try {
      console.error = gd;
    } catch {}
  }
}
function hd() {
  mi--;
}
function gd(e, ...t) {
  (mi > 0 &&
    typeof e == "string" &&
    e.includes("Warning: Invalid hook call.") &&
    e.includes("https://reactjs.org/link/invalid-hook-call")) ||
    Yr(e, ...t);
}
function xd() {
  var e, t, r;
  return (
    (Ft =
      ((r = class extends Response {
        constructor(o, i) {
          let a = o instanceof ReadableStream;
          super(a ? null : o, i);
          O(this, e, void 0);
          O(this, t, void 0);
          L(this, e, a), L(this, t, o);
        }
        get body() {
          return h(this, t);
        }
        async text() {
          if (h(this, e) && Kr) {
            let o = new TextDecoder(),
              i = h(this, t),
              a = "";
            for await (let s of Hr(i)) a += o.decode(s);
            return a;
          }
          return super.text();
        }
        async arrayBuffer() {
          if (h(this, e) && Kr) {
            let o = h(this, t),
              i = [],
              a = 0;
            for await (let c of Hr(o)) i.push(c), (a += c.length);
            let s = new Uint8Array(a),
              u = 0;
            for (let c of i) s.set(c, u), (u += c.length);
            return s;
          }
          return super.arrayBuffer();
        }
        clone() {
          return new Ft(h(this, t), {
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
          });
        }
      }),
      (e = new WeakMap()),
      (t = new WeakMap()),
      r)),
    Ft
  );
}
async function yd(e, t, r, n, o, i) {
  var a, s;
  if (!Bs(t)) {
    e._metadata.headInTree =
      ((a = e.componentMetadata.get(t.moduleId)) == null
        ? void 0
        : a.containsHead) ?? !1;
    let f = { ...(r ?? {}), "server:root": !0 },
      x = await Xr(e, t.name, t, f, null, !0, i),
      g = wn.encode(x);
    return new Response(g, {
      headers: new Headers([
        ["Content-Type", "text/html; charset=utf-8"],
        ["Content-Length", g.byteLength.toString()],
      ]),
    });
  }
  e._metadata.headInTree =
    ((s = e.componentMetadata.get(t.moduleId)) == null
      ? void 0
      : s.containsHead) ?? !1;
  let u;
  if (
    (o ? (u = await Xp(e, t, r, n, !0, i)) : (u = await Ms(e, t, r, n, !0, i)),
    u instanceof Response)
  )
    return u;
  let c = e.response,
    l = new Headers(c.headers);
  return (
    !o &&
      typeof u == "string" &&
      ((u = wn.encode(u)), l.set("Content-Length", u.byteLength.toString())),
    vd(u, { ...c, headers: l })
  );
}
function Ls(e = {}, t, { class: r } = {}) {
  let n = "";
  r &&
    (typeof e.class < "u"
      ? (e.class += ` ${r}`)
      : typeof e["class:list"] < "u"
      ? (e["class:list"] = [e["class:list"], r])
      : (e.class = r));
  for (let [o, i] of Object.entries(e)) n += An(i, o, !0);
  return B(n);
}
function wt(e) {
  return e && typeof e == "object" && e[Bn];
}
function Fd(e) {
  if (typeof e.type == "string") return e;
  let t = {};
  if (wt(e.props.children)) {
    let r = e.props.children;
    if (!wt(r) || !("slot" in r.props)) return;
    let n = os(r.props.slot);
    (t[n] = [r]),
      (t[n].$$slot = !0),
      delete r.props.slot,
      delete e.props.children;
  }
  Array.isArray(e.props.children) &&
    (e.props.children = e.props.children
      .map((r) => {
        if (!wt(r) || !("slot" in r.props)) return r;
        let n = os(r.props.slot);
        return (
          Array.isArray(t[n])
            ? t[n].push(r)
            : ((t[n] = [r]), (t[n].$$slot = !0)),
          delete r.props.slot,
          is
        );
      })
      .filter((r) => r !== is)),
    Object.assign(e.props, t);
}
function zs(e) {
  return typeof e == "string"
    ? B(e)
    : Array.isArray(e)
    ? e.map((t) => zs(t))
    : e;
}
function wd(e) {
  if ("set:html" in e.props || "set:text" in e.props) {
    if ("set:html" in e.props) {
      let t = zs(e.props["set:html"]);
      delete e.props["set:html"], Object.assign(e.props, { children: t });
      return;
    }
    if ("set:text" in e.props) {
      let t = e.props["set:text"];
      delete e.props["set:text"], Object.assign(e.props, { children: t });
      return;
    }
  }
}
function Cd(e, t) {
  let r = { [Wr]: "astro:jsx", [Bn]: !0, type: e, props: t ?? {} };
  return wd(r), Fd(r), r;
}
async function Ed(e, t, { default: r = null, ...n } = {}) {
  if (typeof e != "function") return !1;
  let o = {};
  for (let [i, a] of Object.entries(n)) {
    let s = Us(i);
    o[s] = a;
  }
  try {
    return (await e({ ...t, ...o, children: r }))[Bn];
  } catch (i) {
    let a = i;
    if (e[Symbol.for("mdx-component")])
      throw Sd({
        message: a.message,
        title: a.name,
        hint: "This issue often occurs when your MDX component encounters runtime errors.",
        name: a.name,
        stack: a.stack,
      });
  }
  return !1;
}
async function bd(e, t = {}, { default: r = null, ...n } = {}) {
  let o = {};
  for (let [s, u] of Object.entries(n)) {
    let c = Us(s);
    o[c] = u;
  }
  let { result: i } = this;
  return { html: await Be(i, Cd(e, { ...t, ...o, children: r })) };
}
function Sd({ message: e, name: t, stack: r, hint: n }) {
  let o = new Error(e);
  return (o.name = t), (o.stack = r), (o.hint = n), o;
}
function Bd(e) {
  if (Mr.has(e)) return Mr.get(e);
  let t = {
    currentIndex: 0,
    get id() {
      return Ad + this.currentIndex.toString();
    },
  };
  return Mr.set(e, t), t;
}
function Rd(e) {
  let t = Bd(e),
    r = t.id;
  return t.currentIndex++, r;
}
function Td(e) {
  return (
    e.message &&
    (e.message.startsWith("Cannot read property '__H'") ||
      e.message.includes("(reading '__H')"))
  );
}
async function $d(e, t, r) {
  if (typeof e == "object") {
    let a = e.$$typeof;
    return a && a.toString().slice(7).startsWith("react");
  }
  if (typeof e != "function") return !1;
  if (e.prototype != null && typeof e.prototype.render == "function")
    return (
      ye.default.Component.isPrototypeOf(e) ||
      ye.default.PureComponent.isPrototypeOf(e)
    );
  let n = null,
    o = !1;
  function i(...a) {
    try {
      let s = e(...a);
      s && s.$$typeof === _d && (o = !0);
    } catch (s) {
      Td(s) || (n = s);
    }
    return ye.default.createElement("div");
  }
  if ((await Vs(i, t, r, {}), n)) throw n;
  return o;
}
async function Hs() {
  let e = "stream",
    { Writable: t } = await import(e);
  return t;
}
function as(e) {
  return e.astroStaticSlot ? !!e.hydrate : !0;
}
async function Vs(e, t, { default: r, ...n }, o) {
  let i;
  this && this.result && (i = Rd(this.result));
  let a = { prefix: i };
  delete t.class;
  let s = {};
  for (let [x, g] of Object.entries(n)) {
    let E = jd(x);
    s[E] = ye.default.createElement(Qr, { hydrate: as(o), value: g, name: E });
  }
  let u = { ...t, ...s },
    c = r ?? t.children;
  c != null &&
    (u.children = ye.default.createElement(Qr, { hydrate: as(o), value: c }));
  let l = ye.default.createElement(e, u),
    p = { identifierPrefix: i },
    f;
  return (
    o && o.hydrate
      ? "renderToReadableStream" in it.default
        ? (f = await ss(l, p))
        : (f = await Pd(l, p))
      : "renderToReadableStream" in it.default
      ? (f = await ss(l, p))
      : (f = await Id(l, p)),
    { html: f, attrs: a }
  );
}
async function Pd(e, t) {
  let r = await Hs(),
    n = "";
  return new Promise((o, i) => {
    let a,
      s = it.default.renderToPipeableStream(e, {
        ...t,
        onError(u) {
          (a = u), i(a);
        },
        onAllReady() {
          s.pipe(
            new r({
              write(u, c, l) {
                (n += u.toString("utf-8")), l();
              },
              destroy() {
                o(n);
              },
            }),
          );
        },
      });
  });
}
async function Id(e, t) {
  let r = await Hs(),
    n = "";
  return new Promise((o, i) => {
    let a = it.default.renderToStaticNodeStream(e, t);
    a.on("error", (s) => {
      i(s);
    }),
      a.pipe(
        new r({
          write(s, u, c) {
            (n += s.toString("utf-8")), c();
          },
          destroy() {
            o(n);
          },
        }),
      );
  });
}
async function Md(e) {
  let t = e.getReader(),
    r = "",
    n = new TextDecoder("utf-8");
  for (;;) {
    let { done: o, value: i } = await t.read();
    if (o) return i ? (r += n.decode(i)) : n.decode(new Uint8Array()), r;
    r += n.decode(i, { stream: !0 });
  }
}
async function ss(e, t) {
  return await Md(await it.default.renderToReadableStream(e, t));
}
function hi(e, t) {
  Reflect.set(e, Ws, t);
}
function zd(e) {
  let t = Reflect.get(e, Ws);
  if (t != null) return t;
}
function* Ud(e) {
  let t = zd(e);
  if (!t) return [];
  for (let r of t.headers()) yield r;
  return [];
}
function Gs(e, t, r, n) {
  let o = e.level,
    i = e.dest,
    a = { type: r, level: t, message: n };
  En[o] > En[t] || i.write(a);
}
function Je(e, t, r) {
  return Gs(e, "warn", t, r);
}
function Vd(e, t, r) {
  return Gs(e, "error", t, r);
}
function qd(...e) {
  "_astroGlobalDebug" in globalThis && globalThis._astroGlobalDebug(...e);
}
function Xd(e) {
  return e?.type === "redirect";
}
function Yd(e, t) {
  let r = e.redirectRoute,
    n = e.redirect;
  return typeof r < "u"
    ? r?.generate(t) || r?.pathname || "/"
    : typeof n == "string"
    ? n
    : typeof n > "u"
    ? "/"
    : n.destination;
}
function Zd(e, t = "GET") {
  let r = e.redirectRoute;
  return typeof r?.redirect == "object"
    ? r.redirect.status
    : t !== "GET"
    ? 308
    : 301;
}
async function Js(e, t, r, n) {
  let o = !1,
    i,
    s = t(r, async () => ((o = !0), (i = n()), i));
  return await Promise.resolve(s).then(async (u) => {
    if (
      (Kd(u) &&
        Je(
          e,
          "middleware",
          `Using simple endpoints can cause unexpected issues in the chain of middleware functions.
It's strongly suggested to use full ${st("Response")} objects.`,
        ),
      o)
    )
      if (typeof u < "u") {
        if (!(u instanceof Response)) throw new y(D.MiddlewareNotAResponse);
        return u;
      } else {
        if (i) return i;
        throw new y(D.MiddlewareNotAResponse);
      }
    else {
      if (typeof u > "u") throw new y(D.MiddlewareNoDataOrNextCalled);
      if (u instanceof Response) return u;
      throw new y(D.MiddlewareNotAResponse);
    }
  });
}
function Kd(e) {
  return (
    !(e instanceof Response) &&
    typeof e == "object" &&
    typeof e.body == "string"
  );
}
function Xs({ request: e, params: t, site: r, props: n, adapterName: o }) {
  let i = {
    cookies: new Cn(e),
    request: e,
    params: t,
    site: r ? new URL(r) : void 0,
    generator: `Astro v${ws}`,
    props: n,
    redirect(a, s) {
      return new Response(null, { status: s || 302, headers: { Location: a } });
    },
    url: new URL(e.url),
    get clientAddress() {
      if (!(cs in e))
        throw o
          ? new y({
              ...D.ClientAddressNotAvailable,
              message: D.ClientAddressNotAvailable.message(o),
            })
          : new y(D.StaticClientAddressNotAvailable);
      return Reflect.get(e, cs);
    },
  };
  return (
    Object.defineProperty(i, "locals", {
      enumerable: !0,
      get() {
        return Reflect.get(e, ps);
      },
      set(a) {
        if (typeof a != "object") throw new y(D.LocalsNotAnObject);
        Reflect.set(e, ps, a);
      },
    }),
    i
  );
}
async function Qd(e, t, r, n) {
  var o;
  let i = Xs({
      request: r.request,
      params: r.params,
      props: r.props,
      site: t.site,
      adapterName: t.adapterName,
    }),
    a;
  return (
    n
      ? (a = await Js(t.logging, n, i, async () => await Ya(e, i, t.ssr)))
      : (a = await Ya(e, i, t.ssr)),
    a instanceof Response
      ? (hi(a, i.cookies), { type: "response", response: a })
      : (t.ssr &&
          !((o = r.route) != null && o.prerender) &&
          (a.hasOwnProperty("headers") &&
            Je(
              t.logging,
              "ssr",
              "Setting headers is not supported when returning an object. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.",
            ),
          a.encoding &&
            Je(
              t.logging,
              "ssr",
              "`encoding` is ignored in SSR. To return a charset other than UTF-8, please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.",
            )),
        {
          type: "simple",
          body: a.body,
          encoding: a.encoding,
          cookies: i.cookies,
        })
  );
}
function tf(e) {
  var t;
  if (e && ((t = e.expressions) == null ? void 0 : t.length) === 1)
    return e.expressions[0];
}
function nf(e) {
  let { markdown: t, params: r, request: n, resolve: o, locals: i } = e,
    a = new URL(n.url),
    s = new Headers();
  s.set("Content-Type", "text/html");
  let u = { status: e.status, statusText: "OK", headers: s };
  Object.defineProperty(u, "headers", {
    value: u.headers,
    enumerable: !0,
    writable: !1,
  });
  let c = e.cookies,
    l = {
      styles: e.styles ?? new Set(),
      scripts: e.scripts ?? new Set(),
      links: e.links ?? new Set(),
      componentMetadata: e.componentMetadata ?? new Map(),
      renderers: e.renderers,
      clientDirectives: e.clientDirectives,
      compressHTML: e.compressHTML,
      pathname: e.pathname,
      cookies: c,
      createAstro(p, f, x) {
        let g = new ni(l, x, e.logging),
          E = {
            __proto__: p,
            get clientAddress() {
              if (!(ds in n))
                throw e.adapterName
                  ? new y({
                      ...D.ClientAddressNotAvailable,
                      message: D.ClientAddressNotAvailable.message(
                        e.adapterName,
                      ),
                    })
                  : new y(D.StaticClientAddressNotAvailable);
              return Reflect.get(n, ds);
            },
            get cookies() {
              return c || ((c = new Cn(n)), (l.cookies = c), c);
            },
            params: r,
            props: f,
            locals: i,
            request: n,
            url: a,
            redirect(k, $) {
              if (n[ef]) throw new y({ ...D.ResponseSentError });
              return new Response(null, {
                status: $ || 302,
                headers: { Location: k },
              });
            },
            response: u,
            slots: g,
          };
        return (
          Object.defineProperty(E, "__renderMarkdown", {
            enumerable: !1,
            writable: !1,
            value: async function (k, $) {
              if (typeof Deno < "u")
                throw new Error("Markdown is not supported in Deno SSR");
              if (!Nr) {
                let V = "@astrojs/";
                (V += "markdown-remark"),
                  (Nr = (await import(V)).renderMarkdown);
              }
              let { code: M } = await Nr(k, { ...t, ...($ ?? {}) });
              return M;
            },
          }),
          E
        );
      },
      resolve: o,
      response: u,
      _metadata: {
        hasHydrationScript: !1,
        hasRenderedHead: !1,
        hasDirectives: new Set(),
        headInTree: !1,
        extraHead: [],
        propagators: new Map(),
      },
    };
  return l;
}
async function fs({ mod: e, renderContext: t, env: r, cookies: n }) {
  if (Xd(t.route))
    return new Response(null, {
      status: Zd(t.route, t.request.method),
      headers: { location: Yd(t.route, t.params) },
    });
  let o = e.default;
  if (!o)
    throw new Error(
      `Expected an exported Astro component but received typeof ${typeof o}`,
    );
  let i = nf({
    adapterName: r.adapterName,
    links: t.links,
    styles: t.styles,
    logging: r.logging,
    markdown: r.markdown,
    params: t.params,
    pathname: t.pathname,
    componentMetadata: t.componentMetadata,
    resolve: r.resolve,
    renderers: r.renderers,
    clientDirectives: r.clientDirectives,
    compressHTML: r.compressHTML,
    request: t.request,
    site: r.site,
    scripts: t.scripts,
    ssr: r.ssr,
    status: t.status ?? 200,
    cookies: n,
    locals: t.locals ?? {},
  });
  typeof e.components == "object" &&
    Object.assign(t.props, { components: e.components });
  let a = await yd(i, o, t.props, null, r.streaming, t.route);
  return i.cookies && hi(a, i.cookies), a;
}
async function Ds(e, t, r, n, o) {
  let i = Xs({
    request: t.request,
    params: t.params,
    props: t.props,
    site: r.site,
    adapterName: r.adapterName,
  });
  switch (e) {
    case "page":
    case "redirect":
      return o
        ? await Js(r.logging, o, i, () =>
            fs({ mod: n, renderContext: t, env: r, cookies: i.cookies }),
          )
        : await fs({ mod: n, renderContext: t, env: r, cookies: i.cookies });
    case "endpoint":
      return await Qd(n, r, t, o);
    default:
      throw new Error(`Couldn't find route of type [${e}]`);
  }
}
function rf(e, t) {
  return e instanceof Response && (t === "page" || t === "redirect");
}
function af([e, t], r) {
  if (!of.includes(typeof t))
    throw new y({
      ...D.GetStaticPathsInvalidRouteParam,
      message: D.GetStaticPathsInvalidRouteParam.message(e, t, typeof t),
      location: { file: r },
    });
}
function sf(e, { ssr: t, route: r }) {
  if ((!t || r.prerender) && !e.getStaticPaths)
    throw new y({
      ...D.GetStaticPathsRequired,
      location: { file: r.component },
    });
}
function uf(e, t, r) {
  if (!Array.isArray(e))
    throw new y({
      ...D.InvalidGetStaticPathsReturn,
      message: D.InvalidGetStaticPathsReturn.message(typeof e),
      location: { file: r.component },
    });
  e.forEach((n) => {
    if (
      n.params === void 0 ||
      n.params === null ||
      (n.params && Object.keys(n.params).length === 0)
    )
      throw new y({
        ...D.GetStaticPathsExpectedParams,
        location: { file: r.component },
      });
    if (typeof n.params != "object")
      throw new y({
        ...D.InvalidGetStaticPathParam,
        message: D.InvalidGetStaticPathParam.message(typeof n.params),
        location: { file: r.component },
      });
    for (let [o, i] of Object.entries(n.params))
      typeof i > "u" ||
        typeof i == "string" ||
        typeof i == "number" ||
        Je(
          t,
          "getStaticPaths",
          `invalid path param: ${o}. A string, number or undefined value was expected, but got \`${JSON.stringify(
            i,
          )}\`.`,
        ),
        typeof i == "string" &&
          i === "" &&
          Je(
            t,
            "getStaticPaths",
            `invalid path param: ${o}. \`undefined\` expected for an optional param, but got empty string.`,
          );
  });
}
function lf(e) {
  return (r) => {
    let n = {};
    return (
      e.forEach((o, i) => {
        o.startsWith("...")
          ? (n[o.slice(3)] = r[i + 1] ? decodeURIComponent(r[i + 1]) : void 0)
          : (n[o] = decodeURIComponent(r[i + 1]));
      }),
      n
    );
  };
}
function Ys(e, t) {
  let r = Object.entries(e).reduce((n, o) => {
    af(o, t.component);
    let [i, a] = o;
    return (n[i] = a?.toString()), n;
  }, {});
  return JSON.stringify(t.generate(r));
}
function cf(e) {
  return function (r, n = {}) {
    let { pageSize: o, params: i, props: a } = n,
      s = o || 10,
      u = "page",
      c = i || {},
      l = a || {},
      p;
    if (e.params.includes(`...${u}`)) p = !1;
    else if (e.params.includes(`${u}`)) p = !0;
    else
      throw new y({
        ...D.PageNumberParamNotFound,
        message: D.PageNumberParamNotFound.message(u),
      });
    let f = Math.max(1, Math.ceil(r.length / s));
    return [...Array(f).keys()].map((g) => {
      let E = g + 1,
        k = s === 1 / 0 ? 0 : (E - 1) * s,
        $ = Math.min(k + s, r.length),
        M = { ...c, [u]: p || E > 1 ? String(E) : void 0 },
        V = Lr(e.generate({ ...M })),
        b = E === f ? void 0 : Lr(e.generate({ ...M, page: String(E + 1) })),
        at =
          E === 1
            ? void 0
            : Lr(
                e.generate({
                  ...M,
                  page: !p && E - 1 === 1 ? void 0 : String(E - 1),
                }),
              );
      return {
        params: M,
        props: {
          ...l,
          page: {
            data: r.slice(k, $),
            start: k,
            end: $ - 1,
            size: s,
            total: r.length,
            currentPage: E,
            lastPage: f,
            url: { current: V, next: b, prev: at },
          },
        },
      };
    });
  };
}
function Lr(e) {
  return e === "" ? "/" : e;
}
async function pf({
  mod: e,
  route: t,
  routeCache: r,
  isValidate: n,
  logging: o,
  ssr: i,
}) {
  let a = r.get(t);
  if (a?.staticPaths) return a.staticPaths;
  if ((sf(e, { ssr: i, route: t }), i && !t.prerender)) {
    let c = Object.assign([], { keyed: new Map() });
    return r.set(t, { ...a, staticPaths: c }), c;
  }
  if (!e.getStaticPaths) throw new Error("Unexpected Error.");
  let s = [];
  (s = await e.getStaticPaths({
    paginate: cf(t),
    rss() {
      throw new y(D.GetStaticPathsRemovedRSSHelper);
    },
  })),
    Array.isArray(s) && (s = s.flat()),
    n && uf(s, o, t);
  let u = s;
  u.keyed = new Map();
  for (let c of u) {
    let l = Ys(c.params, t);
    u.keyed.set(l, c);
  }
  return r.set(t, { ...a, staticPaths: u }), u;
}
function df(e, t, r) {
  let n = Ys(t, r),
    o = e.keyed.get(n);
  if (o) return o;
  qd("findPathItemByKey", `Unexpected cache miss looking for ${n}`);
}
async function ff(e) {
  let { logging: t, mod: r, route: n, routeCache: o, pathname: i, ssr: a } = e;
  if (!n || n.pathname) return [{}, {}];
  let s = Df(n, i) ?? {};
  mf(n, r, s);
  let u = await pf({
      mod: r,
      route: n,
      routeCache: o,
      isValidate: !0,
      logging: t,
      ssr: a,
    }),
    c = df(u, s, n);
  if (!c && (!a || n.prerender))
    throw new y({
      ...D.NoMatchingStaticPathFound,
      message: D.NoMatchingStaticPathFound.message(i),
      hint: D.NoMatchingStaticPathFound.hint([n.component]),
    });
  let l = c?.props ? { ...c.props } : {};
  return [s, l];
}
function Df(e, t) {
  if (e.params.length) {
    let r = e.pattern.exec(decodeURIComponent(t));
    if (r) return lf(e.params)(r);
  }
}
function mf(e, t, r) {
  if (e.type === "endpoint" && t.getStaticPaths) {
    let n = e.segments[e.segments.length - 1],
      o = Object.values(r),
      i = o[o.length - 1];
    if (n.length === 1 && n[0].dynamic && i === void 0)
      throw new y({
        ...D.PrerenderDynamicEndpointPathCollide,
        message: D.PrerenderDynamicEndpointPathCollide.message(e.route),
        hint: D.PrerenderDynamicEndpointPathCollide.hint(e.component),
        location: { file: e.component },
      });
  }
}
async function hs(e) {
  let t = e.request,
    r = e.pathname ?? new URL(t.url).pathname,
    [n, o] = await ff({
      mod: e.mod,
      route: e.route,
      routeCache: e.env.routeCache,
      pathname: r,
      logging: e.env.logging,
      ssr: e.env.ssr,
    }),
    i = { ...e, pathname: r, params: n, props: o };
  return (
    Object.defineProperty(i, "locals", {
      enumerable: !0,
      get() {
        return Reflect.get(t, ms);
      },
      set(a) {
        if (typeof a != "object") throw new y(D.LocalsNotAnObject);
        Reflect.set(t, ms, a);
      },
    }),
    i
  );
}
function gi(e, t, r) {
  return r ? Ot(r, Mn(e)) : t ? Mt(Ot(t, Mn(e))) : e;
}
function hf(e, t, r) {
  return e.type === "inline"
    ? { props: { type: "text/css" }, children: e.content }
    : { props: { rel: "stylesheet", href: gi(e.src, t, r) }, children: "" };
}
function gf(e, t, r) {
  return new Set(e.map((n) => hf(n, t, r)));
}
function xf(e, t, r) {
  return e.type === "external"
    ? vf(e.value, t, r)
    : { props: { type: "module" }, children: e.value };
}
function vf(e, t, r) {
  return { props: { type: "module", src: gi(e, t, r) }, children: "" };
}
function zr(e, t) {
  return t.routes.find((r) => r.pattern.test(decodeURI(e)));
}
function yf(e, t) {
  let r = e
      .map(
        (i) =>
          "/" +
          i
            .map((a) =>
              a.spread
                ? `:${a.content.slice(3)}(.*)?`
                : a.dynamic
                ? `:${a.content}`
                : a.content
                    .normalize()
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23")
                    .replace(/%5B/g, "[")
                    .replace(/%5D/g, "]")
                    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            )
            .join(""),
      )
      .join(""),
    n = "";
  return t === "always" && e.length && (n = "/"), Ri(r + n);
}
function ii(e) {
  return {
    route: e.route,
    type: e.type,
    pattern: new RegExp(e.pattern),
    params: e.params,
    component: e.component,
    generate: yf(e.segments, e._meta.trailingSlash),
    pathname: e.pathname || void 0,
    segments: e.segments,
    prerender: e.prerender,
    redirect: e.redirect,
    redirectRoute: e.redirectRoute ? ii(e.redirectRoute) : void 0,
  };
}
function xi(e) {
  let t = [];
  for (let i of e.routes) {
    t.push({ ...i, routeData: ii(i.routeData) });
    let a = i;
    a.routeData = ii(i.routeData);
  }
  let r = new Set(e.assets),
    n = new Map(e.componentMetadata),
    o = new Map(e.clientDirectives);
  return {
    ...e,
    assets: r,
    componentMetadata: n,
    clientDirectives: o,
    routes: t,
  };
}
function Ks(e) {
  return e ? "transform" in e : !1;
}
function Ur(e) {
  return typeof e == "object";
}
async function Qs() {
  var e;
  if (!((e = globalThis?.astroAsset) != null && e.imageService)) {
    let { default: t } = await Promise.resolve()
      .then(() => (Xa(), Ja))
      .catch((r) => {
        let n = new y(D.InvalidImageService);
        throw ((n.cause = r), n);
      });
    return (
      globalThis.astroAsset || (globalThis.astroAsset = {}),
      (globalThis.astroAsset.imageService = t),
      t
    );
  }
  return globalThis.astroAsset.imageService;
}
async function bf(e, t) {
  if (!e || typeof e != "object")
    throw new y({
      ...D.ExpectedImageOptions,
      message: D.ExpectedImageOptions.message(JSON.stringify(e)),
    });
  let r = await Qs(),
    n = r.validateOptions ? await r.validateOptions(e, t) : e,
    o = await r.getURL(n, t);
  return (
    Ks(r) &&
      globalThis.astroAsset.addStaticImage &&
      (o = globalThis.astroAsset.addStaticImage(n)),
    {
      rawOptions: e,
      options: n,
      src: o,
      attributes:
        r.getHTMLAttributes !== void 0 ? r.getHTMLAttributes(n, t) : {},
    }
  );
}
async function Rf(e) {
  try {
    let t = await fetch(e);
    return t.ok ? Buffer.from(await t.arrayBuffer()) : void 0;
  } catch {
    return;
  }
}
var Et,
  xs,
  ye,
  it,
  vs,
  D,
  y,
  ws,
  yt,
  yn,
  We,
  B,
  oe,
  Vr,
  $r,
  Ap,
  Bp,
  Rp,
  ci,
  $p,
  Pp,
  Ip,
  Mp,
  Op,
  et,
  Pr,
  Qa,
  Ir,
  Rs,
  Fn,
  Up,
  Wr,
  wn,
  Hp,
  _s,
  Ts,
  Gr,
  $s,
  Ps,
  Jr,
  ed,
  ns,
  id,
  od,
  rs,
  Ae,
  Yr,
  mi,
  Kr,
  Ft,
  vd,
  Bn,
  is,
  os,
  Us,
  kd,
  Qr,
  Mr,
  Ad,
  jd,
  _d,
  Od,
  fe,
  Re,
  Nd,
  us,
  Ld,
  Ct,
  nt,
  xe,
  ae,
  kt,
  ei,
  At,
  ti,
  bn,
  qs,
  Cn,
  Ws,
  Hd,
  En,
  ls,
  Or,
  Wd,
  Gd,
  Jd,
  cs,
  ps,
  ds,
  ef,
  Bt,
  ve,
  Rt,
  ni,
  Nr,
  of,
  ri,
  ms,
  Ff,
  wf,
  Se,
  I,
  ke,
  jt,
  Sn,
  rt,
  _t,
  kn,
  Zs,
  Tt,
  oi,
  $t,
  ai,
  St,
  Cf,
  Ef,
  gs,
  _r,
  Sf,
  kf,
  Af,
  eu,
  si,
  Bf,
  jf,
  _f,
  qe = Z(() => {
    "use strict";
    Et = A(je(), 1);
    _e();
    Te();
    ji();
    xs = A($e(), 1);
    Pe();
    (ye = A(De(), 1)), (it = A(Ue(), 1)), (vs = A(He(), 1));
    Ve();
    D = {
      UnknownCompilerError: {
        title: "Unknown compiler error.",
        hint: "This is almost always a problem with the Astro compiler, not your code. Please open an issue at https://astro.build/issues/compiler.",
      },
      StaticRedirectNotAvailable: {
        title: "`Astro.redirect` is not available in static mode.",
        message:
          "Redirects are only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR.",
      },
      ClientAddressNotAvailable: {
        title: "`Astro.clientAddress` is not available in current adapter.",
        message: (e) =>
          `\`Astro.clientAddress\` is not available in the \`${e}\` adapter. File an issue with the adapter to add support.`,
      },
      StaticClientAddressNotAvailable: {
        title: "`Astro.clientAddress` is not available in static mode.",
        message:
          "`Astro.clientAddress` is only available when using `output: 'server'` or `output: 'hybrid'`. Update your Astro config if you need SSR features.",
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR.",
      },
      NoMatchingStaticPathFound: {
        title: "No static path found for requested path.",
        message: (e) =>
          `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e}\`.`,
        hint: (e) => `Possible dynamic routes being matched: ${e.join(", ")}.`,
      },
      OnlyResponseCanBeReturned: {
        title: "Invalid type returned by Astro page.",
        message: (e, t) =>
          `Route \`${
            e || ""
          }\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information.",
      },
      MissingMediaQueryDirective: {
        title: "Missing value for `client:media` directive.",
        message:
          'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided',
      },
      NoMatchingRenderer: {
        title: "No matching renderer found.",
        message: (e, t, r, n) => `Unable to render \`${e}\`.

${
  n > 0
    ? `There ${r ? "are" : "is"} ${n} renderer${
        r ? "s" : ""
      } configured in your \`astro.config.mjs\` file,
but ${r ? "none were" : "it was not"} able to server-side render \`${e}\`.`
    : `No valid renderer was found ${
        t ? `for the \`.${t}\` file extension.` : "for this file extension."
      }`
}`,
        hint: (e) => `Did you mean to enable the ${e} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`,
      },
      NoClientEntrypoint: {
        title: "No client entrypoint specified in renderer.",
        message: (e, t, r) =>
          `\`${e}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${r}\`.`,
        hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer.",
      },
      NoClientOnlyHint: {
        title: "Missing hint on client:only directive.",
        message: (e) =>
          `Unable to render \`${e}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
        hint: (e) =>
          `Did you mean to pass \`client:only="${e}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`,
      },
      InvalidGetStaticPathParam: {
        title: "Invalid value returned by a `getStaticPaths` path.",
        message: (e) =>
          `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${e}\``,
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.",
      },
      InvalidGetStaticPathsReturn: {
        title: "Invalid value returned by getStaticPaths.",
        message: (e) =>
          `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e}\``,
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.",
      },
      GetStaticPathsRemovedRSSHelper: {
        title: "getStaticPaths RSS helper is not available anymore.",
        message:
          "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
        hint: "See https://docs.astro.build/en/guides/rss/ for more information.",
      },
      GetStaticPathsExpectedParams: {
        title: "Missing params property on `getStaticPaths` route.",
        message:
          "Missing or empty required `params` property on `getStaticPaths` route.",
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.",
      },
      GetStaticPathsInvalidRouteParam: {
        title: "Invalid value for `getStaticPaths` route parameter.",
        message: (e, t, r) =>
          `Invalid getStaticPaths route parameter for \`${e}\`. Expected undefined, a string or a number, received \`${r}\` (\`${t}\`)`,
        hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.",
      },
      GetStaticPathsRequired: {
        title: "`getStaticPaths()` function required for dynamic routes.",
        message:
          "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
        hint: 'See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.',
      },
      ReservedSlotName: {
        title: "Invalid slot name.",
        message: (e) =>
          `Unable to create a slot named \`${e}\`. \`${e}\` is a reserved slot name. Please update the name of this slot.`,
      },
      NoAdapterInstalled: {
        title: "Cannot use Server-side Rendering without an adapter.",
        message:
          "Cannot use `output: 'server'` or `output: 'hybrid'` without an adapter. Please install and configure the appropriate server adapter for your final deployment.",
        hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information.",
      },
      NoMatchingImport: {
        title: "No import found for component.",
        message: (e) =>
          `Could not render \`${e}\`. No matching import has been found for \`${e}\`.`,
        hint: "Please make sure the component is properly imported.",
      },
      InvalidPrerenderExport: {
        title: "Invalid prerender export.",
        message: (e, t, r) => {
          let n = r ? "false" : "true",
            o =
              "A `prerender` export has been detected, but its value cannot be statically analyzed.";
          return (
            e !== "const" &&
              (o += `
Expected \`const\` declaration but got \`${e}\`.`),
            t !== "true" &&
              (o += `
Expected \`${n}\` value but got \`${t}\`.`),
            o
          );
        },
        hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`.",
      },
      InvalidComponentArgs: {
        title: "Invalid component arguments.",
        message: (e) =>
          `Invalid arguments passed to${e ? ` <${e}>` : ""} component.`,
        hint: "Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`.",
      },
      PageNumberParamNotFound: {
        title: "Page number param not found.",
        message: (e) =>
          `[paginate()] page number param \`${e}\` not found in your filepath.`,
        hint: "Rename your file to `[page].astro` or `[...page].astro`.",
      },
      ImageMissingAlt: {
        title: "Missing alt property.",
        message: "The alt property is required.",
        hint: "The `alt` property is important for the purpose of accessibility, without it users using screen readers or other assistive technologies won't be able to understand what your image is supposed to represent. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt for more information.",
      },
      InvalidImageService: {
        title: "Error while loading image service.",
        message:
          "There was an error loading the configured image service. Please see the stack trace for more information.",
      },
      MissingImageDimension: {
        title: "Missing image dimensions",
        message: (e, t) =>
          `Missing ${
            e === "both" ? "width and height attributes" : `${e} attribute`
          } for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`,
        hint: "If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets).",
      },
      UnsupportedImageFormat: {
        title: "Unsupported image format",
        message: (e, t, r) =>
          `Received unsupported format \`${e}\` from \`${t}\`. Currently only ${r.join(
            ", ",
          )} are supported by our image services.`,
        hint: "Using an `img` tag directly instead of the `Image` component might be what you're looking for.",
      },
      PrerenderDynamicEndpointPathCollide: {
        title: "Prerendered dynamic endpoint has path collision.",
        message: (e) =>
          `Could not render \`${e}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,
        hint: (e) =>
          `Rename \`${e}\` to \`${e.replace(
            /\.(js|ts)/,
            (t) => ".json" + t,
          )}\``,
      },
      ExpectedImage: {
        title: "Expected src to be an image.",
        message: (e) =>
          `Expected \`src\` property to be either an ESM imported image or a string with the path of a remote image. Received \`${e}\`.`,
        hint: "This error can often happen because of a wrong path. Make sure the path to your image is correct.",
      },
      ExpectedImageOptions: {
        title: "Expected image options.",
        message: (e) =>
          `Expected getImage() parameter to be an object. Received \`${e}\`.`,
      },
      MarkdownImageNotFound: {
        title: "Image not found.",
        message: (e, t) =>
          `Could not find requested image \`${e}\`${t ? ` at \`${t}\`.` : "."}`,
        hint: "This is often caused by a typo in the image path. Please make sure the file exists, and is spelled correctly.",
      },
      ResponseSentError: {
        title: "Unable to set response.",
        message:
          "The response has already been sent to the browser and cannot be altered.",
      },
      MiddlewareNoDataOrNextCalled: {
        title: "The middleware didn't return a response or call `next`.",
        message:
          "The middleware needs to either return a `Response` object or call the `next` function.",
      },
      MiddlewareNotAResponse: {
        title:
          "The middleware returned something that is not a `Response` object.",
        message:
          "Any data returned from middleware must be a valid `Response` object.",
      },
      LocalsNotAnObject: {
        title: "Value assigned to `locals` is not accepted.",
        message:
          "`locals` can only be assigned to an object. Other values like numbers, strings, etc. are not accepted.",
        hint: "If you tried to remove some information from the `locals` object, try to use `delete` or set the property to `undefined`.",
      },
      LocalImageUsedWrongly: {
        title: "ESM imported images must be passed as-is.",
        message: (e) =>
          `\`Image\`'s and \`getImage\`'s \`src\` parameter must be an imported image or an URL, it cannot be a filepath. Received \`${e}\`.`,
      },
      AstroGlobUsedOutside: {
        title: "Astro.glob() used outside of an Astro file.",
        message: (e) =>
          `\`Astro.glob(${e})\` can only be used in \`.astro\` files. \`import.meta.glob(${e})\` can be used instead to achieve a similar result.`,
        hint: "See Vite's documentation on `import.meta.glob` for more information: https://vitejs.dev/guide/features.html#glob-import",
      },
      AstroGlobNoMatch: {
        title: "Astro.glob() did not match any files.",
        message: (e) =>
          `\`Astro.glob(${e})\` did not return any matching files. Check the pattern for typos.`,
      },
      RedirectWithNoLocation: {
        title:
          "A redirect must be given a location with the `Location` header.",
      },
      InvalidDynamicRoute: {
        title: "Invalid dynamic route.",
        message: (e, t, r) =>
          `The ${t} param for route ${e} is invalid. Received **${r}**.`,
      },
      UnknownViteError: { title: "Unknown Vite Error." },
      FailedToLoadModuleSSR: {
        title: "Could not import file.",
        message: (e) => `Could not import \`${e}\`.`,
        hint: "This is often caused by a typo in the import path. Please make sure the file exists.",
      },
      InvalidGlob: {
        title: "Invalid glob pattern.",
        message: (e) =>
          `Invalid glob pattern: \`${e}\`. Glob patterns must start with './', '../' or '/'.`,
        hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns.",
      },
      FailedToFindPageMapSSR: {
        title: "Astro couldn't find the correct page to render",
        message:
          "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error. Please file an issue.",
      },
      UnknownCSSError: { title: "Unknown CSS Error." },
      CSSSyntaxError: { title: "CSS Syntax Error." },
      UnknownMarkdownError: { title: "Unknown Markdown Error." },
      MarkdownFrontmatterParseError: {
        title: "Failed to parse Markdown frontmatter.",
      },
      InvalidFrontmatterInjectionError: {
        title: "Invalid frontmatter injection.",
        message:
          'A remark or rehype plugin attempted to inject invalid frontmatter. Ensure "astro.frontmatter" is set to a valid JSON object that is not `null` or `undefined`.',
        hint: "See the frontmatter injection docs https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically for more information.",
      },
      MdxIntegrationMissingError: {
        title: "MDX integration missing.",
        message: (e) =>
          `Unable to render ${e}. Ensure that the \`@astrojs/mdx\` integration is installed.`,
        hint: "See the MDX integration docs for installation and usage instructions: https://docs.astro.build/en/guides/integrations-guide/mdx/",
      },
      UnknownConfigError: { title: "Unknown configuration error." },
      ConfigNotFound: {
        title: "Specified configuration file not found.",
        message: (e) =>
          `Unable to resolve \`--config "${e}"\`. Does the file exist?`,
      },
      ConfigLegacyKey: {
        title: "Legacy configuration detected.",
        message: (e) => `Legacy configuration detected: \`${e}\`.`,
        hint: `Please update your configuration to the new format.
See https://astro.build/config for more information.`,
      },
      UnknownCLIError: { title: "Unknown CLI Error." },
      GenerateContentTypesError: {
        title: "Failed to generate content types.",
        message: (e) =>
          `\`astro sync\` command failed to generate content collection types: ${e}`,
        hint: "Check your `src/content/config.*` file for typos.",
      },
      UnknownContentCollectionError: {
        title: "Unknown Content Collection Error.",
      },
      InvalidContentEntryFrontmatterError: {
        title: "Content entry frontmatter does not match schema.",
        message: (e, t, r) =>
          [
            `**${String(e)} \u2192 ${String(
              t,
            )}** frontmatter does not match collection schema.`,
            ...r.errors.map((n) => n.message),
          ].join(`
`),
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas.",
      },
      InvalidContentEntrySlugError: {
        title: "Invalid content entry slug.",
        message: (e, t) =>
          `${String(e)} \u2192 ${String(
            t,
          )} has an invalid slug. \`slug\` must be a string.`,
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field.",
      },
      ContentSchemaContainsSlugError: {
        title: "Content Schema should not contain `slug`.",
        message: (e) =>
          `A content collection schema should not contain \`slug\` since it is reserved for slug generation. Remove this from your ${e} collection schema.`,
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field.",
      },
      CollectionDoesNotExistError: {
        title: "Collection does not exist",
        message: (e) =>
          `The collection **${e}** does not exist. Ensure a collection directory with this name exists.`,
        hint: "See https://docs.astro.build/en/guides/content-collections/ for more on creating collections.",
      },
      MixedContentDataCollectionError: {
        title: "Content and data cannot be in same collection.",
        message: (e) =>
          `**${e}** contains a mix of content and data entries. All entries must be of the same type.`,
        hint: "Store data entries in a new collection separate from your content collection.",
      },
      ContentCollectionTypeMismatchError: {
        title: "Collection contains entries of a different type.",
        message: (e, t, r) =>
          `${e} contains ${t} entries, but is configured as a ${r} collection.`,
      },
      DataCollectionEntryParseError: {
        title: "Data collection entry failed to parse.",
        message: (e, t) => `**${e}** failed to parse: ${t}`,
        hint: "Ensure your data entry is an object with valid JSON (for `.json` entries) or YAML (for `.yaml` entries).",
      },
      DuplicateContentEntrySlugError: {
        title: "Duplicate content entry slug.",
        message: (e, t) =>
          `**${e}** contains multiple entries with the same slug: \`${t}\`. Slugs must be unique.`,
      },
      UnsupportedConfigTransformError: {
        title: "Unsupported transform in content config.",
        message: (
          e,
        ) => `\`transform()\` functions in your content config must return valid JSON, or data types compatible with the devalue library (including Dates, Maps, and Sets).
Full error: ${e}`,
        hint: "See the devalue library for all supported types: https://github.com/rich-harris/devalue",
      },
      UnknownError: { title: "Unknown Error." },
    };
    y = class extends Error {
      constructor(t, ...r) {
        var n;
        super(...r), (this.type = "AstroError");
        let {
          name: o,
          title: i,
          message: a,
          stack: s,
          location: u,
          hint: c,
          frame: l,
        } = t;
        if (((this.title = i), o && o !== "Error")) this.name = o;
        else if (this.title) {
          let p = (n = Dp(this.title)) == null ? void 0 : n.name;
          p && (this.name = p);
        }
        a && (this.message = a),
          (this.stack = s || this.stack),
          (this.loc = u),
          (this.hint = c),
          (this.frame = l);
      }
      setLocation(t) {
        this.loc = t;
      }
      setName(t) {
        this.name = t;
      }
      setMessage(t) {
        this.message = t;
      }
      setHint(t) {
        this.hint = t;
      }
      setFrame(t, r) {
        this.frame = mp(t, r);
      }
      static is(t) {
        return t.type === "AstroError";
      }
    };
    ws = "2.9.6";
    (yt = Ga), (yn = class extends Uint8Array {});
    Object.defineProperty(yn.prototype, Symbol.toStringTag, {
      get() {
        return "HTMLBytes";
      },
    });
    (We = class extends String {
      get [Symbol.toStringTag]() {
        return "HTMLString";
      }
    }),
      (B = (e) => (e instanceof We ? e : typeof e == "string" ? new We(e) : e));
    oe = {
      Value: 0,
      JSON: 1,
      RegExp: 2,
      Date: 3,
      Map: 4,
      Set: 5,
      BigInt: 6,
      URL: 7,
      Uint8Array: 8,
      Uint16Array: 9,
      Uint32Array: 10,
    };
    (Vr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY"),
      ($r = Vr.length);
    Ap = Symbol.for("astro.headAndContent");
    (Bp =
      '(()=>{var d;{let h={0:t=>t,1:t=>JSON.parse(t,a),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,a)),5:t=>new Set(JSON.parse(t,a)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},a=(t,e)=>{if(t===""||!Array.isArray(e))return e;let[r,n]=e;return r in h?h[r](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(d=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=async()=>{var o;if(!this.hydrator||!this.isConnected)return;let e=(o=this.parentElement)==null?void 0:o.closest("astro-island[ssr]");if(e){e.addEventListener("astro:hydrate",this.hydrate,{once:!0});return}let r=this.querySelectorAll("astro-slot"),n={},c=this.querySelectorAll("template[data-astro-template]");for(let s of c){let i=s.closest(this.tagName);i!=null&&i.isSameNode(this)&&(n[s.getAttribute("data-astro-template")||"default"]=s.innerHTML,s.remove())}for(let s of r){let i=s.closest(this.tagName);i!=null&&i.isSameNode(this)&&(n[s.getAttribute("name")||"default"]=s.innerHTML)}let l=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),a):{};await this.hydrator(this)(this.Component,l,n,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),this.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((e,r)=>{r.disconnect(),setTimeout(()=>this.childrenConnectedCallback(),0)}).observe(this,{childList:!0})}async childrenConnectedCallback(){let e=this.getAttribute("before-hydration-url");e&&await import(e),this.start()}start(){let e=JSON.parse(this.getAttribute("opts")),r=this.getAttribute("client");if(Astro[r]===void 0){window.addEventListener(`astro:${r}`,()=>this.start(),{once:!0});return}Astro[r](async()=>{let n=this.getAttribute("renderer-url"),[c,{default:l}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),o=this.getAttribute("component-export")||"default";if(!o.includes("."))this.Component=c[o];else{this.Component=c;for(let s of o.split("."))this.Component=this.Component[s]}return this.hydrator=l,this.hydrate},e,this)}attributeChangedCallback(){this.hydrate()}},d.observedAttributes=["props"],d))}})();'),
      (Rp =
        "<style>astro-island,astro-slot,astro-static-slot{display:contents}</style>");
    (ci =
      /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i),
      ($p =
        /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i),
      (Pp = /^(contenteditable|draggable|spellcheck|value)$/i),
      (Ip =
        /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i),
      (Mp = new Set(["set:html", "set:text"])),
      (Op = (e) =>
        e
          .trim()
          .replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (t, r) =>
            /[^\w]|\s/.test(t) ? "" : r === 0 ? t : t.toUpperCase(),
          )),
      (et = (e, t = !0) =>
        t ? String(e).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : e),
      (Pr = (e) =>
        e.toLowerCase() === e
          ? e
          : e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`)),
      (Qa = (e) =>
        Object.entries(e)
          .map(([t, r]) =>
            t[0] !== "-" && t[1] !== "-"
              ? `${Pr(t)}:${r}`
              : Pr(t) !== t
              ? `${Pr(t)}:var(${t});${t}:${r}`
              : `${t}:${r}`,
          )
          .join(";"));
    Ir = (e, t, r) => {
      let n = JSON.stringify(e.props),
        o = e.children;
      return (
        t ===
        r.findIndex((i) => JSON.stringify(i.props) === n && i.children == o)
      );
    };
    (Rs = Symbol.for("astro:slot-string")),
      (Fn = class extends We {
        constructor(t, r) {
          super(t), (this.instructions = r), (this[Rs] = !0);
        }
      });
    (Up = Symbol.for("astro:fragment")),
      (Wr = Symbol.for("astro:renderer")),
      (wn = new TextEncoder()),
      (Hp = new TextDecoder());
    (Ts = Symbol.for("astro.componentInstance")),
      (Gr = class {
        constructor(t, r, n, o) {
          (this[_s] = !0),
            (this.result = t),
            (this.props = r),
            (this.factory = o),
            (this.slotValues = {});
          for (let i in n) {
            let a = n[i](t);
            this.slotValues[i] = () => a;
          }
        }
        async init(t) {
          return this.returnValue !== void 0
            ? this.returnValue
            : ((this.returnValue = this.factory(
                t,
                this.props,
                this.slotValues,
              )),
              this.returnValue);
        }
        async render(t) {
          this.returnValue === void 0 && (await this.init(this.result));
          let r = this.returnValue;
          ui(r) && (r = await r),
            li(r) ? await r.content.render(t) : await tt(t, r);
        }
      });
    _s = Ts;
    (Ps = Symbol.for("astro.renderTemplateResult")),
      (Jr = class {
        constructor(t, r) {
          (this[$s] = !0),
            (this.htmlParts = t),
            (this.error = void 0),
            (this.expressions = r.map((n) =>
              ui(n)
                ? Promise.resolve(n).catch((o) => {
                    if (!this.error) throw ((this.error = o), o);
                  })
                : n,
            ));
        }
        async render(t) {
          for (let r = 0; r < this.htmlParts.length; r++) {
            let n = this.htmlParts[r],
              o = this.expressions[r];
            t.write(B(n)), (o || o === 0) && (await tt(t, o));
          }
        }
      });
    $s = Ps;
    (ed = Symbol.for("astro.needsHeadRendering")),
      (ns = new Map([["solid", "solid-js"]]));
    (id = /\<\/?astro-slot\b[^>]*>/g), (od = /\<\/?astro-static-slot\b[^>]*>/g);
    (rs = "astro-client-only"),
      (Ae = class {
        constructor(t) {
          (this.vnode = t), (this.count = 0);
        }
        increment() {
          this.count++;
        }
        haveNoTried() {
          return this.count === 0;
        }
        isCompleted() {
          return this.count > 2;
        }
      });
    Ae.symbol = Symbol("astro:jsx:skip");
    mi = 0;
    Kr =
      typeof process == "object" &&
      Object.prototype.toString.call(process) === "[object process]";
    vd = Kr
      ? (e, t) =>
          typeof e == "string" || ArrayBuffer.isView(e)
            ? new Response(e, t)
            : typeof Ft > "u"
            ? new (xd())(e, t)
            : new Ft(e, t)
      : (e, t) => new Response(e, t);
    (Bn = "astro:jsx"), (is = Symbol("empty")), (os = (e) => e);
    Us = (e) => e.trim().replace(/[-_]([a-z])/g, (t, r) => r.toUpperCase());
    (kd = { check: Ed, renderToStaticMarkup: bd }),
      (Qr = ({ value: e, name: t, hydrate: r = !0 }) =>
        e
          ? (0, ye.createElement)(r ? "astro-slot" : "astro-static-slot", {
              name: t,
              suppressHydrationWarning: !0,
              dangerouslySetInnerHTML: { __html: e },
            })
          : null);
    Qr.shouldComponentUpdate = () => !1;
    (Mr = new WeakMap()), (Ad = "r");
    (jd = (e) => e.trim().replace(/[-_]([a-z])/g, (t, r) => r.toUpperCase())),
      (_d = Symbol.for("react.element"));
    (Od = { check: $d, renderToStaticMarkup: Vs, supportsAstroStaticSlot: !0 }),
      (fe = [
        Object.assign(
          {
            name: "astro:jsx",
            serverEntrypoint: "astro/jsx/server.js",
            jsxImportSource: "astro",
          },
          { ssr: kd },
        ),
        Object.assign(
          {
            name: "@astrojs/react",
            clientEntrypoint: "@astrojs/react/client.js",
            serverEntrypoint: "@astrojs/react/server.js",
            jsxImportSource: "react",
          },
          { ssr: Od },
        ),
      ]),
      (Re = void 0),
      (Nd = new Date(0)),
      (us = "deleted"),
      (Ld = Symbol.for("astro.responseSent")),
      (Ct = class {
        constructor(t) {
          this.value = t;
        }
        json() {
          if (this.value === void 0)
            throw new Error("Cannot convert undefined to an object.");
          return JSON.parse(this.value);
        }
        number() {
          return Number(this.value);
        }
        boolean() {
          return this.value === "false" || this.value === "0"
            ? !1
            : !!this.value;
        }
      }),
      (Cn = class {
        constructor(t) {
          O(this, kt);
          O(this, At);
          O(this, bn);
          O(this, nt, void 0);
          O(this, xe, void 0);
          O(this, ae, void 0);
          L(this, nt, t), L(this, xe, null), L(this, ae, null);
        }
        delete(t, r) {
          let n = { expires: Nd };
          r?.domain && (n.domain = r.domain),
            r?.path && (n.path = r.path),
            ue(this, At, ti)
              .call(this)
              .set(t, [us, (0, Et.serialize)(t, us, n), !1]);
        }
        get(t) {
          var r;
          if ((r = h(this, ae)) != null && r.has(t)) {
            let [i, , a] = h(this, ae).get(t);
            return a ? new Ct(i) : new Ct(void 0);
          }
          let o = ue(this, kt, ei).call(this)[t];
          return new Ct(o);
        }
        has(t) {
          var r;
          if ((r = h(this, ae)) != null && r.has(t)) {
            let [, , o] = h(this, ae).get(t);
            return o;
          }
          return !!ue(this, kt, ei).call(this)[t];
        }
        set(t, r, n) {
          let o;
          if (typeof r == "string") o = r;
          else {
            let a = r.toString();
            a === Object.prototype.toString.call(r)
              ? (o = JSON.stringify(r))
              : (o = a);
          }
          let i = {};
          if (
            (n && Object.assign(i, n),
            ue(this, At, ti)
              .call(this)
              .set(t, [o, (0, Et.serialize)(t, o, i), !0]),
            h(this, nt)[Ld])
          )
            throw new y({ ...D.ResponseSentError });
        }
        *headers() {
          if (h(this, ae) != null) for (let [, t] of h(this, ae)) yield t[1];
        }
      });
    (nt = new WeakMap()),
      (xe = new WeakMap()),
      (ae = new WeakMap()),
      (kt = new WeakSet()),
      (ei = function () {
        return (
          h(this, xe) || ue(this, bn, qs).call(this),
          h(this, xe) || L(this, xe, {}),
          h(this, xe)
        );
      }),
      (At = new WeakSet()),
      (ti = function () {
        return h(this, ae) || L(this, ae, new Map()), h(this, ae);
      }),
      (bn = new WeakSet()),
      (qs = function () {
        let t = h(this, nt).headers.get("cookie");
        t && L(this, xe, (0, Et.parse)(t));
      });
    Ws = Symbol.for("astro.cookies");
    (Hd = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })),
      (En = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 });
    if (typeof process < "u") {
      let e = process;
      "argv" in e &&
        Array.isArray(e.argv) &&
        (e.argv.includes("--verbose") || e.argv.includes("--silent"));
    }
    (Or = 1),
      (Wd = {
        write(e) {
          let t = console.error;
          En[e.level] < En.error && (t = console.log);
          function r() {
            let i = "",
              a = e.type;
            return (
              a &&
                ((i += ki(Hd.format(new Date()) + " ")),
                e.level === "info"
                  ? (a = st(Bi(`[${a}]`)))
                  : e.level === "warn"
                  ? (a = st(Nn(`[${a}]`)))
                  : e.level === "error" && (a = st(Ai(`[${a}]`))),
                (i += `${a} `)),
              Si(i)
            );
          }
          let n = e.message;
          n === ls
            ? (Or++, (n = `${n} ${Nn(`(x${Or})`)}`))
            : ((ls = n), (Or = 1));
          let o = r() + n;
          return t(o), !0;
        },
      }),
      (Gd = {
        default() {
          return new Response(null, { status: 301 });
        },
      }),
      (Jd = {
        page: () => Promise.resolve(Gd),
        onRequest: (e, t) => t(),
        renderers: [],
      });
    (cs = Symbol.for("astro.clientAddress")), (ps = Symbol.for("astro.locals"));
    (ds = Symbol.for("astro.clientAddress")),
      (ef = Symbol.for("astro.responseSent"));
    ni = class {
      constructor(t, r, n) {
        O(this, Bt, void 0);
        O(this, ve, void 0);
        O(this, Rt, void 0);
        if ((L(this, Bt, t), L(this, ve, r), L(this, Rt, n), r))
          for (let o of Object.keys(r)) {
            if (this[o] !== void 0)
              throw new y({
                ...D.ReservedSlotName,
                message: D.ReservedSlotName.message(o),
              });
            Object.defineProperty(this, o, {
              get() {
                return !0;
              },
              enumerable: !0,
            });
          }
      }
      has(t) {
        return h(this, ve) ? !!h(this, ve)[t] : !1;
      }
      async render(t, r = []) {
        if (!h(this, ve) || !this.has(t)) return;
        let n = h(this, Bt);
        if (!Array.isArray(r))
          Je(
            h(this, Rt),
            "Astro.slots.render",
            `Expected second parameter to be an array, received a ${typeof r}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`,
          );
        else if (r.length > 0) {
          let a = h(this, ve)[t],
            s = typeof a == "function" ? await a(n) : await a,
            u = tf(s);
          if (u)
            return await ot(n, async () =>
              typeof u == "function" ? u(...r) : u,
            ).then((l) => (l != null ? String(l) : l));
          if (typeof s == "function")
            return await Be(n, s(...r)).then((c) =>
              c != null ? String(c) : c,
            );
        }
        let o = await ot(n, h(this, ve)[t]);
        return Ge(n, o);
      }
    };
    (Bt = new WeakMap()), (ve = new WeakMap()), (Rt = new WeakMap());
    Nr = null;
    of = ["string", "number", "undefined"];
    ri = class {
      constructor(t, r = "production") {
        (this.cache = {}), (this.logging = t), (this.mode = r);
      }
      clearAll() {
        this.cache = {};
      }
      set(t, r) {
        var n;
        this.mode === "production" &&
          (n = this.cache[t.component]) != null &&
          n.staticPaths &&
          Je(
            this.logging,
            "routeCache",
            `Internal Warning: route cache overwritten. (${t.component})`,
          ),
          (this.cache[t.component] = r);
      }
      get(t) {
        return this.cache[t.component];
      }
    };
    ms = Symbol.for("astro.locals");
    (Ff = Symbol.for("astro.locals")),
      (wf = Symbol.for("astro.responseSent")),
      (St = class {
        constructor(t, r = !0) {
          O(this, kn);
          O(this, Tt);
          O(this, $t);
          O(this, Se, void 0);
          O(this, I, void 0);
          O(this, ke, void 0);
          O(this, jt, void 0);
          O(this, Sn, new TextEncoder());
          O(this, rt, { dest: Wd, level: "info" });
          O(this, _t, void 0);
          L(this, I, t),
            L(this, ke, { routes: t.routes.map((n) => n.routeData) }),
            L(this, jt, new Map(t.routes.map((n) => [n.routeData, n]))),
            L(this, _t, In(h(this, I).base)),
            L(this, Se, ue(this, kn, Zs).call(this, r));
        }
        set setManifest(t) {
          L(this, I, t);
        }
        set setManifestData(t) {
          L(this, ke, t);
        }
        removeBase(t) {
          return t.startsWith(h(this, I).base)
            ? t.slice(h(this, _t).length + 1)
            : t;
        }
        match(t, { matchNotFound: r = !1 } = {}) {
          let n = new URL(t.url);
          if (h(this, I).assets.has(n.pathname)) return;
          let o = Mt(this.removeBase(n.pathname)),
            i = zr(o, h(this, ke));
          if (i) return i.prerender ? void 0 : i;
          if (r) {
            let a = zr("/404", h(this, ke));
            return a?.prerender ? void 0 : a;
          } else return;
        }
        async render(t, r, n) {
          let o = 200;
          if (
            !r &&
            ((r = this.match(t)),
            r || ((o = 404), (r = this.match(t, { matchNotFound: !0 }))),
            !r)
          )
            return new Response(null, { status: 404, statusText: "Not found" });
          Reflect.set(t, Ff, n ?? {}), r.route === "/404" && (o = 404);
          let i = await ue(this, $t, ai).call(this, r),
            a = await i.page(),
            s = new URL(t.url),
            u = await ue(this, Tt, oi).call(this, s, t, r, i, o),
            c;
          try {
            c = await Ds(r.type, u, h(this, Se), a, i.onRequest);
          } catch (l) {
            Vd(h(this, rt), "ssr", l.stack || l.message || String(l)),
              (c = new Response(null, {
                status: 500,
                statusText: "Internal server error",
              }));
          }
          if (rf(c, r.type)) {
            if (c.status === 500 || c.status === 404) {
              let l = zr("/" + c.status, h(this, ke));
              if (l && l.route !== r.route) {
                i = await ue(this, $t, ai).call(this, l);
                try {
                  let p = await ue(this, Tt, oi).call(
                      this,
                      s,
                      t,
                      r,
                      i,
                      c.status,
                    ),
                    f = await i.page();
                  return await Ds(r.type, p, h(this, Se), f);
                } catch {}
              }
            }
            return Reflect.set(c, wf, !0), c;
          } else if (c.type === "response") {
            if (c.response.headers.get("X-Astro-Response") === "Not-Found") {
              let l = new Request(new URL("/404", t.url)),
                p = this.match(l);
              if (p) return this.render(l, p);
            }
            return c.response;
          } else {
            let l = c.body,
              p = new Headers(),
              f = xs.default.getType(s.pathname);
            f
              ? p.set("Content-Type", `${f};charset=utf-8`)
              : p.set("Content-Type", "text/plain;charset=utf-8");
            let x = h(this, Sn).encode(l);
            p.set("Content-Length", x.byteLength.toString());
            let g = new Response(x, { status: 200, headers: p });
            return hi(g, c.cookies), g;
          }
        }
        setCookieHeaders(t) {
          return Ud(t);
        }
      });
    (Se = new WeakMap()),
      (I = new WeakMap()),
      (ke = new WeakMap()),
      (jt = new WeakMap()),
      (Sn = new WeakMap()),
      (rt = new WeakMap()),
      (_t = new WeakMap()),
      (kn = new WeakSet()),
      (Zs = function (t = !1) {
        return {
          adapterName: h(this, I).adapterName,
          logging: h(this, rt),
          markdown: h(this, I).markdown,
          mode: "production",
          compressHTML: h(this, I).compressHTML,
          renderers: h(this, I).renderers,
          clientDirectives: h(this, I).clientDirectives,
          resolve: async (r) => {
            if (!(r in h(this, I).entryModules))
              throw new Error(`Unable to resolve [${r}]`);
            let n = h(this, I).entryModules[r];
            switch (!0) {
              case n.startsWith("data:"):
              case n.length === 0:
                return n;
              default:
                return gi(n, h(this, I).base, h(this, I).assetsPrefix);
            }
          },
          routeCache: new ri(h(this, rt)),
          site: h(this, I).site,
          ssr: !0,
          streaming: t,
        };
      }),
      (Tt = new WeakSet()),
      (oi = async function (t, r, n, o, i = 200) {
        if (n.type === "endpoint") {
          let a = "/" + this.removeBase(t.pathname),
            u = await o.page();
          return await hs({
            request: r,
            pathname: a,
            route: n,
            status: i,
            env: h(this, Se),
            mod: u,
          });
        } else {
          let a = Mt(this.removeBase(t.pathname)),
            s = h(this, jt).get(n),
            u = new Set(),
            c = gf(s.styles),
            l = new Set();
          for (let f of s.scripts)
            "stage" in f
              ? f.stage === "head-inline" &&
                l.add({ props: {}, children: f.children })
              : l.add(xf(f));
          let p = await o.page();
          return await hs({
            request: r,
            pathname: a,
            componentMetadata: h(this, I).componentMetadata,
            scripts: l,
            styles: c,
            links: u,
            route: n,
            status: i,
            mod: p,
            env: h(this, Se),
          });
        }
      }),
      ($t = new WeakSet()),
      (ai = async function (t) {
        if (t.type === "redirect") return Jd;
        if (h(this, I).pageMap) {
          let r = h(this, I).pageMap.get(t.component);
          if (!r)
            throw new Error(
              `Unexpectedly unable to find a component instance for route ${t.route}`,
            );
          return await r();
        } else {
          if (h(this, I).pageModule) return h(this, I).pageModule;
          throw new Error(
            "Astro couldn't find the correct page to render, probably because it wasn't correctly mapped for SSR usage. This is an internal error, please file an issue.",
          );
        }
      });
    (Cf = () => Promise.resolve().then(() => _f)),
      (Ef = Object.freeze(
        Object.defineProperty(
          { __proto__: null, onRequest: Re, page: Cf, renderers: fe },
          Symbol.toStringTag,
          { value: "Module" },
        ),
      )),
      (gs = ["jpeg", "jpg", "png", "tiff", "webp", "gif", "svg"]);
    _r = {
      validateOptions(e) {
        if (!e.src || (typeof e.src != "string" && typeof e.src != "object"))
          throw new y({
            ...D.ExpectedImage,
            message: D.ExpectedImage.message(JSON.stringify(e.src)),
          });
        if (Ur(e.src)) {
          if (!gs.includes(e.src.format))
            throw new y({
              ...D.UnsupportedImageFormat,
              message: D.UnsupportedImageFormat.message(
                e.src.format,
                e.src.src,
                gs,
              ),
            });
          e.src.format === "svg" && (e.format = "svg");
        } else {
          if (e.src.startsWith("/@fs/"))
            throw new y({
              ...D.LocalImageUsedWrongly,
              message: D.LocalImageUsedWrongly.message(e.src),
            });
          let t;
          if (
            (!e.width && !e.height
              ? (t = "both")
              : !e.width && e.height
              ? (t = "width")
              : e.width && !e.height && (t = "height"),
            t)
          )
            throw new y({
              ...D.MissingImageDimension,
              message: D.MissingImageDimension.message(t, e.src),
            });
        }
        return e.format || (e.format = "webp"), e;
      },
      getHTMLAttributes(e) {
        let t = e.width,
          r = e.height;
        if (Ur(e.src)) {
          let c = e.src.width / e.src.height;
          r && !t
            ? (t = Math.round(r * c))
            : t && !r
            ? (r = Math.round(t / c))
            : !t && !r && ((t = e.src.width), (r = e.src.height));
        }
        let { src: n, width: o, height: i, format: a, quality: s, ...u } = e;
        return {
          ...u,
          width: t,
          height: r,
          loading: u.loading ?? "lazy",
          decoding: u.decoding ?? "async",
        };
      },
      getURL(e) {
        if (!Ur(e.src)) return e.src;
        let t = new URLSearchParams();
        return (
          t.append("href", e.src.src),
          e.width && t.append("w", e.width.toString()),
          e.height && t.append("h", e.height.toString()),
          e.quality && t.append("q", e.quality.toString()),
          e.format && t.append("f", e.format),
          Ot("/", "/_image?") + t
        );
      },
      parseURL(e) {
        let t = e.searchParams;
        return t.has("href")
          ? {
              src: t.get("href"),
              width: t.has("w") ? parseInt(t.get("w")) : void 0,
              height: t.has("h") ? parseInt(t.get("h")) : void 0,
              format: t.get("f"),
              quality: t.get("q"),
            }
          : void 0;
      },
    };
    (Sf = (e) => {
      let t = e.length,
        r = 0,
        n = 0,
        o = 8997,
        i = 0,
        a = 33826,
        s = 0,
        u = 40164,
        c = 0,
        l = 52210;
      for (; r < t; )
        (o ^= e.charCodeAt(r++)),
          (n = o * 435),
          (i = a * 435),
          (s = u * 435),
          (c = l * 435),
          (s += o << 8),
          (c += a << 8),
          (i += n >>> 16),
          (o = n & 65535),
          (s += i >>> 16),
          (a = i & 65535),
          (l = (c + (s >>> 16)) & 65535),
          (u = s & 65535);
      return (
        (l & 15) * 281474976710656 + u * 4294967296 + a * 65536 + (o ^ (l >> 4))
      );
    }),
      (kf = (e, t = !1) =>
        (t ? 'W/"' : '"') + Sf(e).toString(36) + e.length.toString(36) + '"'),
      (Af = Cs("https://qnt.one/")),
      (eu = Fs(
        async (e, t, r) => {
          let n = e.createAstro(Af, t, r);
          n.self = eu;
          let o = n.props;
          if (o.alt === void 0 || o.alt === null)
            throw new y(D.ImageMissingAlt);
          typeof o.width == "string" && (o.width = parseInt(o.width)),
            typeof o.height == "string" && (o.height = parseInt(o.height));
          let i = await Bf(o);
          return Di`${pi()}<img${An(i.src, "src")}${Ls(i.attributes)}>`;
        },
        "/Users/aw/Code/website/node_modules/astro/components/Image.astro",
        void 0,
      )),
      (si = {}),
      (Bf = async (e) => await bf(e, si));
    (jf = async ({ request: e }) => {
      try {
        let t = await Qs();
        if (!Ks(t))
          throw new Error("Configured image service is not a local service");
        let r = new URL(e.url),
          n = await t.parseURL(r, si);
        if (!n?.src)
          throw new Error("Incorrect transform returned by `parseURL`");
        let o,
          i = Fi(n.src) ? new URL(n.src) : new URL(n.src, r.origin);
        if (((o = await Rf(i)), !o))
          return new Response("Not Found", { status: 404 });
        let { data: a, format: s } = await t.transform(o, n, si);
        return new Response(a, {
          status: 200,
          headers: {
            "Content-Type": vs.default.getType(s) ?? `image/${s}`,
            "Cache-Control": "public, max-age=31536000",
            ETag: kf(a.toString()),
            Date: new Date().toUTCString(),
          },
        });
      } catch (t) {
        return new Response(`Server Error: ${t}`, { status: 500 });
      }
    }),
      (_f = Object.freeze(
        Object.defineProperty(
          { __proto__: null, get: jf },
          Symbol.toStringTag,
          { value: "Module" },
        ),
      ));
  });
var Rn = {};
Xe(Rn, { _: () => Tf, i: () => $f, l: () => Pf });
var vi,
  Tf,
  $f,
  Pf,
  jn = Z(() => {
    "use strict";
    (vi = () => {}), (Tf = vi), ($f = vi), (Pf = vi);
  });
var nu = {};
Xe(nu, { onRequest: () => Re, page: () => If, renderers: () => fe });
var tm,
  im,
  am,
  sm,
  um,
  If,
  ru = Z(() => {
    "use strict";
    qe();
    tm = A(je(), 1);
    _e();
    Te();
    im = A($e(), 1);
    Pe();
    (am = A(De(), 1)), (sm = A(Ue(), 1)), (um = A(He(), 1));
    Ve();
    If = () =>
      Promise.resolve()
        .then(() => (jn(), Rn))
        .then((e) => e.i);
  });
var iu = {};
Xe(iu, { onRequest: () => Re, page: () => Mf, renderers: () => fe });
var pm,
  Dm,
  hm,
  gm,
  xm,
  Mf,
  ou = Z(() => {
    "use strict";
    qe();
    pm = A(je(), 1);
    _e();
    Te();
    Dm = A($e(), 1);
    Pe();
    (hm = A(De(), 1)), (gm = A(Ue(), 1)), (xm = A(He(), 1));
    Ve();
    Mf = () =>
      Promise.resolve()
        .then(() => (jn(), Rn))
        .then((e) => e.l);
  });
var au = {};
Xe(au, { onRequest: () => Re, page: () => Of, renderers: () => fe });
var Fm,
  Em,
  Sm,
  km,
  Am,
  Of,
  su = Z(() => {
    "use strict";
    qe();
    Fm = A(je(), 1);
    _e();
    Te();
    Em = A($e(), 1);
    Pe();
    (Sm = A(De(), 1)), (km = A(Ue(), 1)), (Am = A(He(), 1));
    Ve();
    Of = () =>
      Promise.resolve()
        .then(() => (jn(), Rn))
        .then((e) => e._);
  });
qe();
var _m = A($e(), 1),
  Tm = A(je(), 1);
Te();
_e();
Pe();
var Mm = A(De(), 1),
  Om = A(Ue(), 1),
  Nm = A(He(), 1);
Ve();
var Nf =
  typeof process == "object" &&
  Object.prototype.toString.call(process) === "[object process]";
function Lf() {
  return new Proxy(
    {},
    {
      get: (e, t) => {
        console.warn(
          `Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`,
        );
      },
    },
  );
}
Nf || (process.env = Lf());
function cu(e) {
  let t = new St(e);
  return {
    onRequest: async ({ request: n, next: o, ...i }) => {
      process.env = i.env;
      let { pathname: a } = new URL(n.url);
      if (e.assets.has(a)) return i.env.ASSETS.fetch(n);
      let s = t.match(n, { matchNotFound: !0 });
      if (s) {
        Reflect.set(
          n,
          Symbol.for("astro.clientAddress"),
          n.headers.get("cf-connecting-ip"),
        ),
          Reflect.set(n, Symbol.for("runtime"), {
            ...i,
            waitUntil: (c) => {
              i.waitUntil(c);
            },
            name: "cloudflare",
            next: o,
            caches,
            cf: n.cf,
          });
        let u = await t.render(n, s);
        if (t.setCookieHeaders)
          for (let c of t.setCookieHeaders(u))
            u.headers.append("Set-Cookie", c);
        return u;
      }
      return new Response(null, { status: 404, statusText: "Not found" });
    },
    manifest: e,
  };
}
var uu = Object.freeze(
    Object.defineProperty(
      { __proto__: null, createExports: cu },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  zf = () =>
    Promise.resolve()
      .then(() => (qe(), tu))
      .then((e) => e.i),
  Uf = () => Promise.resolve().then(() => (ru(), nu)),
  Hf = () => Promise.resolve().then(() => (ou(), iu)),
  Vf = () => Promise.resolve().then(() => (su(), au)),
  qf = new Map([
    ["node_modules/astro/dist/assets/image-endpoint.js", zf],
    ["src/pages/index.astro", Uf],
    ["src/pages/legal-notice.astro", Hf],
    ["src/pages/404.astro", Vf],
  ]),
  pu = Object.assign(
    xi({
      adapterName: "@astrojs/cloudflare",
      routes: [
        {
          file: "index.html",
          links: [],
          scripts: [],
          styles: [],
          routeData: {
            route: "/",
            type: "page",
            pattern: "^\\/$",
            segments: [],
            params: [],
            component: "src/pages/index.astro",
            pathname: "/",
            prerender: !0,
            _meta: { trailingSlash: "ignore" },
          },
        },
        {
          file: "legal-notice/index.html",
          links: [],
          scripts: [],
          styles: [],
          routeData: {
            route: "/legal-notice",
            type: "page",
            pattern: "^\\/legal-notice\\/?$",
            segments: [[{ content: "legal-notice", dynamic: !1, spread: !1 }]],
            params: [],
            component: "src/pages/legal-notice.astro",
            pathname: "/legal-notice",
            prerender: !0,
            _meta: { trailingSlash: "ignore" },
          },
        },
        {
          file: "404.html",
          links: [],
          scripts: [],
          styles: [],
          routeData: {
            route: "/404",
            type: "page",
            pattern: "^\\/404\\/?$",
            segments: [[{ content: "404", dynamic: !1, spread: !1 }]],
            params: [],
            component: "src/pages/404.astro",
            pathname: "/404",
            prerender: !0,
            _meta: { trailingSlash: "ignore" },
          },
        },
        {
          file: "",
          links: [],
          scripts: [],
          styles: [],
          routeData: {
            type: "endpoint",
            route: "/_image",
            pattern: "^\\/_image$",
            segments: [[{ content: "_image", dynamic: !1, spread: !1 }]],
            params: [],
            component: "node_modules/astro/dist/assets/image-endpoint.js",
            pathname: "/_image",
            prerender: !1,
            _meta: { trailingSlash: "ignore" },
          },
        },
      ],
      site: "https://qnt.one/",
      base: "/",
      compressHTML: !1,
      markdown: {
        drafts: !1,
        syntaxHighlight: "shiki",
        shikiConfig: { langs: [], theme: "github-dark", wrap: !1 },
        remarkPlugins: [],
        rehypePlugins: [],
        remarkRehype: {},
        gfm: !0,
        smartypants: !0,
      },
      componentMetadata: [
        [
          "/Users/aw/Code/website/src/pages/404.astro",
          { propagation: "none", containsHead: !0 },
        ],
        [
          "/Users/aw/Code/website/src/pages/index.astro",
          { propagation: "none", containsHead: !0 },
        ],
        [
          "/Users/aw/Code/website/src/pages/legal-notice.astro",
          { propagation: "none", containsHead: !0 },
        ],
      ],
      renderers: [],
      clientDirectives: [
        [
          "idle",
          '(()=>{var i=t=>{let e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event("astro:idle"));})();',
        ],
        [
          "load",
          '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event("astro:load"));})();',
        ],
        [
          "media",
          '(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener("change",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event("astro:media"));})();',
        ],
        [
          "only",
          '(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event("astro:only"));})();',
        ],
        [
          "visible",
          '(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event("astro:visible"));})();',
        ],
      ],
      entryModules: {
        "\0@astro-renderers": "renderers.mjs",
        "\0@astrojs-ssr-virtual-entry": "_@astrojs-ssr-virtual-entry.mjs",
        "\0empty-middleware": "_empty-middleware.mjs",
        "\0@astro-page:src/pages/index@_@astro":
          "chunks/index@_@astro.caf01e79.mjs",
        "\0@astro-page:src/pages/legal-notice@_@astro":
          "chunks/legal-notice@_@astro.f87e642c.mjs",
        "\0@astro-page:src/pages/404@_@astro":
          "chunks/404@_@astro.f2f34307.mjs",
        "/Users/aw/Code/website/src/image-service.ts":
          "chunks/image-service.220143e6.mjs",
        "/astro/hoisted.js?q=0": "_astro/hoisted.4acdb0b6.js",
        "@astrojs/react/client.js": "_astro/client.c67de31f.js",
        "astro:scripts/before-hydration.js": "",
      },
      assets: [
        "/_astro/schnelltest.eea0e31c.jpg",
        "/_astro/hankens.175a23be.jpg",
        "/_astro/hm.a46ac1f7.jpg",
        "/_astro/Satoshi-Black.bd11b582.woff2",
        "/_astro/Satoshi-Bold.353a7fbf.woff2",
        "/_astro/Satoshi-Light.8a24f395.woff2",
        "/_astro/Satoshi-Medium.af02a722.woff2",
        "/_astro/Satoshi-Regular.50dca57f.woff2",
        "/_astro/Satoshi-Light.dd42e743.woff",
        "/_astro/Satoshi-Black.a849a7b7.woff",
        "/_astro/Satoshi-Bold.1789917c.woff",
        "/_astro/Satoshi-Medium.7aeaf037.woff",
        "/_astro/Satoshi-Regular.9fbc41c9.woff",
        "/_astro/Satoshi-Light.b54cf060.ttf",
        "/_astro/Satoshi-Black.78edaca6.ttf",
        "/_astro/Satoshi-Bold.2c122eab.ttf",
        "/_astro/Satoshi-Medium.7130cef6.ttf",
        "/_astro/Satoshi-Regular.243b23f6.ttf",
        "/_astro/404.49e43575.css",
        "/favicon.ico",
        "/logo.png",
        "/security.txt",
        "/$server_build/_empty-middleware.mjs",
        "/$server_build/renderers.mjs",
        "/_astro/client.c67de31f.js",
        "/_astro/hoisted.4acdb0b6.js",
        "/images/apple-touch-icon-ipad-76x76.png",
        "/images/apple-touch-icon-ipad-retina-152x152.png",
        "/images/apple-touch-icon-iphone-60x60.png",
        "/images/apple-touch-icon-iphone-retina-120x120.png",
        "/$server_build/_astro/404.49e43575.css",
        "/$server_build/_astro/Satoshi-Black.78edaca6.ttf",
        "/$server_build/_astro/Satoshi-Black.a849a7b7.woff",
        "/$server_build/_astro/Satoshi-Black.bd11b582.woff2",
        "/$server_build/_astro/Satoshi-Bold.1789917c.woff",
        "/$server_build/_astro/Satoshi-Bold.2c122eab.ttf",
        "/$server_build/_astro/Satoshi-Bold.353a7fbf.woff2",
        "/$server_build/_astro/Satoshi-Light.8a24f395.woff2",
        "/$server_build/_astro/Satoshi-Light.b54cf060.ttf",
        "/$server_build/_astro/Satoshi-Light.dd42e743.woff",
        "/$server_build/_astro/Satoshi-Medium.7130cef6.ttf",
        "/$server_build/_astro/Satoshi-Medium.7aeaf037.woff",
        "/$server_build/_astro/Satoshi-Medium.af02a722.woff2",
        "/$server_build/_astro/Satoshi-Regular.243b23f6.ttf",
        "/$server_build/_astro/Satoshi-Regular.50dca57f.woff2",
        "/$server_build/_astro/Satoshi-Regular.9fbc41c9.woff",
        "/$server_build/_astro/hankens.175a23be.jpg",
        "/$server_build/_astro/hm.a46ac1f7.jpg",
        "/$server_build/_astro/schnelltest.eea0e31c.jpg",
        "/$server_build/chunks/404@_@astro.f2f34307.mjs",
        "/$server_build/chunks/image-service.220143e6.mjs",
        "/$server_build/chunks/index@_@astro.caf01e79.mjs",
        "/$server_build/chunks/legal-notice@_@astro.f87e642c.mjs",
        "/$server_build/chunks/prerender.576e292d.mjs",
        "/index.html",
        "/legal-notice/index.html",
        "/404.html",
      ],
    }),
    { pageMap: qf, renderers: fe },
  ),
  Wf = void 0,
  du = cu(pu),
  zm = du.onRequest,
  Um = du.manifest,
  lu = "start";
lu in uu && uu[lu](pu, Wf);
export { Um as manifest, zm as onRequest, qf as pageMap };
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server-legacy.browser.production.min.js:
  (**
   * @license React
   * react-dom-server-legacy.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.browser.production.min.js:
  (**
   * @license React
   * react-dom-server.browser.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/