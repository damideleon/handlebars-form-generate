var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

var form = {
    id: "form-1",
    action: "/",
    form_title: "Formulario de prueba",
    
    fields :[
        {
            id : "name",
            label : "Nombre",
            placeholder : "ingresar nombre",
            type : "text",
            require : true,
            column: "col-md-6",
            feedback : [{
                invalid : "ingresa un nombre",
                valid : "Está bien"
            }]
        },
        {
            id : "bday",
            label : "Fecha de nacimiento",
            placeholder : "",
            type : "date",
            require : true,
            column: "col-md-6",
            feedback : [{
                invalid : "Tu cumpleaños es requerido",
                valid : "Está bien"
            }]
        },
        {
            id : "password",
            label : "Contraseña",
            placeholder : "Ingresar contraseña",
            type : "password",
            require : true,
            column: "col-md-6",
            feedback : [{
                invalid : "Una contraseña es requerida",
                valid : "Está bien"
            }]
        },
        {
            id : "id_ciudad",
            label : "Ciudad",
            placeholder : "Seleccionar Ciudad",
            type : "select",
            items : [
                {
                    option : "Asuncion",
                    value : "1"
                },
                {
                    option : "Ciudad del Este",
                    value : "2"
                }
            ],
            require : true,
            column: "col-md-6",
            feedback : [{
                invalid : "Una contraseña es requerida",
                valid : "Está bien"
            }]
        },
        {
            id : "accept_terms",
            label : "Aceptar los términos y condiciones",
            placeholder : "Seleccionar Ciudad",
            type : "checkbox",
            require : true,
            column: "col-md-12",
            feedback : [{
                invalid : "Debes aceptar los términos y condiciones",
            }]
        },
    ],
    buttons : [
        {
            label: "Guardar",
            type: "submit",
            class : "success"

        },
        {
            label: "Cancelar",
            type: "reset",
            class : "secoundary"

        }
    ]
}

  res.render('form', form);
});

module.exports = router;
