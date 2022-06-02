import { Request, Response } from 'express'
import { container } from 'tsyringe'
import * as yup from 'yup'
import { AppError } from '../../../../errors/appError'
import { YupSetLocale } from '../../../../utils/yupSetLocale'
import { ICreateUserDto } from '../../dtos/iCreateUserDto'
import { CreateUserService } from './createUserService'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateUserDto = request.body

    try {
      YupSetLocale()

      await yup.object().shape({
        name: yup.string().required().min(3).max(255),
        cpf: yup.number().required(),
        email: yup.string().required().email(),
        password: yup.string().required().min(6).max(100)
          .matches(/[0-9]{2,}/gm, 'A senha deve possuir pelo menos dois números')
          .matches(/[a-z]{2,}/gm, 'A senha deve possuir pelo menos duas letras minusculas')
          .matches(/[A-Z]{2,}/gm, 'A senha deve possuir pelo menos duas letras maiúsculas'),
      }).validate(request.body, { abortEarly: true })
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422)
    }

    const createUserService = container.resolve(CreateUserService)

    return response.status(201).json(
      await createUserService.execute(data),
    )
  }
}
