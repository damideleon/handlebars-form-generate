var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const dotenv = require('dotenv');
const helpers = require('../helpers');
dotenv.config();



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const secret = process.env.TWILIO_SECRET;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;



router.post('/sendpin/:number', function (req, res, next) {
    destinatario = helpers.normalizePYnumber(req.params.number);

    if (!destinatario.pass) {
        res.json({
            "error": true,
            "message": "numero inválido"
        });
    }


    if (req.session.tries) {
        req.session.tries++
    } else {
        req.session.id = crypto.randomUUID();
        req.session.pin = crypto.randomInt(1000, 9999);;
        req.session.tries = 1;
        req.session.verify = false;
    }
    //for tests
    

    if (req.session.tries > 3) {
        req.session = null;
        req.body.error = "Se ha intendado muchas veces el PIN, verifique el número de teléfono, y reenvie"
        res.render("form", req.body);
    } else {
        /*
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
            .create({
                body: 'a ' + pin,
                from: twilio_number,
                to: destinatario.msisdn
            })
            .then(message => {
                res.json({
                    "enviado": true,
                    "estado": message.status,
                    session: req.session
                });
            });*/
            res.json({pass:true})
    }
    
});

module.exports = router;