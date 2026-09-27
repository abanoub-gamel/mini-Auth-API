const express = require("express");

const app = express();

const router = require("./routes/route");
app.use("/", router);

app.listen(3000, () => {
    console.log("starting on port 3000");
});
app.get("/profile", (req, res) => {
     res.status(200).json({
        message : "profile"
    })
});