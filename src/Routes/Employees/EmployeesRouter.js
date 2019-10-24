const express = require("express");
const EmployeesRouter = express.Router();
const EmployeesServices = require("./EmplyeesSevices");


EmployeesRouter
    .route("/employees")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        EmployeesServices.getAllEmployees(req.app.get("db"))
            .then( data => res.status(200).json({ employees: data}));
    })
    .post(( req, res)=>{
        const {first_name, last_name, position, wage, pin} = req.body;

        const newEmployee = {
            first_name,
            last_name,
            position,
            wage,
            pin
        };

        for( const [key, value] of Object.entries(newEmployee)){
            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request.`})
            };
        };

        EmployeesServices.insertNewEmployee( req.app.get("db"), newEmployee)
            .then( data => res.status(201).end());
    });

EmployeesRouter
    .route("/employees/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        EmployeesServices.getEmployeeById(req.app.get("db"), req.params.id)
            .then( data => res.status(200).json(data));
    })
    .patch(( req, res)=>{     


        EmployeesServices.updateEmployee( req.app.get("db"), req.body, req.params.id)
            .then( data => res.status(204).end());
    })
    .delete(( req, res)=>{
        const id = "1";
        if(id != 1){
            return res.status(401).end();
        }

        EmployeesServices.deleteEmployee( req.app.get("db"), req.params.id)
            .then( data => res.status(204).end());
    });

module.exports = EmployeesRouter;