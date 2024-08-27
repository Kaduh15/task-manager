'use server'

import { api } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function handlerAddTask(data: string) {
  const { description, title } = z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .parse(JSON.parse(data))

  const response = await api.post('/task', {
    title,
    description,
  })

  if (response.status !== 201) {
    throw new Error('Erro ao adicionar tarefa')
  }

  revalidatePath('/')
}
