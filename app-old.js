const http = require('http');
const express =
http.createServer( (req, res) => {
   res.writeHead(200, {'Content-Type': 'application/json'});
   let salida = {
      nombre: 'luis',
      edad: 31,
      url: req.url
   };
   res.write(JSON.stringify(salida));
   res.end();
})
.listen(8080);

console.log("El puerto 8080");
