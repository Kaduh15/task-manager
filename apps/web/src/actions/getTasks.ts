'use server'

import { api } from '@/lib/api'
import { createServerAction } from 'zsa'

export type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
  description: string
}

export type GetAllTAsksResponse = {
  user: {
    id: string
    name: string
  }
  tasks: Task[]
}

export const getTasksAction = createServerAction().handler(async () => {
  const response = await api.get<GetAllTAsksResponse>('/task').catch(() => {
    throw new Error('Error ao buscar tarefas')
  })

  return response.data
})
