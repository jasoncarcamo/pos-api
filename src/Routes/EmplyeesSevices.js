const EmplyeesServices = {
    getAllEmployees( db){
        return db.select("*").from("employees").returning("*");
    },
    getEmployeeById( db, id){
        return db.select("*").from("employees").where({id}).returning("*").then(([employee]) => employee);
    },
    insertNewEmployee( db, employee){
        return db.insert(employee).into("employees");
    },
    updateEmployee( db, employee, id){
        return db.update(employee).from("employees").where({id});
    },
    deleteEmployee( db, id){
        return db.delete().from("employees").where({id});
    }
}

module.exports = EmplyeesServices;