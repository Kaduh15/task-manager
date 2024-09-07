'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const deleteTaskAction = createServerAction()
  .input(z.object({ id: z.string().cuid() }))
  .handler(async ({ input }) => {
    const { id } = input

    await api.delete(`/task/${id}`).catch(() => {
      throw new Error('Erro ao deletar tarefa')
    })

    revalidatePath('/')
  })
