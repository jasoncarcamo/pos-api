const TimesheetsService = {
    getTimesheets(db){
        return db.select("*").from("timesheets").returning("*");
    },
    getTimesheetByID(db, id){
        return db.select("*").from("timesheets").where({id}).first();
    },
    insertNewTimesheet(db, employee){
        return db.insert(employee).into("timesheets");
    },
    updateTimesheet(db, employeeUpdate, id){
        return db.update(employeeUpdate).from("timesheets").where({id});
    },
    deleteTimesheet(db, id){
        return db.delete().from("timesheets").where({id});
    }
};

module.exports = TimesheetsService;