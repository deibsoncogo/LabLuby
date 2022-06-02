import { getRepository, Repository } from "typeorm"
import { StudentEntity } from "../entities/studentEntity"
import { IStudentRepository } from "./iStudentRepository"

export class StudentRepository implements IStudentRepository {
  private studentRepository: Repository<StudentEntity>

  constructor() { this.studentRepository = getRepository(StudentEntity) }

  example(): Promise<object> {
    throw new Error("Method not implemented.")
  }
}
