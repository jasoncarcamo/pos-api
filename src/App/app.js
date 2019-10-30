const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const EmployeesRouter = require("../Routes/Employees/EmployeesRouter");
const TimesheetsRouter = require("../Routes/TimeSheets/TimesheetsRouter");
const MenuRouter = require("../Routes/Menu/MenuRouter");
const AuthRouter = require("../Routes/Authorization/AuthRouter");
const ActiveRouter = require("../Routes/active-orders/ActiveRouter");
const {requireAuth} = require("../middleware/jwt-auth");

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

app.use("/api",EmployeesRouter);
app.use("/api", TimesheetsRouter);
app.use("/api", MenuRouter);
app.use("/api", AuthRouter);
app.use("/api", ActiveRouter);

app.use("/", (req, res)=> {
    return res.status(200).send("Working!");
});


module.exports = app;