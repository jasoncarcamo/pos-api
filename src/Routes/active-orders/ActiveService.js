const ActiveService = {
    getActiveOrders(db){
        return db.select("*").from("activeorders").returning("*");
    },
    getActiveOrderById(db, id){
        return db.select("*").from("activeorders").where({id}).first();
    },
    insertActiveOrder(db, order){
        return db.insert(order).into("activeorders");
    },
    updateActiveOrder(db, order, id){
        return db.update(order).from("activeorders").where({id});
    },
    deleteActiveOrder(db, id){
        return db.delete().from("activeorders").where({id});
    }
};

module.exports = ActiveService;