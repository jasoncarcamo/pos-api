require("dotenv").config();
const app = require("./app");
const knex = require("knex");


const db = knex({
    client: "pg",
    connection: process.env.DATABASE_URL
});

app.set("db", db);

app.listen(8000, ()=>{
    console.log("Listening on port 8000!");
});
