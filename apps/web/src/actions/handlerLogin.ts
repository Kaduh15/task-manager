'use server'

import { ONE_HOUR } from '@/constants'
import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const handlerLogin = createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  )
  .handler(async ({ input }) => {
    const { email, password } = input

    const response = await api.post('/auth/login', {
      email,
      password,
    })

    const {
      data: { token },
    } = response

    if (token) {
      cookies().set('token', token, {
        path: '/',
        maxAge: ONE_HOUR * 24,
        httpOnly: true,
      })
    }

    revalidatePath('/')
    redirect('/')
  })
