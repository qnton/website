import { chromium } from "playwright";

const main = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/resume", { waitUntil: "networkidle" });

  await page.emulateMedia({ media: "print" });

  await page.pdf({
    path: "public/resume.pdf",
    printBackground: true,
  });

  return browser.close();
};

main();
