import { Router } from 'express'

import { TaskController } from '@/controllers/task.controller'
import authMiddleware from '@/middlewares/auth.middleware'
import { TaskService } from '@/services/task.service'

const taskService = new TaskService()
const taskController = new TaskController(taskService)

const taskRouter: Router = Router()

taskRouter.use(authMiddleware)

taskRouter.get('/', taskController.getAll)
taskRouter.get('/:id', taskController.getById)
taskRouter.post('/', taskController.create)
taskRouter.put('/:id/un-completed', taskController.unCompleted)
taskRouter.put('/:id/completed', taskController.completed)
taskRouter.put('/:id', taskController.update)
taskRouter.delete('/', taskController.delete)

export { taskRouter }
