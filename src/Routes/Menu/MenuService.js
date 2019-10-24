const MenuService = {
    getMenus(db){
        return db.select("*").from("menu").returning("*");
    },
    getMenuById(db, id){
        return db.select("*").from("menu").where({id}).first();
    },
    insertNewMenu(db, menu){
        return db.insert(menu).into("menu");
    },
    updateMenu(db, menu, id){
        return db.update(menu).from("menu").where({id});
    },
    deleteMenu(db, id){
        return db.delete().from("menu").where({id});
    }
};

module.exports = MenuService;