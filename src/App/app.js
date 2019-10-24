const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const EmployeesRouter = require("../Routes/EmployeesRouter");


app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api", EmployeesRouter);

app.use("/", (req, res)=> {
    return res.status(200).send("Working!");
})


module.exports = app;