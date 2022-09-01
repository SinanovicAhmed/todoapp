const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./config/db");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
connectDB();
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/task", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => console.log("Server started on port:" + port));
