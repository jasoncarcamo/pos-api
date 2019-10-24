const ItemsService = {
    getItems(db){
        return db.select("*").from("menuitems").returning("*");
    },
    getItemById(db, id){
        return db.select("*").from("menuitems").where({id}).first();
    },
    insertItem(db, item){
        return db.insert(item).from("menuitems");
    },
    updateItem(db, item, id){
        return db.update(item).from("menuitems").where({id});
    },
    deleteItem(db, id){
        return db.delete().from("menuitems").where({id});
    }
}
module.exports = ItemsService;