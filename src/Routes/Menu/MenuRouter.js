const express = require("express");
const MenuRouter = express.Router();
const MenuService = require("./MenuService");
const ItemRouter = require("../../Routes/MenuItems/ItemRouter");

//Importing ItemRouter here instead of in ./src/App/app.js
//Uses same route as MenuRouter 
MenuRouter.use("/menu", ItemRouter);

MenuRouter
    .route("/menu")
    .all(express.json())
    .all(express.urlencoded({extended: true}))
    .get((req, res)=>{

        MenuService.getMenus(req.app.get("db"))
            .then( data => res.status(200).send(data));

    })
    .post((req, res)=>{

        const {category} = req.body;
        const newMenu = {category};

        if(!newMenu.category){
            return res.status(400).json({ error: "Missing category in body request."});
        };

        MenuService.insertNewMenu(req.app.get("db"), newMenu)
            .then( data =>{
                return res.status(201).end();
            });
    })
    


MenuRouter  
    .route("/menu/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        MenuService.getMenuById(req.app.get("db"), req.params.id)
            .then( data =>{

                if(!data){
                    return res.status(400).json({ error: "No Menu found."})
                };

                return res.status(200).json(data);

            })
    })
    .patch((req, res)=>{

        const {category} = req.body;
        const updateMenu = {category};

        if(!updateMenu.category){
            return res.status(400).json({ error: "Missing category in body request"});
        };

        MenuService.updateMenu(req.app.get("db"), updateMenu, req.params.id)
            .then( data => {
                if(!data){
                    return res.status(400).json({ error: "No menu found."})
                };

                return res.status(200).end();
            });

    })
    .delete((req, res)=>{
        MenuService.deleteMenu(req.app.get("db"), req.params.id)
            .then( data =>{
                if(!data){
                    return res.status(400).json({ error: "No menu found"});
                }

                return res.status(204).end();
            });
    })

module.exports = MenuRouter;