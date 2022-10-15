import { Router } from 'express'
import { userRouter } from './userRouter'

export const indexRouter = Router()

indexRouter.get('/', (request, response) => response.status(200).json({ message: 'Hello word - Index' }))

indexRouter.use('/user', userRouter)
