const EventEmitter = require("events");
const http = require("http");

// const myEventEmitter = new EventEmitter();

// myEventEmitter.on("newSales", () => {
//   console.log("New sales are available!");
// });

// myEventEmitter.on("newSales", (amount) => {
//   console.log("50% for JUST, 30% for Timberland! with the amount of " + amount);
// });

// myEventEmitter.emit("newSales", 10);

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("a request was received");
  console.log(req.url);
  res.end("a request was received for page");
});
server.on("GET", (req, res) => {
  console.log("GET ");
});
server.on("POST", (req, res) => {
  console.log("POST ");
});

server.listen(8000, () => {
  console.log("server is listening on http://localhost 8000");
});
