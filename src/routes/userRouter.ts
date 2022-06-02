import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController'
import { FindUsersController } from '../modules/users/useCases/findUsers/findUsersController'

export const userRouter = Router()

userRouter.post('/', new CreateUserController().handle)
userRouter.get('/', new FindUsersController().handle)
