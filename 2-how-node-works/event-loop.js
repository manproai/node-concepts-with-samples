const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
let start = Date.now();
process.env.UV_THREADPOOL_SIZE = 1

setTimeout(() => console.log("setTimeout 1 "), 0);
setImmediate(() => console.log("setImmediate 1 "));

fs.readFile(path.join(__dirname + "/starter/test-file.txt"), "utf8", () => {
  console.log("fs readFile");

  setTimeout(() => console.log("setTimeout 2 "), 0);
  setTimeout(() => console.log("setTimeout 3 "), 3000);
  setImmediate(() => console.log("setImmediate 2"));

  process.nextTick(() => console.log("NextTick"));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log('Crypto sync');
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " encrypted password");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " encrypted password");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " encrypted password");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " encrypted password");
  });
  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start + " encrypted password");
  });
});

console.log("Top level code");
