const express = require('express');
const app = express();

app.get('/', function (req, res) {

    let salida = {
        nombre: 'luis',
        edad: 31,
        url: req.url
    };
    res.send(salida);
});

app.listen(3000, () => {
    console.log('Escuchando peticiones en el puerto');
});
