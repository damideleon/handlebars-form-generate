[
    {
        id : "name",
        label : "Nombre",
        placeholder : "ingresar nombre",
        type : "text",
        require : true,
        column: "col-md-6",
        feedback : {
            invalid : "ingresa un nombre",
            valid : "Está bien"
        }
    },
    {
        id : "bday",
        label : "Fecha de nacimiento",
        placeholder : "",
        type : "date",
        require : true,
        column: "col-md-6",
        feedback : {
            invalid : "Tu cumpleaños es requerido",
            valid : "Está bien"
        }
    },
    {
        id : "password",
        label : "Contraseña",
        placeholder : "Ingresar contraseña",
        type : "password",
        require : true,
        column: "col-md-6",
        feedback : {
            invalid : "Una contraseña es requerida",
            valid : "Está bien"
        }
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
        feedback : {
            invalid : "Una contraseña es requerida",
            valid : "Está bien"
        }
    },
    {
        id : "accept_terms",
        label : "Aceptar los términos y condiciones",
        type : "checkbox",
        require : true,
        column: "col-md-12",
        feedback : [{
            invalid : "Debes aceptar los términos y condiciones",
        }]
    },
]


let formbuild = (opt) => {
    let id = opt.id || "form-build-"
    let action = opt.action || "/"
    let form_title = opt.form_title || "Formulario de prueba"
    let fields = opt.fields ?? [];

    form = ""

    fields.map(crearcampos);

    let crearcampos = (campo) => {
        switch(campo.type){
            //<input type="checkbox">
            case "checkbox":
                return checkbox(campo);
            //<input type="color">
            case "color":
                break;
            //<input type="date">
            case "date":
                break;
            //<input type="email">
            case "email":
                break;
            //<input type="file">
            case "file":
                break;
            //<input type="hidden">
            case "hidden":
                break;
            //<input type="number">
            case "number":
                break;
            //<input type="password">
            case "password":
                break;
            //<input type="radio">
            case "radio":
                break;
            //<input type="range">
            case "range":
                break;
            //<input type="tel">
            case "tel":
                break;
            //<input type="text">
            case "text":
                break;
            //<input type="url">
            case "url":
                break;
        }
        
    function checkbox(opt){
        var messages = "";
        if(opt.mesages.valid){
            messages += 
            `<div class="valid-feedback">
                ${opt.message.valid}
            </div>`
        }

        if(opt.mesages.valid){
            messages += 
            `<div class="invalid-feedback">
                ${opt.message.invalid}
            </div>`
        }

        layout = `<div class="col-${opt.column ?? "md-12"}">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${opt.value ?? ""}" id="${opt.id}" ${opt.require}>
          <label class="form-check-label" for="invalidCheck">
            ${opt.label}
          </label>
            ${messages ?? ""}
        </div>
      </div>`
    }
        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

        

    }

};