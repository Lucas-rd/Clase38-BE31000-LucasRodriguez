import { Router } from "express";
import productRouter from "./product.routes.js"
import cartRouter from "./cart.routes.js"
import userRouter from "./user.routes.js"
import infoRouter from "./info.routes.js"
import logger from '../utils/logger.js';

const router = Router()

//Rutas Test-Info-Random
router.use("/", infoRouter)

//Rutas de User login-register
router.use("/user", userRouter)

//Rutas de Producto
router.use("/products", productRouter)

//Rutas de carritos
router.use("/carts", cartRouter)


//Rutas '*'
router.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default router