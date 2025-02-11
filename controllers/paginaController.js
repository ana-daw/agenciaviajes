import {Viaje} from "../models/Viaje.js";
import moment from "moment";
import {Testimonial} from "../models/Testimoniales.js";
import * as async_hooks from "node:async_hooks";

const paginaInicio = async (req, res) => {

    const promiseDB=[];

    promiseDB.push(Viaje.findAll({limit: 3}));

    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo de Viaje
    try{
     const resultado = await Promise.all(promiseDB);


    res.render('inicio', {
        titulo: 'Inicio',
        clase: 'home',
        viajes: resultado[0],
        testimonios: resultado[1],
        moment: moment,
    });

    }catch(err){
      console.log(err);
    }


}

const paginaNosotros = (req, res) => {
    const titulo = "Sobre Nosotros";  
    res.render('nosotros', {
        titulo,  
    });
};


const paginaViajes = async (req, res) => {
    const titulo = 'Viajes';
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        titulo,
        viajes,
        moment: moment
    });
};

const paginaTestimonios = async (req, res) => {
    try{
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    }catch(err){
        console.log(err);
    }


}

const paginaDetalleViajes = async (req, res) => {
    const{slug} = req.params;

    try{
        const resultado = await Viaje.findOne({where:{slug:slug}});

        res.render('viaje', {
            titulo: "Informacion del Viaje",
            resultado,
            moment: moment,
        });

    }catch(err){
        console.log(err);
    }
};

const GuardarTestimonios = async(req, res) => {
    const {nombre, correo, mensaje}= req.body;
    const errores = [];

    if (nombre.trim() ===""){
        errores.push({mensaje:"el nombre está vacío"});
    }
    if (correo.trim() ===""){
        errores.push({mensaje:"el correo está vacío"});
    }
    if (mensaje.trim() ===""){
        errores.push({mensaje:"el mensaje está vacío"});
    }

    if (errores.length > 0){
        res.render('testimonios', {
            titulo: 'Testimonios',
            errores:errores,
            nombre,
            correo,
            mensaje:mensaje,
        });
    }else{
        try{

            await Testimonial.create({nombre: nombre, correoelectronico: correo,mensaje: mensaje,});
            res.redirect('/testimonios'); //Guardo en la base de datos y lo envío a la misma vista
        }catch(error){
            console.log(error);
        }
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViajes,
    GuardarTestimonios
}