const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //   solution 1 simple
  //     fs.readFile("./starter/test-file.txt", "utf8", (err, data) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.end(data);
  //     });

  // //   solution 2 with streams
  //     const readable = fs.createReadStream("./starter/test-file.txt");
  //     readable.on("data", (chunk) => {
  //       res.write(chunk);
  //     });
  //     readable.on("end", () => {
  //       res.end();
  //     });
  //     readable.on("error", (err) => {
  //       console.log(err);
  //       res.statusCode = 500;
  //       res.end("File error");
  //     });

  //Solution 3 with pipe
  const readable = fs.createReadStream("./starter/test-file.txt");
  console.log(readable);
  readable.pipe(res);
});

server.listen(8000, () => {
  console.log("server has started");
});
