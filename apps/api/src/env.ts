import z from 'zod'

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url().default('file:./dev.db'),
    JWT_SECRET: z.string().default('secret'),
    URL_DEPLOY: z.string().url().default('http://localhost:3002'),
  })
  .parse(process.env)
