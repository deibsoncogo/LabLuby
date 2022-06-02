import { Request, Response } from 'express'
import { container } from 'tsyringe'
import * as yup from 'yup'
import { AppError } from '../../../../errors/appError'
import { YupSetLocale } from '../../../../utils/yupSetLocale'
import { FindUserService } from './findUserService'

export class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    try {
      YupSetLocale()

      await yup.object().shape({ id: yup.string().required().uuid() })
        .validate(request.params, { abortEarly: true })
    } catch (error) {
      throw new AppError({ item: error.path, description: error.errors[0] }, 422)
    }

    const findUserService = container.resolve(FindUserService)

    return response.status(200).json(
      await findUserService.execute({ id }),
    )
  }
}
