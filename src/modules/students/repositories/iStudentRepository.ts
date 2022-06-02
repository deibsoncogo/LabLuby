import { ICreateStudentDto } from "../dtos/iCreateStudentDto"
import { StudentEntity } from "../entities/studentEntity"

export interface IStudentRepository {
  findCpfStudent(cpf: number): Promise<StudentEntity>
  findEmailStudent(email: string): Promise<StudentEntity>

  createStudent(data: ICreateStudentDto): Promise<StudentEntity>
}
