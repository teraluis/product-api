require('../config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


// parse application/json
app.use(bodyParser.json())


app.post('/usuario/:id', function (req, res) {
    let body = req.body;
    if(body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        })
    }
    if(body.edad === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'la edad es necesario'
        })
    }
    let salida = {
        id: req.params.id,
        nombre: body.nombre,
        edad: body.edad,
        url: req.url
    };
    res.json(salida);
});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto :', process.env.PORT);
});
