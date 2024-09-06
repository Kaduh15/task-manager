'use server'

import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const handlerRegister = createServerAction()
  .input(
    z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const { name, email, password } = input

    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    })

    if (response.status !== 201) {
      throw new Error('Erro ao criar conta')
    }

    const {
      data: { token },
    } = await api.post<{ token: string }>('/auth/login', {
      email,
      password,
    })

    if (token) {
      cookies().set('token', token, {
        path: '/',
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      })
    }

    redirect('/')
  })
