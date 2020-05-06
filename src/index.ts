//import { Request, Response, Application, NextFunction } from 'express';


var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// Conexión Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient: true})
  .then(() => {
      console.log("La conexión a la base de datos minimo1 se ha realizado correctamente!!!!");

      // Crear servidor
      app.listen(port, () =>{
        console.log("Servidor corriendo en http://localhost:3800");
      });
  })
  .catch((err:any) => console.log(err));




/* // eslint-disable-next-line
const express = require('express');


// eslint-disable-next-line
const app: Application = express();

// Allow any method from any host and log requests
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

// Handle POST requests that come in formatted as JSON
app.use(express.json());


// A default hello word route
app.get('/', (_: Request, res: Response): void => {
  res.send({ hello: 'world' });
});

// Start our server on port 4201
app.listen(4201, '127.0.0.1', function(): void {
  console.log('Server now listening on 4201');
}); */
