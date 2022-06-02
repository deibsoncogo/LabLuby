import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController'

export const userRouter = Router()

userRouter.post('/', new CreateUserController().handle)
