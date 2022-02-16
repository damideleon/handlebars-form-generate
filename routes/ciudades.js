const express = require('express');
const router = express.Router();
const controlSesion = require("../models/sessions");
const db = require("../db");

const signup = require("../models/signup");
const helpers = require('../helpers');

/* GET users listing. */
router.get('/', controlSesion, function(req, res, next) {
    db.query("select id, nombre from ciudades", [], (err, rows) => {
        if (err) throw err;
        res.render('lists/ciudades', {layout:false, cities : rows});
    })
});


module.exports = router;
