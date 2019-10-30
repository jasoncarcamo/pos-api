const express = require("express");
const EmployeesRouter = express.Router();
const EmployeesServices = require("./EmplyeesSevices");
const {requireAuth} = require("../../middleware/jwt-auth");


EmployeesRouter
    .route("/employees")
    .all(requireAuth)
    .all(requireAuth)
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
    .all(requireAuth)
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        EmployeesServices.getEmployeeById(req.app.get("db"), req.params.id)
            .then( data => res.status(200).json(data));
    })
    .patch(( req, res)=>{     

        const{ isclockedin, onbreak} = req.body;

        EmployeesServices.getEmployeeById(req.app.get("db"), req.params.id)
            .then( employee => {
                console.log(employee, isclockedin)
                if(employee.isclockedin && isclockedin === "true"){
                    return res.status(400).json({ error: "Employee is clocked in already."});
                };

                if(!employee.isclockedin && isclockedin == "false"){
                    return res.status(400).json({ error: "Employee not clocked in."})
                }

                if(employee.onbreak && onbreak == "true"){
                    return res.status(400).json({error: "Employee is on break already."})
                }

                if(!employee.onbreak && onbreak == "false"){
                    return res.status(400).json({error: "Employee did not go on break."})
                }

                EmployeesServices.updateEmployee( req.app.get("db"), req.body, req.params.id)
                    .then( data => res.status(204).end());
            })
    })
    .delete(( req, res)=>{

        EmployeesServices.deleteEmployee( req.app.get("db"), req.params.id)
            .then( data => res.status(204).end());
    });

module.exports = EmployeesRouter;