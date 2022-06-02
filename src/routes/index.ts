import { Router } from "express"
import { studentRouter } from "../modules/students/studentRoute"

export const indexRouter = Router()

indexRouter.get("/", (request, response) => response.status(200).json("Hello word"))
indexRouter.use("/student", studentRouter)
