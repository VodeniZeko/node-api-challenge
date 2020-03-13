const express = require("express");
const helmet = require("helmet");

const projectRouter = require("../routes/projectRouter");
const actionRouter = require("../routes/actionRouter");

const server = express();

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
