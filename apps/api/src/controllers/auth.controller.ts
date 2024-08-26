import { Request, Response } from 'express'
import z from 'zod'

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

    const user = await this.authService.login({ email, password })

    return res.status(HttpStatus.OK).json(user)
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

    res.status(HttpStatus.CREATED).json(user)
  }
}
