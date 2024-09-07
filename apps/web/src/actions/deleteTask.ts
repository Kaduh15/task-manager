'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const deleteTaskAction = createServerAction()
  .input(z.object({ id: z.string().cuid() }))
  .handler(async ({ input }) => {
    const { id } = input

    await api
      .delete(`/task/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies().get('token')?.value}`,
        },
      })
      .catch(() => {
        throw new Error('Erro ao deletar tarefa')
      })

    revalidatePath('/')
  })
