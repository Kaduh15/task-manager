'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { createServerAction } from 'zsa'
import z from 'zod'

export const addTaskAction = createServerAction()
  .input(
    z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    const { title, description } = input
    const response = await api.post('/task', {
      title,
      description,
    })

    if (response.status !== 201) {
      throw new Error('Erro ao adicionar tarefa')
    }

    revalidatePath('/')
  })
