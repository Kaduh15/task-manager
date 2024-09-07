'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { createServerAction } from 'zsa'

export const toggleCompleteTaskAction = createServerAction()
  .input(z.object({ id: z.string().cuid(), completed: z.boolean() }))
  .handler(async ({ input }) => {
    const { id, completed } = input

    await api
      .put(`/task/${id}/${completed ? 'un-completed' : 'completed'}`, null, {
        headers: {
          Authorization: `Bearer ${cookies().get('token')?.value}`,
        },
      })
      .catch(() => {
        throw new Error(
          `Error ao ${completed ? 'desmarcar' : 'marcar'} tarefa como completa`,
        )
      })

    revalidatePath('/')
  })
