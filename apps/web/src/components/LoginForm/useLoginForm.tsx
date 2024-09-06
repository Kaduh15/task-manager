import { handlerLogin } from '@/actions/handlerLogin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { useServerAction } from 'zsa-react'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Por favor, insira um email válido',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  }),
})

export type LoginFormData = z.infer<typeof LoginSchema>

export function useLoginForm() {
  const { toast } = useToast()
  const { execute } = useServerAction(handlerLogin, {
    onSuccess: () => {
      toast({
        title: 'Login realizado com sucesso',
      })
    },
    onError: ({ err }) => {
      toast({
        title: 'Erro ao logar',
        description: err.message,
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await execute({ email, password })
  })

  const emailError = errors.email?.message
  const passwordError = errors.password?.message

  return {
    register,
    onSubmit,
    emailError,
    passwordError,
  }
}
