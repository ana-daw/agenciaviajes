import express, {json} from 'express';
import { paginaInicio, paginaNosotros , paginaViajes , paginaTestimonios , paginaDetalleViajes , GuardarTestimonios,editarViajes, guardarEditarViajes} from "../controllers/paginaController.js";

const router = express.Router();

router.get("/", paginaInicio);
router.get("/nosotros", paginaNosotros);
router.get("/viajes", paginaViajes);
router.get("/testimonios", paginaTestimonios);
router.get("/viajes/:slug", paginaDetalleViajes);
router.get("/editar/:slug", editarViajes);
router.get("/viajes/editar/:slug", editarViajes);
router.post("/viajes/editar/:slug", guardarEditarViajes);



router.post("/testimonios" , GuardarTestimonios);

export default router;