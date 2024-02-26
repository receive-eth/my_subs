import { Router, Request, Response } from 'express'
import AuthController from 'controllers/auth.controller/auth.controller'
import { validateRequestBody } from '@/middlewares/validateRequestBody'
import { checkAccess } from '@/middlewares/checkAccess'

const authRouter = Router()

authRouter.post(
    '/login',
    validateRequestBody(['email', 'password']),
    AuthController.login,
)

authRouter.post(
    '/registration',
    validateRequestBody(['email', 'password']),
    AuthController.registration,
)

authRouter.get('/refresh', AuthController.refresh)

authRouter.post('/logout', AuthController.logout)

authRouter.get('/protected', checkAccess, (req: Request, res: Response) => {
    res.status(201).json({ status: 'success' })
})

export default authRouter
