'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const editTaskAction = createServerAction()
  .input(
    z.object({
      id: z.string().cuid(),
      title: z.string().optional(),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    const { id, title, description } = input
    console.log('🚀 ~ .handler ~ { id, title, description }:', {
      id,
      title,
      description,
    })

    await api.put(`/task/${id}`, { title, description }).catch(() => {
      throw new Error('Erro ao atualizar tarefa')
    })

    revalidatePath('/')
    redirect('/')
  })
