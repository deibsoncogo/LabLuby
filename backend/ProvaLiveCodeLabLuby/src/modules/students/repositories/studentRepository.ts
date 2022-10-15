import { getRepository, Repository } from "typeorm"
import { AppError } from "../../../errors/appError"
import { ICreateStudentDto } from "../dtos/iCreateStudentDto"
import { StudentEntity } from "../entities/studentEntity"
import { IStudentRepository } from "./iStudentRepository"

export class StudentRepository implements IStudentRepository {
  private studentRepository: Repository<StudentEntity>

  constructor() { this.studentRepository = getRepository(StudentEntity) }

  async findCpfStudent(cpf: number): Promise<StudentEntity> {
    const cpfFindOne = await this.studentRepository.findOne({ cpf })

    if (!cpfFindOne) {
      throw new AppError("Não foi encontrado um estudante com este CPF", 404)
    }

    return cpfFindOne
  }

  async findEmailStudent(email: string): Promise<StudentEntity> {
    const emailFindOne = await this.studentRepository.findOne({ email })

    if (!emailFindOne) {
      throw new AppError("Não foi encontrado um estudante com este email", 404)
    }

    return emailFindOne
  }

  async createStudent(data: ICreateStudentDto): Promise<StudentEntity> {
    const studentCreate = this.studentRepository.create(data)

    if (!studentCreate) {
      throw new AppError("Erro inesperado ao criar o usuário", 500)
    }

    const studentSave = await this.studentRepository.save(studentCreate)

    if (!studentSave) {
      throw new AppError("Erro inesperado ao salvar o usuário", 500)
    }

    return studentSave
  }
}
