import { Router } from "express"
import productsRoutes from "./products.routes"
import categoriesRoutes from "./categories.routes"
import ordersRoutes from "./orders.routes"

const router = Router()

router.use("/products", productsRoutes)
router.use("/categories", categoriesRoutes)
router.use("/orders", ordersRoutes)

export default router
