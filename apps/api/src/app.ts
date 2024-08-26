import cors from 'cors'
import express from 'express'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import 'express-async-errors'

import errorMiddleware from '@/middlewares/error.middleware'
import loggerMiddleware from '@/middlewares/logger.middleware'
import * as routes from '@/routes'

const swaggerPath = path.resolve(__dirname, './docs/swagger.yml')
const swaggerDocument = YAML.load(swaggerPath)

class App {
  public app: express.Express

  constructor() {
    this.app = express()

    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    )
    this.app.use(express.json())
    this.app.use(loggerMiddleware)
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  }

  private routes(): void {
    this.app.get('/docs', swaggerUi.setup(swaggerDocument))

    this.app.get('/', (_req, res) => {
      res.status(200).json({ Hello: 'world!' })
    })

    this.app.use('/api/auth', routes.authRouter)
    this.app.use('/api/task', routes.taskRouter)

    this.app.use('*', (_req, res) => {
      res.status(404).json({ message: 'Not found' })
    })

    this.app.use(errorMiddleware)
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
  }
}

export { App }

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App()
