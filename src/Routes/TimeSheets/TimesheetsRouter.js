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

        TimesheetsService.insertNewTimesheet( req.app.get("db"), req.body)
            .then( data => res.status(201).end());
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

        TimesheetsService.getTimesheets(req.app.get("db"))
            .then( sheets => {

                let todaysDate = new Date();

                sheets.forEach( sheet=> {
                    console.log(sheet.date.toDateString(), todaysDate.toDateString())
                    if(sheet.date.toDateString() == todaysDate.toDateString()){

                        TimesheetsService.updateTimesheet(req.app.get("db"), req.body, req.params.id, sheet.date)
                        .then( data =>{
                            return res.status(200).end()
                        });

                    };             

                });

            });
    })
    .delete((req, res)=>{
        TimesheetsService.deleteTimesheet(req.app.get("db"), req.params.id)
            .then(data =>{
                return res.status(200).end();
            })
    })

module.exports = TimesheetsRouter;