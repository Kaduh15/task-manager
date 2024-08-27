'use client'

import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { handlerAddTask } from '@/app/actions/handlerAddTask'
import { useToast } from '../ui/use-toast'

const addTaskSchema = z.object({
  title: z.string().min(3, 'Deve conter no mínimo 3 caracteres'),
  description: z
    .string()
    .min(4, 'Deve conter no mínimo 4 caracteres')
    .optional(),
})

type AddTaskFormData = z.infer<typeof addTaskSchema>

export function AddTaskForm() {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
  })

  const onSubmit = handleSubmit((data) => {
    handlerAddTask(JSON.stringify(data))
      .then(() => {
        toast({
          title: 'Tarefa adicionada com sucesso',
        })
      })
      .catch((err) => {
        console.log('🚀 ~ AddTaskForm ~ err:', err)
        toast({
          title: 'Erro ao adicionar tarefa',
          description: err.message,
        })
      })
  })

  const tileErrors = errors.title?.message
  const descriptionErrors = errors.description?.message

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-card p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Adicionar Tarefa</h2>
      <div className="space-y-4">
        <Input placeholder="Titulo da Tarefa" {...register('title')} />
        {tileErrors && <p className="text-error">{tileErrors}</p>}
        <Textarea
          placeholder="Descrição da Tarefa"
          {...register('description')}
        />
        {descriptionErrors && <p className="text-error">{descriptionErrors}</p>}
        <Button>Add Task</Button>
      </div>
    </form>
  )
}
