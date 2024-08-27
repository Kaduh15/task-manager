'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useLoginForm } from './useLoginForm'
import Link from 'next/link'

export function LoginForm() {
  const { register, onSubmit, emailError, passwordError } = useLoginForm()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12 text-start">
      <form
        className="relative flex w-96 flex-col gap-10 rounded-lg border-2 border-dashed p-6 text-start"
        onSubmit={onSubmit}
      >
        <h1 className="absolute -top-8 left-6 text-3xl font-bold">Login</h1>
        <div className="flex flex-col items-start justify-center gap-2">
          <Label htmlFor="email">Email:</Label>
          <Input
            className="data-[error='true']:border-red-500"
            data-error={Boolean(emailError)}
            id="email"
            placeholder="email@example.com"
            type="email"
            autoComplete="off"
            {...register('email')}
          />

          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <Label htmlFor="password">Senha:</Label>
          <Input
            className="data-[error='true']:border-red-500"
            data-error={Boolean(passwordError)}
            id="password"
            placeholder="********"
            type="password"
            autoComplete="off"
            {...register('password')}
          />

          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
        </div>
        <Button type="submit">Login</Button>
        <Link
          className="text-sm text-blue-500 hover:text-blue-300"
          href="/register"
        >
          Criar conta
        </Link>
      </form>
    </main>
  )
}
