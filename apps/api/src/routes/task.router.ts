import { Router } from 'express'

import { TaskController } from '@/controllers/task.controller'
import authMiddleware from '@/middlewares/auth.middleware'
import { TaskService } from '@/services/task.service'

const taskService = new TaskService()
const taskController = new TaskController(taskService)

const taskRouter: Router = Router()

taskRouter.get('/', authMiddleware, taskController.getAll)
taskRouter.get('/:id', authMiddleware, taskController.getById)
taskRouter.post('/', authMiddleware, taskController.create)
taskRouter.put('/:id/un-completed', authMiddleware, taskController.completed)
taskRouter.put('/:id/completed', authMiddleware, taskController.completed)
taskRouter.put('/:id', authMiddleware, taskController.update)
taskRouter.delete('/', authMiddleware, taskController.delete)

export { taskRouter }
