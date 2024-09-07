import { toggleCompleteTaskAction } from '@/actions/toggleCompleteTask'
import { useRouter } from 'next/navigation'
import { useServerAction } from 'zsa-react'
import { useToast } from '../ui/use-toast'
import { deleteTaskAction } from '@/actions/deleteTask'

type CardTaskProps = {
  id: string
  isCompleted: boolean
}

export function useCard({ id, isCompleted }: CardTaskProps) {
  const { toast } = useToast()
  const router = useRouter()

  const { execute: toggleCompleted, isPending: isPendingToggleCompleted } =
    useServerAction(toggleCompleteTaskAction, {
      onSuccess: () => {
        toast({
          title: 'Tarefa marcada como completa',
        })
      },
      onError: (error) => {
        toast({
          title: 'Erro ao marcar tarefa como completa',
          description: error.err.message,
        })
      },
    })

  const { execute: deleteTask, isPending: isPendingDelete } = useServerAction(
    deleteTaskAction,
    {
      onSuccess: () => {
        toast({
          title: 'Tarefa deletada com sucesso',
        })
      },
      onError: (error) => {
        toast({
          title: 'Erro ao deletar tarefa',
          description: error.err.message,
        })
      },
    },
  )

  async function toggleCompleteTask() {
    await toggleCompleted({ id, completed: isCompleted })
  }

  async function deleteTaskWrapper() {
    await deleteTask({ id })
  }

  async function handleEditTask() {
    router.push(`/?modalEdit=${id}`)
  }

  return {
    toggleCompleteTask,
    deleteTaskWrapper,
    handleEditTask,
    isPendingToggleCompleted,
    isPendingDelete,
  }
}
