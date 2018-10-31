const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const rendertron = require("rendertron-middleware");
const logger = require("morgan");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const app = express();

  app.use(logger("combined"));
  app.use(compression());

  const botUserAgents = [
    "Googlebot",
    "W3C_Validator",
    "baiduspider",
    "bingbot",
    "embedly",
    "facebookexternalhit",
    "linkedinbot",
    "outbrain",
    "pinterest",
    "quora link preview",
    "rogerbot",
    "showyoubot",
    "slackbot",
    "twitterbot",
    "vkShare"
  ];

  app.use(
    rendertron.makeMiddleware({
      proxyUrl: "https://monooq-rendertron.appspot.com/render",
      timeout: 20000,
      userAgentPattern: new RegExp(botUserAgents.join("|"), "i")
    })
  );

  app.get("/:path", (req, res, next) => {
    if (req.params.path === "index.html") {
      return res.redirect("/");
    }
    next();
  });

  app.get("/ja", (req, res) => {
    res.redirect("/");
  });

  app.get("/en", (req, res) => {
    res.redirect("/");
  });

  app.get("/ja/*", (req, res) => {
    res.redirect("/");
  });

  app.get("/en/*", (req, res) => {
    res.redirect("/");
  });

  // Priority serve any static files.
  app.use(
    express.static(path.resolve(__dirname, "../react-ui/storybook-static"))
  );

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../react-ui/storybook-static", "index.html")
    );
  });

  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
}
