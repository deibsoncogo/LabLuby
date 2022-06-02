import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/', (request, response) => response.status(200).json('Hello word User'))
