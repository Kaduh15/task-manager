import { getTasksAction } from '@/actions/getTasks'
import { AddTaskForm } from '@/components/AddTaskForm'
import { CardTask } from '@/components/CardTask'
import { Header } from '@/components/Header'

export default async function Home() {
  const [data] = await getTasksAction()

  const tasks = data?.tasks ?? []

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
              isCompleted={task.completed}
              date={new Date(task.createdAt)}
            />
          ))}
        </div>
      </main>
    </>
  )
}
