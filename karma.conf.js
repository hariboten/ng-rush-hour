import puppeteer from "puppeteer";
process.env.CHROME_BIN = puppeteer.executablePath();
console.log(process.env.CHROME_BIN);
export default function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    plugins: [
      "karma-jasmine",
      "karma-chrome-launcher",
      "karma-jasmine-html-reporter",
    ],
    reporters: ["progress", "kjhtml"],
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--headless",
          "--disable-gpu",
          "--disable-dev-shm-usage",
        ],
      },
    },
    restartOnFileChange: true,
  });
}
