const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");
const data = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/data.json"), "utf-8"));

module.exports = {
    index: (req, res) => res.render("index"),

    send: (req, res) => {

        let errors = validationResult(req);

        if(errors.isEmpty()){
            
            const {name, color, email, age, recordar} = req.body
           
           req.session.user = {
                name: name,
                email: email,
                color: color,
                age: age
            }
            if(recordar){

                res.cookie("cook", req.session.user, {maxAge:10000*60})
            }
            return res.redirect("/")

        }else{
            res.render("index", {errors: errors.mapped(), old: req.body})
        }
        
    },

    next: (req, res) => {
        return res.render("bienvenido")
    },

    olvidar: (req, res) => {
        req.session.destroy();
        res.cookie("cook", null, {maxAge: -1})
        return res.redirect("/")
    }
}