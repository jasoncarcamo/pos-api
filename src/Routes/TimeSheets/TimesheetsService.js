const TimesheetsService = {
    getTimesheets(db){
        return db.select("*").from("timesheets").returning("*");
    },
    getTimesheetByID(db, id){
        return db.select("*").from("timesheets").where({id}).returning("*");
    },
    insertNewTimesheet(db, timesheet){
        return db.insert(timesheet).into("timesheets");
    },
    updateTimesheet(db, timesheetUpdate, id, date){
        return db.update(timesheetUpdate).from("timesheets").where({employee_id: id, date});
    },
    deleteTimesheet(db, id){
        return db.delete().from("timesheets").where({id});
    }
};

module.exports = TimesheetsService;