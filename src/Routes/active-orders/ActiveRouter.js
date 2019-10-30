const express = require("express");
const ActiveRouter = express.Router();
const ActiveService = require("./ActiveService"); 

ActiveRouter
    .route("/active-orders")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res) => {
        ActiveService.getActiveOrders(req.app.get("db"))
            .then( orders => res.status(200).json({data: orders}))
    })
    .post((req, res)=>{
        console.log(req.body);
        ActiveService.insertActiveOrder(req.app.get("db"), req.body)
            .then( data => {
                return res.status(201).send();
            })
    })


ActiveRouter
    .route("/active-orders/:id")
    .all(express.json())
    .all(express.urlencoded({ extended: true}))
    .get((req, res) => {

    })
    .patch((req, res)=> {
        ActiveService.updateActiveOrder(req.app.get("db"), req.body, req.params.id)
            .then( data => res.status(204).end());
    })
    .delete((req, res)=>{
        ActiveService.deleteActiveOrder(req.app.get("db"), req.params.id)
            .then( data => {
                return res.status(204).end();
            })
    })


module.exports = ActiveRouter;