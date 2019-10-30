require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthSerice = {
    getEmployeeById(db, id){
        return db.select("*").from("employees").where({id}).first();
    },
    hashPin(pin){
      return bcrypt.hash(pin, 12);  
    },
    comparePin(pin, hash){
        return bcrypt.compare(pin, hash);
    },
    createJwt(subject, payload){
        return jwt.sign(payload, 
            process.env.JWT_SECRET, {
                subject,
                algorithm: "HS256"
            });
    },
    verifyJwt(token){
        return jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"]
        });
    }
};

module.exports = AuthSerice;