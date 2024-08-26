import { Task } from '@prisma/client'

import prisma from '@/libs/prisma'
import { ForbiddenError, NotFoundError } from '@/utils/http-errors'

export type CreateTask = Pick<Task, 'title' | 'description'> & {
  userId: string
}

export type UpdateTask = Omit<Partial<Task>, 'createdAt' | 'updatedAt'>

export type GetTaskById = Pick<Task, 'id' | 'userId'>

export class TaskService {
  getAll = async (id: string) => {
    const tasks = await prisma.task.findMany({
      where: { userId: id },
    })

    return tasks
  }

  getById = async ({ userId, id }: GetTaskById) => {
    const task = await prisma.task.findUnique({
      where: { userId, id },
    })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    return task
  }

  create = async ({ description = null, title, userId }: CreateTask) => {
    const task = await prisma.task.create({
      data: { description, title, userId },
    })

    return task
  }

  update = async ({ userId, id, ...task }: UpdateTask) => {
    const hasTask = await prisma.task.findUnique({
      where: { id, userId },
    })

    if (!hasTask) {
      throw new NotFoundError('Task not found')
    }

    if (hasTask.userId !== userId) {
      throw new ForbiddenError('You are not allowed to update this task')
    }

    const updatedTask = await prisma.task.update({
      data: task,
      where: { id, userId },
    })

    return updatedTask
  }

  completed = async ({ id, userId }: { id: string; userId: string }) => {
    const task = await prisma.task.findUnique({
      where: { id, userId },
    })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    if (task.completed) {
      return task
    }

    task.completed = true

    await prisma.task.update({
      data: { completed: true },
      where: { id, userId },
    })

    return task
  }

  unCompleted = async ({ id, userId }: { id: string; userId: string }) => {
    const task = await prisma.task.findUnique({
      where: { id, userId },
    })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    if (!task.completed) {
      return task
    }

    task.completed = false

    await prisma.task.update({
      data: { completed: false },
      where: { id, userId },
    })

    return task
  }

  delete = async (id: string) => {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    await prisma.task.delete({
      where: { id },
    })
  }
}
