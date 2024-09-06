'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addTaskAction } from '@/actions/addTask'
import { useToast } from '../ui/use-toast'
import { useServerAction } from 'zsa-react'

const addTaskSchema = z.object({
  title: z.string().min(3, 'Deve conter no mínimo 3 caracteres'),
  description: z.string().optional(),
})

type AddTaskFormData = z.infer<typeof addTaskSchema>

export function AddTaskForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
  })

  const { execute, isPending } = useServerAction(addTaskAction, {
    onError: ({ err }) => {
      toast({
        title: 'Erro ao adicionar tarefa',
        description: err.message,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Tarefa adicionada com sucesso',
      })

      reset()
    },
  })
  const { toast } = useToast()

  const onSubmit = handleSubmit(async ({ title, description }) => {
    await execute({
      title,
      description,
    })
  })

  const tileErrors = errors.title?.message
  const descriptionErrors = errors.description?.message

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-card p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Adicionar Tarefa</h2>
      <div className="space-y-4">
        <Input
          disabled={isPending}
          placeholder="Titulo da Tarefa"
          {...register('title')}
        />
        {tileErrors && <p className="text-error">{tileErrors}</p>}
        <Textarea
          placeholder="Descrição da Tarefa"
          disabled={isPending}
          {...register('description')}
        />
        {descriptionErrors && <p className="text-error">{descriptionErrors}</p>}
        <Button disabled={isPending}>Add Task</Button>
      </div>
    </form>
  )
}
