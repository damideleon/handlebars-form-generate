var express = require('express');
var router = express.Router();
var controlSesion = require("../models/sessions");
var db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('form');
});

router.post("/", function(req, res, next) {
    if(req.body.pin == req.session.pin){
        req.session.verified = true;
        db.query("INSERT INTO singnup(tipo_registro"
        + " , cedula"
        + " , celular"
        + " )");

        
        res.redirect('/registry')
    } else {
        req.session.tries++;
        res.json({
            "error": true,
            "message": "PIN INCORRECTO"
        })
    };


})

router.get("/registry", controlSesion, (req, res, next)=>{
    res.render('registry');
}).post("/registry", function(req, res, next) {
    console.log(req.session)
    //console.log(req.body)
    //res.render('comercio');

})

router.post("/datos_comercio", function(req, res, next) {
        console.log(req.session)
        //console.log(req.body)
        res.render('ubication');
});

router.post("/photos", function(req, res, next) {
    console.log(req.session)
    //console.log(req.body)
    res.render('photos');
});




module.exports = router;
