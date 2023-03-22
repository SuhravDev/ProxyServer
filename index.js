const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
// Set up cookie-parser middleware
app.use(cookieParser("secret"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/auth", (req, res) => {
  res.cookie("jwt-token", "THIS IS JWT", {
    httpOnly: true,
    maxAge: 30000,
    signed: true,
    sameSite: "none",
    secure: true,
    // domain: "localhost:3001",
  });
  res.send("Hello AUTH!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});