'use client'

import { Task } from '@/actions/getTasks'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { useServerAction } from 'zsa-react'
import { editTaskAction } from '@/actions/editTask'

type ModalEditTaskProps = {
  taskEditId: string
  task?: Task
}

const editFormSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})

type EditForm = z.infer<typeof editFormSchema>

export function ModalEditTask({ taskEditId, task }: ModalEditTaskProps) {
  const router = useRouter()
  const { execute: editTask } = useServerAction(editTaskAction)

  const form = useForm<EditForm>({
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
    },
    resolver: zodResolver(editFormSchema),
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    const { title, description } = data

    await editTask({ id: taskEditId, title, description })
  })

  if (!taskEditId || !task) {
    return null
  }

  return (
    <>
      <div className="fixed inset-0 z-10 bg-black/50" aria-hidden="true" />
      <div
        className="fixed inset-0 z-20 flex items-center justify-center"
        aria-modal="true"
        role="dialog"
      >
        <div className="flex h-fit w-1/2 flex-col gap-4 rounded-lg border bg-zinc-950 p-4 text-zinc-400">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-200">Editar tarefa</h2>
            <Button
              variant="link"
              className="right-2 top-2 size-fit self-end p-1 text-zinc-400 hover:text-zinc-200"
              aria-label="Fechar"
            >
              <X
                className="text-zinc-50"
                onClick={async () => {
                  router.push('/')
                }}
              />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Label htmlFor="title">Nome</Label>
            <Input
              className="text-zinc-100"
              placeholder="Nome da tarefa"
              {...form.register('title')}
            />
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              className="h-9 text-zinc-100"
              placeholder="Descrição da tarefa"
              {...form.register('description')}
            />
            <Button type="submit" className="mt-4">
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
