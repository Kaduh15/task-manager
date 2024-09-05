import { NextFunction, Request, Response } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'

import { env } from '@/env'
import prisma from '@/libs/prisma'
import { BadRequestError, NotFoundError } from '@/utils/http-errors'

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ').at(-1)
  if (!token) throw new NotFoundError('token not found')

  try {
    const payload = verify(token, env.JWT_SECRET)

    if (!payload.sub) throw new NotFoundError('user not found')

    if (typeof payload.sub !== 'string') {
      throw new BadRequestError('Invalid token')
    }

    const hasUser = prisma.user.findUnique({
      where: { id: payload.sub },
    })

    if (!hasUser) throw new NotFoundError('user not found')

    req.user = payload as JwtPayload

    return next()
  } catch (error) {
    throw new BadRequestError('Invalid token')
  }
}
