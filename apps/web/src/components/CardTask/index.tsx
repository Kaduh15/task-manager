'use client'

import { toggleCompleteTaskAction } from '@/actions/toggleCompleteTask'
import { useServerAction } from 'zsa-react'
import { Checkbox } from '../ui/checkbox'
import { useToast } from '../ui/use-toast'
import { Pencil, Trash2 } from 'lucide-react'
import { deleteTaskAction } from '@/actions/deleteTask'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import { useCard } from './useCard'

export type CardTaskProps = {
  title: string
  isCompleted: boolean
  description: string
  id: string
}

export function CardTask({
  title,
  isCompleted,
  id,
  description,
}: CardTaskProps) {
  const {
    deleteTaskWrapper,
    handleEditTask,
    isPendingDelete,
    isPendingToggleCompleted,
    toggleCompleteTask,
  } = useCard({ id, isCompleted })

  return (
    <div
      data-completed={isCompleted}
      data-pending={isPendingToggleCompleted || isPendingDelete}
      className="group flex w-full cursor-pointer items-center gap-4 rounded-lg border p-4 hover:bg-gray-100 hover:text-zinc-900 data-[pending=true]:pointer-events-none data-[pending=true]:cursor-wait data-[pending=true]:bg-gray-200 data-[completed=true]:text-zinc-400 data-[completed=true]:hover:text-zinc-400"
    >
      <Checkbox
        className="size-5 border-2 hover:border-zinc-900 group-hover:border-zinc-900"
        checked={isCompleted}
        onCheckedChange={toggleCompleteTask}
        disabled={isPendingToggleCompleted}
        id={id}
      />
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor={id}
          className="cursor-pointer text-xl font-bold group-data-[completed=true]:text-zinc-400 group-data-[completed=true]:line-through"
        >
          {title}
        </label>
        {description && (
          <p className="w-[25ch] flex-1 truncate text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>
      <div className="flex size-fit flex-col gap-4">
        <Trash2
          onClick={deleteTaskWrapper}
          className="size-6 cursor-pointer rounded bg-zinc-300 p-1 text-zinc-900 hover:bg-zinc-800 hover:text-zinc-400"
        />
        <Pencil
          onClick={handleEditTask}
          className="size-6 cursor-pointer rounded bg-zinc-300 p-1 text-zinc-900 hover:bg-zinc-800 hover:text-zinc-400"
        />
      </div>
    </div>
  )
}
