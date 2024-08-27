import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AddTaskForm } from '@/components/AddTaskForm'
import { CardTask } from '@/components/CardTask'
import { Header } from '@/components/Header'
import { api } from '@/lib/api'

export default async function Home() {
  const token = cookies().get('token')?.value

  if (!token) return redirect('/login')

  try {
    const response = await api.get<
      {
        userId: number
        id: number
        title: string
        completed: boolean
        createdAt: string
        updatedAt: string
        description: string
      }[]
    >('/task', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status !== 200) {
      throw new Error(
        `Erro ao buscar tarefas: ${response.status} ${response.statusText}`,
      )
    }

    const tasks = response.data.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.completed,
      date: new Date(task.createdAt),
    }))

    return (
      <>
        <Header />
        <main className="flex flex-col justify-center gap-4 p-4">
          <AddTaskForm />
          <div>Tarefas: {tasks.length}</div>
          <div className="flex w-full flex-col items-center justify-center gap-4">
            {tasks.map((task) => (
              <CardTask
                key={task.id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                date={new Date(task.date)}
              />
            ))}
          </div>
        </main>
      </>
    )
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error)
    throw error
  }
}
