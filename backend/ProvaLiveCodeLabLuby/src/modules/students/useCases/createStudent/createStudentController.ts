import { Request, Response } from "express"
import { container } from "tsyringe"
import * as yup from "yup"
import { AppError } from "../../../../errors/appError"
import { YupSetLocale } from "../../../../utils/yupSetLocale"
import { ICreateStudentDto } from "../../dtos/iCreateStudentDto"
import { CreateStudentService } from "./createStudentService"

export class CreateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateStudentDto = request.body

    try {
      YupSetLocale()

      await yup.object().shape({
        name: yup.string().required(),
        phone: yup.number().required().positive().integer(),
        email: yup.string().required().email(),
        motherName: yup.string().required(),
        cpf: yup.number().required().positive().integer(),
      }).validate(request.body, { abortEarly: true })
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422)
    }

    const createStudentService = container.resolve(CreateStudentService)

    return response.status(201).json(
      await createStudentService.execute(data),
    )
  }
}
