import { Request, Response } from 'express'
import z from 'zod'

import { TaskService } from '@/services/task.service'
import { ForbiddenError } from '@/utils/http-errors'
import { HttpStatus } from '@/utils/http-status'

export class TaskController {
  private readonly taskService: TaskService

  constructor(taskService: TaskService) {
    this.taskService = taskService
  }

  getAll = async (req: Request, res: Response) => {
    const payload = req.user

    const tasks = await this.taskService.getAll(payload?.sub || '')

    return res.status(HttpStatus.OK).json(tasks)
  }

  getById = async (req: Request, res: Response) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const { sub: userId } = req.user as { sub: string }

    const task = await this.taskService.getById({ id, userId })

    return res.status(HttpStatus.OK).json(task)
  }

  create = async (req: Request, res: Response) => {
    const payload = z
      .object({
        title: z.string(),
        description: z.string().optional(),
      })
      .parse(req.body)

    const { title, description = null } = payload
    const { sub: userId } = req.user as { sub: string }

    const task = await this.taskService.create({ title, description, userId })

    return res.status(HttpStatus.CREATED).json(task)
  }

  update = async (req: Request, res: Response) => {
    const body = z
      .object({
        title: z.string(),
        description: z.string().optional(),
        completed: z.boolean().optional(),
      })
      .parse(req.body)

    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const { sub: userId } = req.user as { sub: string }

    if (!userId) {
      throw new ForbiddenError('You are not allowed to update this task')
    }

    const task = await this.taskService.update({
      ...body,
      userId,
      id,
    })

    return res.status(HttpStatus.OK).json(task)
  }

  completed = async (req: Request, res: Response) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const { sub: userId } = req.user as { sub: string }

    const task = await this.taskService.completed({ id, userId })

    return res.status(HttpStatus.OK).json(task)
  }

  unCompleted = async (req: Request, res: Response) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const { sub: userId } = req.user as { sub: string }

    const task = await this.taskService.unCompleted({ id, userId })

    return res.status(HttpStatus.OK).json(task)
  }

  delete = async (req: Request, res: Response) => {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(req.params)

    const { sub: userId } = req.user as { sub: string }

    if (!userId) {
      throw new ForbiddenError('You are not allowed to delete this task')
    }

    await this.taskService.delete({ id, userId })

    return res.sendStatus(HttpStatus.NO_CONTENT)
  }
}
