const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoConnect = require("./utils/db").mongoConnect;
const apiRoute = require("./routes/api");

const app = express();

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.static(path.resolve(__dirname, "build")));

app.use("/api", apiRoute);

app.use("/", (req, res, next) => {
  console.log("requsetc");

  res.sendFile(path.join(__dirname, "build", "index.html"));
});

mongoose
  .connect("mongodb://mongo/truthordare")
  .then(results => {
    var numClient = 0;
    console.log("Connected To Db");
    const server = http.createServer(app);
    server.listen(3000);
    const io = require("./socket").init(server);
    io.on("connection", socket => {
      numClient++;
      console.log("Client Connected :", numClient);
      io.emit("numclient", numClient);
      socket.on("disconnect", () => {
        numClient--;
        io.emit("numclient", numClient);
        console.log("Client Disconnected : ", numClient);
      });
    });
  })
  .catch(err => {
    console.log(err);
  });

// mongoConnect(() => {

// });
