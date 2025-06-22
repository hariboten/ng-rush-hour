import { join } from "path";
process.env.CHROME_BIN = require("puppeteer").executablePath();
console.log(process.env.CHROME_BIN);
export default function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
    ],
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: join(__dirname, "coverage", "ng-rush-hour"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "text-summary" }],
    },
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
