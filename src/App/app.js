require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const {NODE_ENV} = require("../../config");
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';
const EmployeesRouter = require("../Routes/Employees/EmployeesRouter");
const TimesheetsRouter = require("../Routes/TimeSheets/TimesheetsRouter");
const MenuRouter = require("../Routes/Menu/MenuRouter");
const AuthRouter = require("../Routes/Authorization/AuthRouter");
const ActiveRouter = require("../Routes/active-orders/ActiveRouter");

app.use(morgan(morganSetting));
app.use(cors());
app.use(helmet());

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      
      response = { error: error.message, object: error }
    }
    console.error(error)
    res.status(500).json(response)
  })

app.use("/api", cors(), EmployeesRouter);
app.use("/api", TimesheetsRouter);
app.use("/api", MenuRouter);
app.use("/api", AuthRouter);
app.use("/api", ActiveRouter);

app.use("/", (req, res)=> {
    return res.status(200).send("Working!");
});


module.exports = app;