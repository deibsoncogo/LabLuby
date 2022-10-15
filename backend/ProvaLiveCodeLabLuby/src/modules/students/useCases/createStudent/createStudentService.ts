import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/appError"
import { ICreateStudentDto } from "../../dtos/iCreateStudentDto"
import { StudentEntity } from "../../entities/studentEntity"
import { IStudentRepository } from "../../repositories/iStudentRepository"

@injectable()
export class CreateStudentService {
  constructor(@inject("StudentRepository") private studentRepository: IStudentRepository) {}

  async execute(data: ICreateStudentDto): Promise<StudentEntity> {
    const emailAlreadyExists = await this.studentRepository.findEmailStudent(data.email)

    if (emailAlreadyExists) {
      throw new AppError("Já existe um estudante com este email cadastrado", 409)
    }

    const cpfAlreadyExists = await this.studentRepository.findCpfStudent(data.cpf)

    if (cpfAlreadyExists) {
      throw new AppError("Já existe um estudante com este CPF cadastrado", 409)
    }

    const student = await this.studentRepository.createStudent(data)

    return student
  }
}
