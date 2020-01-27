require("dotenv").config();
const express = require("express");
const AuthRouter = express.Router();
const Authservice = require("./AuthService");

AuthRouter
    .post("/auth", express.json(), express.urlencoded({ extended: true}), (req, res) => {
        const {id, pin} = req.body;

        const employee = {
            id,
            pin
        };
        
        for(const [key, value] of Object.entries(employee)){
            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            };
        };        
        
        Authservice.getEmployeeById(req.app.get("db"), employee.id)
            .then( dbEmployee => {

                if(!dbEmployee){
                    return res.status(400).json({ error: "No employee found"});
                };

                Authservice.comparePin(employee.pin, dbEmployee.pin)
                    .then( match => {

                        if(!match){
                            return res.status(400).json({ error: "Incorrect pin"});
                        };

                        const subject = employee.id;
                        const payload = {user: employee.id};

                        if(employee.id == "1"){
                            return res.status(201).json({ adminToken: Authservice.createJwt(subject, payload)});
                        };

                        return res.status(201).json({ employee: dbEmployee });
                    });
            });
    });

module.exports = AuthRouter;