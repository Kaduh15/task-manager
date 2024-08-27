'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function handlerLogin(data: string) {
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .parse(JSON.parse(data))

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
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    })
  }

  revalidatePath('/')
  redirect('/')
}
