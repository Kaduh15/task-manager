import { getTasksAction } from '@/actions/getTasks'
import { AddTaskForm } from '@/components/AddTaskForm'
import { CardTask } from '@/components/CardTask'
import { Header } from '@/components/Header'
import { ModalEditTask } from '@/components/ModalEditTask'

type HomeProps = {
  searchParams: {
    modalEdit: string
  }
}

export default async function Home(props: HomeProps) {
  const [data] = await getTasksAction()
  const tasks = data?.tasks ?? []
  const totalTasks = data?.tasks.length ?? 0
  const totalCompletedTasks =
    data?.tasks.filter((task) => task.completed).length ?? 0
  const task = tasks.find((task) => task.id === props.searchParams.modalEdit)

  return (
    <>
      {task && (
        <ModalEditTask taskEditId={props.searchParams.modalEdit} task={task} />
      )}
      <Header />
      <main className="flex max-w-screen-lg flex-col justify-center gap-4 px-10 py-5">
        <AddTaskForm />
        <div className="flex justify-between">
          <p>Tarefas: {totalTasks}</p>
          <p>
            Completadas:{' '}
            {totalCompletedTasks === 0
              ? '0'
              : `${totalCompletedTasks} de ${totalTasks}`}
          </p>
        </div>
        <hr />
        <div className="flex w-full flex-col items-center justify-center gap-4">
          {tasks.map((task) => (
            <CardTask
              id={task.id}
              key={task.id}
              title={task.title}
              isCompleted={task.completed}
              description={task.description}
            />
          ))}
        </div>
      </main>
    </>
  )
}
