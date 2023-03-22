const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "https://proxy-client-sage.vercel.app",
    credentials: true,
  })
);
// Set up cookie-parser middleware
app.use(cookieParser("secret"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/auth", (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Expires", "0");
  res.cookie("jwt-token", "THIS IS JWT", {
    httpOnly: true,
    maxAge: 30000,
    signed: true,
    sameSite: "none",
    secure: true,
  });
  res.send("Hello AUTH!");
});

app.get("/check", (req, res) => {
  const avail = req.signedCookies["jwt-token"];
  if (avail) {
    res.json("Cookie is available");
  } else {
    res.json("Cookie is not available");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port 3000!");
});
