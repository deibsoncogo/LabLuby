import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FindUsersService } from './findUsersService'

export class FindUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findUsersService = container.resolve(FindUsersService)

    return response.status(200).json(
      await findUsersService.execute(),
    )
  }
}
