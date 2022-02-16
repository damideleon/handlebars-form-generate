const db = require('../db')

module.exports = {
    cities: () => {
        db.query("select id, nombre from ciudades", [], (err, rows, fields) => {
            if (err) throw err;
            return rows[0]
        })
    }

}