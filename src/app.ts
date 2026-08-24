import express from "express"
import cors from "cors"
import routes from "./routes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", routes)
app.get("/health", (req, res) => res.json({ status: "ok" }))

app.use(errorHandler)

export default app
