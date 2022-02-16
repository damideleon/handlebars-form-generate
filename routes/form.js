const express = require('express');
const router = express.Router();
const controlSesion = require("../models/sessions");
const db = require("../db");

const signup = require("../models/signup");
const helpers = require('../helpers');
const { data } = require('jquery');
const ciudades = require('../models/ciudades');

/* GET users listing. */
router.get('/', function(req, res, next) {
    db.query("select * from signup where id = ?", [req.session.signupID], (err, result)=>{
        if(err)
            console.error(err.message)
        res.render('form' , result[0]);
    })
});

router.post("/", function(req, res, next) {
    console.log(req.body, req.session)
    
    if(req.body.pin == req.session.pin){
        req.session.verify = true;
        
        db.query(`INSERT INTO signup(tipo_registro, cedula, celular,
            status_id, created_at, updated_at) values (?,?,?,?,?,?) 
            on duplicate key update 
            tipo_registro=values(tipo_registro),
            celular=values(celular),
            status_id = values(status_id),
            updated_at=values(updated_at)`, 
        [
            req.body.tipo_registro,
            req.body.cedula,
            req.body.celular,
            signup.status_id.idPendiente,
            helpers.utcNowDbDate(),
            helpers.utcNowDbDate()
        ], (err, result, fields)=>{
            if(err)
                console.error(err.message)
            
           if(result.affectedRows > 0){
               req.session.signupID = result.insertId
            res.redirect('/registry');
           } 
        });
        
    } else {
        req.session.tries++;
        req.body.error = "PIN INCORRECTO"
        res.render('form', req.body);
    };


})

router.get("/registry", controlSesion, (req, res, next)=>{
    db.query("select * from signup where id = ?", [req.session.signupID], (err, result)=>{
        if(err)
            console.error(err.message)
        res.render('registry' , result[0]);
    })
    
}).post("/registry", function(req, res, next) {
    db.query("update signup set nombres=? , apellidos=?, fecha_nacimiento=? where id=?",
    [req.body.nombres, req.body.apellidos, req.body.fecha_nacimiento, req.session.signupID],
    (err, result)=>{
        if(err)
            console.error(err)
        console.log(result)
       if(result.affectedRows){
            res.redirect("/datos_comercio");
        }
    });

});

router.get("/datos_comercio", controlSesion, function(req, res, next) {
    db.query("select * from signup where id = ?", [req.session.signupID], (err, result)=>{
        if(err)
            console.error(err.message)
        res.render('comercio' , result[0]);
    })
}).post("/datos_comercio", controlSesion, function(req, res, next) {
        //console.log(req.body)
        db.query("update signup set razon_social=?, ruc=?, fecha_creacion=?,  updated_at=utc_timestamp() where id =?",
        [req.body.razon_social, req.body.ruc, req.fecha_creacion, req.session.signupID],
        (err, result)=>{
            if(err)
                console.error(err)
            if(result.affectedRows > 0){
                    res.redirect("/ubication");
            }
        });
});

router.get("/ubication", controlSesion, (req, res, next)=>{

    
    db.query("select * from signup where id = ?", [req.session.signupID], (err, result)=>{
        if(err)
            console.error(err.message)
        res.render('ubication' , data);
    })

}).post("/ubication", controlSesion, (req, res, next)=>{
    

    db.query(`update signup set 
    dir_calle=?, dir_numero=?, dir_extra=?, 
    ciudad_id=?, dir_gps_lon=? , dir_gps_lat=?, 
    dir_referencia=?, updated_at=utc_timestamp()
    where id =?`,
        
    [req.body.dir_calle
    , req.body.dir_numero
    , req.body.dir_extra
    , req.body.ciudad_id
    , req.body.dir_gps_lon
    , req.body.dir_gps_lat
    , req.body.dir_referencia
    , req.session.signupID],
    (err, result)=>{
        if(err)
            console.error(err)
        if(result.affectedRows > 0){
            res.redirect("/end");
        }
    });
    //console.log(req.body);
    //res.send("ok");
});
router.get("/end", controlSesion,function(req, res, next) {
    res.render("end")
});



module.exports = router;
