'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import z from 'zod'
import { createServerAction } from 'zsa'

export const addTaskAction = createServerAction()
  .input(
    z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    const { title, description } = input

    await api
      .post(
        '/task',
        {
          title,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies().get('token')?.value}`,
          },
        },
      )
      .catch(() => {
        throw new Error('Erro ao adicionar tarefa')
      })

    revalidatePath('/')
  })
