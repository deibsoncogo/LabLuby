import express from "express"
import setupMiddlewares from "./middleware"
import setupRouters from "./router"

const app = express()

setupMiddlewares(app)
setupRouters(app)

export default app
