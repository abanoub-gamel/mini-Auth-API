const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());

const router = require("./routes/route");
const { authMiddleware } = require("./middleware/middleware");

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error"
  });
});


app.listen(3000, () => {
  console.log("starting on port 3000");
});

app.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "profile",
  });
});
