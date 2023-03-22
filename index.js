const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://proxy-client-sage.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
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

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port 3000!");
});
