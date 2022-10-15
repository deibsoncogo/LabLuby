import { Router } from "express"
import { CreateStudentController } from "./useCases/createStudent/createStudentController"

export const studentRouter = Router()

studentRouter.post("/", new CreateStudentController().handle)
