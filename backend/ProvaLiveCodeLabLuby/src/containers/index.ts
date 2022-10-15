import { container } from "tsyringe"
import { IStudentRepository } from "../modules/students/repositories/iStudentRepository"
import { StudentRepository } from "../modules/students/repositories/studentRepository"

container.registerSingleton<IStudentRepository>("StudentRepository", StudentRepository)
