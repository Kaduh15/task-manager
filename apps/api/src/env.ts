import z from 'zod'

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url().default('file:./dev.db'),
    JWT_SECRET: z.string().default('secret'),
  })
  .parse(process.env)
