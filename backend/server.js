const express = require("express");
const router = require("./routes");
const bodyparser = require("body-parser");

const app = express();
const port = 8080;

app.use("/", router);
app.use(express.json());

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
