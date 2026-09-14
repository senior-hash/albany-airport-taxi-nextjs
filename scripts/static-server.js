const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..", "out");
const PORT = 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    let reqPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (reqPath.endsWith("/")) reqPath += "index.html";
    let filePath = path.join(ROOT, reqPath);

    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // try appending .html (Next static export uses /route.html for /route)
        fs.readFile(filePath + ".html", (err2, data2) => {
          if (err2) {
            fs.readFile(path.join(ROOT, "404.html"), (err3, data3) => {
              res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
              res.end(err3 ? "Not found" : data3);
            });
            return;
          }
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(data2);
        });
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Static server running at http://localhost:${PORT}`);
  });
