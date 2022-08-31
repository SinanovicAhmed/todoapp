const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));

app.listen(port, () => console.log("Server started on port:" + port));
