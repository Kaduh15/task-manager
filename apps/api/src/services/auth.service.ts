import { User } from '@prisma/client'
import { compareSync, hashSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { env } from '@/env'
import prisma from '@/libs/prisma'
import { ConflictError } from '@/utils/http-errors'

export type CreateUser = Pick<User, 'email' | 'password' | 'name'>

export type LoginUser = Pick<User, 'email' | 'password'>

export class AuthService {
  num: number = 0

  async login({ email, password }: LoginUser) {
    console.log(email, password)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new ConflictError('Email or password is invalid')
    }

    const isValidPassword = compareSync(password, user.password)
    console.log('🚀 ~ AuthService ~ login ~ isValidPassword:', isValidPassword)

    if (!isValidPassword) {
      throw new ConflictError('Email or password is invalid')
    }

    const token = sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return { token }
  }

  async register({ email, name, password }: CreateUser) {
    console.log(email, name, password)

    const hasEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (hasEmail) {
      throw new ConflictError('Email is already in use')
    }

    const hasPassword = hashSync(password, 10)

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hasPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return createdUser
  }
}
