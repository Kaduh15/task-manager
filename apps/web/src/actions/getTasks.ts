'use server'

import { api } from '@/lib/api'
import { cookies } from 'next/headers'
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
  const response = await api
    .get<GetAllTAsksResponse>('/task', {
      headers: {
        Authorization: `Bearer ${cookies().get('token')?.value}`,
      },
    })
    .catch(() => {
      throw new Error('Error ao buscar tarefas')
    })

  return response.data
})
