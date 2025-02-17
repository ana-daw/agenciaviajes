import { Viaje } from "../models/Viaje.js";
import moment from "moment";
import { Testimonial } from "../models/Testimoniales.js";


const paginaInicio = async (req, res) => {

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));

    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }));

    //Consultar 3 viajes del modelo de Viaje
    try {
        const resultado = await Promise.all(promiseDB);


        res.render('inicio', {
            titulo: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
            moment: moment,
        });

    } catch (err) {
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
    try {
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    } catch (err) {
        console.log(err);
    }


}

const paginaDetalleViajes = async (req, res) => {
    try {
        const { slug } = req.params;
        const viaje = await Viaje.findOne({ where: { slug } });

        if (!viaje) {
            return res.redirect("/viajes");
        }

        res.render("viaje", {
            titulo: viaje.titulo,
            resultado: viaje,
            moment: moment
        });
    } catch (error) {
        console.log(error);
    }
};

const GuardarTestimonios = async (req, res) => {
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === "") {
        errores.push({ mensaje: "el nombre está vacío" });
    }
    if (correo.trim() === "") {
        errores.push({ mensaje: "el correo está vacío" });
    }
    if (mensaje.trim() === "") {
        errores.push({ mensaje: "el mensaje está vacío" });
    }

    if (errores.length > 0) {
        res.render('testimonios', {
            titulo: 'Testimonios',
            errores: errores,
            nombre,
            correo,
            mensaje: mensaje,
        });
    } else {
        try {

            await Testimonial.create({ nombre: nombre, correoelectronico: correo, mensaje: mensaje, });
            res.redirect('/testimonios'); //Guardo en la base de datos y lo envío a la misma vista
        } catch (error) {
            console.log(error);
        }
    }

};


const editarViajes = async (req, res) => {
    const { slug } = req.params;
    const viaje = await Viaje.findOne({ where: { slug } });
    if (!viaje) {
        return res.redirect("/viajes");
    }
    res.render("editar_viajes", {
        pagina: "Editar Viaje",
        ...viaje.dataValues, // con los ... pasamos un objeto con todas las propiedades de viaje
        fecha_ida: moment(viaje.fecha_ida).format("YYYY-MM-DD"), //formateamos previamente la fecha para que se asigne al valor del formulario
        fecha_vuelta: moment(viaje.fecha_vuelta).format("YYYY-MM-DD")
    });
};

const guardarEditarViajes = async (req, res) => {
    const { slug } = req.params;
    const { titulo, precio, disponibles, fecha_ida, fecha_vuelta, imagen, descripcion } = req.body;
    
    // Comprobamos errores
    const errores = [];

    if (titulo.trim() === "") {
        errores.push({ mensaje: "El título está vacío" });
    }
    if (precio.trim() === "") {
        errores.push({ mensaje: "El precio está vacío" });
    }
    if (disponibles.trim() === "") {
        errores.push({ mensaje: "El número de plazas disponibles está vacío" });
    }
    if (fecha_ida.trim() === "") {
        errores.push({ mensaje: "La fecha de ida está vacía" });
    }
    if (fecha_vuelta.trim() === "") {
        errores.push({ mensaje: "La fecha de vuelta está vacía" });
    }
    if (imagen.trim() === "") {
        errores.push({ mensaje: "La imagen está vacía" });
    }
    if (slug.trim() === "") {
        errores.push({ mensaje: "El slug está vacío" });
    }
    if (descripcion.trim() === "") {
        errores.push({ mensaje: "La descripción está vacía" });
    }

    if (errores.length > 0) {
        return res.render("editar_viajes", {
            pagina: "Editar Viaje",
            errores,
            moment,
            ...req.body
        });
    }

    try {
        const viaje = await Viaje.findOne({ where: { slug } });

        if (!viaje) {
            return res.redirect("/viajes");
        }

        await Viaje.update({
            titulo, precio, disponibles, fecha_ida, fecha_vuelta, imagen, descripcion
        }, { where: { id: viaje.id } });

        res.redirect("/viajes");
    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViajes,
    GuardarTestimonios,
    editarViajes,
    guardarEditarViajes
};  