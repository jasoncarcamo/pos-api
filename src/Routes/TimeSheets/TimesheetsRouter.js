const express = require("express");
const TimesheetsRouter = express.Router();
const TimesheetsService = require("./TimesheetsService");

TimesheetsRouter
    .route("/timesheets")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        TimesheetsService.getTimesheets(req.app.get("db"))
            .then( data => res.status(200).json({ timesheets: data}));
    })
    .post((req, res)=>{
        
        const { shift_start, shift_end, went_on_break, break_clock_out, break_clock_in, date} = req.body;

        const newTimesheet = {
            shift_start, 
            shift_end, 
            went_on_break, 
            break_clock_out, 
            break_clock_in, 
            date,
            employee_id: 2
        };

        for( const [key, value] of Object.entries(newTimesheet)){
            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request.`})
            };
        }

        TimesheetsService.insertNewTimesheet( req.app.get("timesheets"), newTimesheet)
            then( data => res.status(201).end());
    })


TimesheetsRouter
    .route("/timesheets/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        TimesheetsService.getTimesheetByID( req.app.get("db"), req.params.id)
            .then( data => {
                if(!data){
                    return res.status(400).json({ error: "No timesheet found by this id."})
                };

                return res.status(200).json({ timesheet: data});
            })
    })
    .patch((req, res)=>{

        TimesheetsService.updateTimesheet(req.app.get("db"), req.body, req.params.id)
            .then( data =>{
                if(!data){
                    return res.status(400).json({ error: "Invalid body request."})
                }
                return res.status(204).end()
            });
    })
    .delete((req, res)=>{
        TimesheetsService.deleteTimesheet(req.app.get("db"), req.params.id)
            .then(data =>{
                return res.status(204).end();
            })
    })

module.exports = TimesheetsRouter;