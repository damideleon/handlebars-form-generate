var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const dotenv = require('dotenv');
const helpers = require('../helpers');
const { report } = require('process');
dotenv.config();



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const secret = process.env.TWILIO_SECRET;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio_number = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);

router
.post('/sendpin/:number', function(req, res, next) {
    destinatario = helpers.normalizePYnumber(req.params.number);

    if(!destinatario)
        res.json({"error": true, "message": "numero inválido"});

    var pin = crypto.randomInt(1000, 9999);
    
    if(req.session.tries){
        req.session.tries++
        req.session.pin = pin;
    } else {
        req.session.id = crypto.randomUUID();
        req.session.pin = pin;
        req.session.verification = false;
        req.session.tries = 1;
        req.session.verified = false;
    }

    
    

    if(req.session.tries > 3){
        req.session = null;
        res.json({"error": true, "message": "Intente luego de un minuto"});
    }

    client.messages
      .create({body: 'a '+ pin, from: twilio_number, to: destinatario.msisdn})
      .then(message => {
          res.json({"enviado": true, "estado": message.status, session: req.session});
      });
  });

module.exports = router;
