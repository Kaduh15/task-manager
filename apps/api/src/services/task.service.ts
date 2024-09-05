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
      include: { user: true },
    })

    if (!tasks) {
      throw new NotFoundError('User not found')
    }

    const { user, tasks: tasksData } = tasks.reduce(
      (acc, task, index) => {
        if (index === 0) {
          acc.user = {
            id: task.user.id,
            name: task.user.name,
          }
        }

        acc.tasks.push({
          tile: task.title,
          description: task.description,
          completed: task.completed,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        })

        return acc
      },
      {
        user: { id: '', name: '' },
        tasks: [] as {
          tile: string
          description: string | null
          completed: boolean
          createdAt: Date
          updatedAt: Date
        }[],
      },
    )

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      tasks: tasksData,
    }
  }

  getById = async ({ userId, id }: GetTaskById) => {
    const task = await prisma.task.findUnique({
      where: { userId, id },
      include: { user: true },
    })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    const { title, description, completed, createdAt, updatedAt, user } = task

    return {
      title,
      description,
      completed,
      createdAt,
      updatedAt,
      user: {
        id: user.id,
        name: user.name,
      },
    }
  }

  create = async ({ description = null, title, userId }: CreateTask) => {
    const task = await prisma.task.create({
      data: { description, title, userId },
      include: { user: true },
    })

    const { completed, createdAt, updatedAt, user } = task

    return {
      title,
      description,
      completed,
      createdAt,
      updatedAt,
      user: {
        id: user.id,
        name: user.name,
      },
    }
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
      include: { user: true },
    })

    const { completed, createdAt, updatedAt, user } = updatedTask

    return {
      title: updatedTask.title,
      description: updatedTask.description,
      completed,
      createdAt,
      updatedAt,
      user: {
        id: user.id,
        name: user.name,
      },
    }
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

  delete = async ({ id, userId }: { id: string; userId: string }) => {
    const task = await prisma.task.findUnique({
      where: { id, userId },
    })

    if (!task) {
      throw new NotFoundError('Task not found')
    }

    await prisma.task.delete({
      where: { id },
    })
  }
}
