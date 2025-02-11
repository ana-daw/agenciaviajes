import express from 'express';
import router from './routers/index.js'; // Asegúrate de que este archivo exporta algo válido
import db from './config/db.js';
import bodyParser from 'body-parser';


const app = express(); // Crear la instancia de Express


//Conectar a la Base de Datos
db.authenticate()
    .then( ()=> console.log('Conectado a la base de datos') )
    .catch( err => console.log(err) );


const port = process.env.PORT || 4000;

//habiliar pug
app.set('view engine', 'pug');

// Middleware para analizar datos de formularios (application/x-www-form-urlencoded)
//el servidor esté configurado para analizar los datos del formulario. En Express,//
app.use(express.urlencoded({ extended: true }));

// Middleware global para definir el año
app.use((req, res, next) => {
    const year = new Date().getFullYear();
    res.locals.year = year; // Esto agrega el año a res.locals
    res.locals.nombreP = 'Agencia de Viajes';
    next(); // Llamamos a next() para pasar al siguiente middleware o ruta
});

//definir la carpeta
app.use(express.static('public'));

// Middleware de rutas
app.use('/', router); // Asume que `router` es un objeto Router de Express

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: http://localhost:${port}`);
});

