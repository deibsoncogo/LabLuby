import { Router } from 'express'
import { CreateUserController } from '../modules/users/useCases/createUser/createUserController'
import { FindUserController } from '../modules/users/useCases/findUser/findUserController'
import { FindUsersController } from '../modules/users/useCases/findUsers/findUsersController'

export const userRouter = Router()

userRouter.post('/', new CreateUserController().handle)
userRouter.get('/', new FindUsersController().handle)
userRouter.get('/:id', new FindUserController().handle)
