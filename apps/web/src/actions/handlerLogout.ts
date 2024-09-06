'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerAction } from 'zsa'

export const logoutAction = createServerAction().handler(async () => {
  cookies().set('token', '', {
    path: '/',
    maxAge: -1,
    httpOnly: true,
  })

  redirect('/')
})
