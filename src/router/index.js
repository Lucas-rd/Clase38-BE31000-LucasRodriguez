import passport from 'passport';
import { Router } from "express";
import { productsTest } from "../controller/testController.js";
import productRouter from "./product.routes.js"
import cartRouter from "./cart.routes.js"
import { loginController, loginPostController, logOutController, loginErrorController  } from "../controller/loginController.js";
import { registerController, registerPostController, registerErrorController } from "../controller/registerController.js";
import { logginMiddleware } from "../middleware/logginMiddleware.js";
import { infoController } from '../controller/infoController.js';
import { randomsController } from '../controller/randomsController.js';
import logger from '../utils/logger.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = Router()

//Rutas Test-Info-Random
router.get('/products-test', productsTest)
router.get('/info', infoController)
router.get('/randoms', randomsController)
router.get("/hola", (req, res) => {
    res.send("hoola".repeat(1000000))
})
//Rutas de register
router.get('/register', registerController)
router.post('/register', upload.single("userAvatar"), passport.authenticate("register", { failureRedirect: "/api/registerError" }), registerPostController)
router.get('/registerError', registerErrorController)

//Rutas Login-Loguot
router.get('/login', loginController)
router.post('/login', passport.authenticate("login", { failureRedirect: "/api/loginError" }), loginPostController )
router.get('/logout', logginMiddleware, logOutController)
router.get('/loginError', loginErrorController)

//Rutas de Producto
router.use("/products", productRouter)

//Rutas de carritos
router.use("/carts", cartRouter)


//Rutas '*'
router.get('*', (req, res) => { logger.warn(`Ruta ${req.url} con metodo ${req.method} no implementadas en el servidor.`) })

export default router