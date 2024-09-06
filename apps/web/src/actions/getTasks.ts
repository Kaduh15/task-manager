'use server'

import { api } from '@/lib/api'
import { createServerAction } from 'zsa'

export const getTasksAction = createServerAction().handler(async () => {
  const response = await api.get<{
    user: {
      id: string
      name: string
    }
    tasks: {
      id: string
      title: string
      completed: boolean
      createdAt: string
      updatedAt: string
      description: string
    }[]
  }>('/task')

  if (response.status !== 200) {
    throw new Error(
      `Erro ao buscar tarefas: ${response.status} ${response.statusText}`,
    )
  }

  return response.data
})
