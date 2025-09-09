const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend files from "dist"
app.use(express.static(path.join(__dirname, "dist")));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Paths to SSL certificate files
const certPath = path.join(__dirname, "certs", "cert.pem");
const keyPath = path.join(__dirname, "certs", "key.pem");

// Check if both certificate files exist
const useHttps = fs.existsSync(certPath) && fs.existsSync(keyPath);

if (useHttps) {
  const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔒 HTTPS Server running on https://localhost:${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
  });
}

// Instructions for generating self-signed certificates
console.log("\nFor Safari compatibility, use HTTPS by generating certificates:");
console.log(
  "mkdir -p ./certs && openssl req -x509 -newkey rsa:4096 " +
    "-keyout ./certs/key.pem -out ./certs/cert.pem " +
    "-days 365 -nodes " +
    "-subj '/CN=localhost' " +
    "-addext \"subjectAltName=DNS:localhost,DNS:*.localhost,IP:127.0.0.1\""
);
console.log("Then run: npm run start:https\n");
