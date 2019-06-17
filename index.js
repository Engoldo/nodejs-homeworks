const express = require("express");
const { performance } = require("perf_hooks");

const app = express();
const argv = process.argv.slice(2);

const config = {
  delay: argv[0] || 1000,
  stop: argv[1] || 10000
};

if (!isFinite(config.delay) || !isFinite(config.stop)) {
  console.error("Переменные окружения должны быть числами!");
  process.exit(1);
}

app
  .get("/", (req, res) => {
    const now = performance.now();
    console.log("Start loading!");

    const timerId = setInterval(() => {
      if (performance.now() - now >= config.stop) {
        clearInterval(timerId);
        console.log("Finish loading!");
        res.send(new Date().toUTCString());
      } else {
        console.log(new Date().toUTCString());
      }
    }, config.delay);
  })
  .listen(3000);
