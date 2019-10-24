const TimesheetsService = {
    getTimesheets(db){
        return db.select("*").from("timesheets").returning("*");
    },
    getTimesheetByID(db, id){
        return db.select("*").from("timesheets").where({id}).first();
    },
    insertNewTimesheet(db, timesheet){
        return db.insert(timesheet).into("timesheets");
    },
    updateTimesheet(db, timesheetUpdate, id){
        return db.update(timesheetUpdate).from("timesheets").where({id});
    },
    deleteTimesheet(db, id){
        return db.delete().from("timesheets").where({id});
    }
};

module.exports = TimesheetsService;