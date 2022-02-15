var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
    if(req.session && req.session.verify){
        next()
    } else {
        res.redirect('/form');
    }
});

module.exports = router;