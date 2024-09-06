'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

import { useRegisterForm } from './useRegisterForm'
import Link from 'next/link'

export function RegisterForm() {
  const {
    register,
    onSubmit,
    emailError,
    passwordError,
    nameError,
    isPending,
  } = useRegisterForm()

  return (
    <form
      className="relative flex w-96 flex-col gap-10 rounded-lg border-2 border-dashed p-6 text-start"
      onSubmit={onSubmit}
    >
      <h1 className="absolute -top-8 left-6 text-3xl font-bold">Register</h1>
      <div className="flex flex-col items-start justify-center gap-2">
        <Label htmlFor="name">Nome:</Label>
        <Input
          className="data-[error='true']:border-red-500"
          data-error={Boolean(nameError)}
          id="name"
          placeholder="João Silva"
          type="name"
          autoComplete="off"
          disabled={isPending}
          {...register('name')}
        />

        {emailError && <p className="text-sm text-red-500">{emailError}</p>}
      </div>
      <div className="flex flex-col items-start justify-center gap-2">
        <Label htmlFor="email">Email:</Label>
        <Input
          className="data-[error='true']:border-red-500"
          data-error={Boolean(emailError)}
          id="email"
          placeholder="email@example.com"
          type="email"
          autoComplete="off"
          disabled={isPending}
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
          disabled={isPending}
          {...register('password')}
        />

        {passwordError && (
          <p className="text-sm text-red-500">{passwordError}</p>
        )}
      </div>
      <Button disabled={isPending} type="submit">
        Register
      </Button>
      <Link className="text-sm text-blue-500 hover:text-blue-300" href="/login">
        Já tem conta?
      </Link>
    </form>
  )
}
