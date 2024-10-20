const http = require("http");
const express = require("express"); //Import de Express y HTTP para establecer el servidor

const productos = require("../routes/productos"); //Import productos Routes
const app = express(); //Instancia de  express
app.use(express.json()); //Le dice a la instancia de Express que usara JSON

app.use("/productos", productos); //Establece el uso de Router para "Productos"
//Es decir que toda direccion http://localhost:3000/productos, utiliza este router

app.use("/", function (req, res) {
  //Define un endpoint para el acceso basico al servidor en la ruta http://localhost:3000/
  res.send("EstÃ¡ funcionando");
});

const server = http.createServer(app); //Crea el server con Http y pasa Express para los parametros del servidor
const port = 3000;
server.listen(port); //El server escucha en el puerto 3000
console.debug("AplicaciÃ³n funcionando en " + port);
