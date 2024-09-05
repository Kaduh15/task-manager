import { Request, Response } from 'express'
import z from 'zod'

import { ONE_HOUR } from '@/constants'
import { AuthService } from '@/services/auth.service'
import { HttpStatus } from '@/utils/http-status'

export class AuthController {
  private readonly authService: AuthService

  constructor(authService: AuthService) {
    this.authService = authService
  }

  login = async (req: Request, res: Response) => {
    const payload = z
      .object({
        email: z.string().email('Digite um email válido'),
        password: z
          .string()
          .min(8, 'Digite uma senha com no mínimo 8 caracteres'),
      })
      .parse(req.body)

    const { email, password } = payload

    const { token } = await this.authService.login({ email, password })

    res.cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_HOUR * 1000),
      path: '/',
    })

    return res.status(HttpStatus.OK).json({ token })
  }

  register = async (req: Request, res: Response) => {
    const payload = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(3),
      })
      .parse(req.body)

    const { email, password, name } = payload

    const user = await this.authService.register({ email, password, name })

    res.cookie('access_token', user.token, {
      httpOnly: true,
      expires: new Date(Date.now() + ONE_HOUR * 1000),
      path: '/',
    })

    res.status(HttpStatus.CREATED).json(user)
  }
}
