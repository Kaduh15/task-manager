import { Router } from 'express'

import { AuthController } from '@/controllers/auth.controller'
import { AuthService } from '@/services/auth.service'

const authService = new AuthService()
const authController = new AuthController(authService)

const authRouter: Router = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

export { authRouter }
