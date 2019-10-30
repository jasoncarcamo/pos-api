const express = require("express");
const ItemRouter = express.Router();
const ItemService = require("./ItemsService");


//ItemRouter is imported in /src/App/Menu/MenuRouter to continue from MenuRouters' route
ItemRouter
    .route("/items")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=>{
        ItemService.getItems(req.app.get("db"))
            .then( data =>{
                return res.status(200).send(data);
            });
    })
    .post((req, res)=> {

        const {name, price, menuid} = req.body;

        const newItem = {
            name,
            price,
            menuid
        };

        for(const [key, value] of Object.entries(newItem)){

            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            }

        }

        ItemService.insertItem(req.app.get("db"), newItem)
            .then( data => {
                return res.status(201).end();
            })
    })

ItemRouter
    .route("/items/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res)=> {
        ItemService.getItemById(req.app.get("db"), req.params.id)
            .then( data => {
                if(!data){
                    return res.status(400).json({ error: "No item found."})
                };

                return res.status(200).send(data);
            })
    })
    .patch((req, res)=> {

        const {name, price} = req.body;

        const updateItem = {
            name,
            price
        };

        for(const [key, value] of Object.entries(updateItem)){

            if(value == null){
                return res.status(400).json({ error: `Missing ${key} in body request`});
            }

        }
        
        ItemService.updateItem( req.app.get("db"), updateItem, req.params.id)
            .then( data => {
                if(!data){
                    return res.status(400).json({ error: "No item found to update"});
                };

                return res.status(204).end();
            })
    })
    .delete((req, res)=> {
        ItemService.deleteItem( req.app.get("db"), req.params.id)
            .then( data => {
                if(!data){
                    return res.status(400).json({ error: "No item found"});
                };

                return res.status(204).end();
            })
    })

module.exports = ItemRouter;
