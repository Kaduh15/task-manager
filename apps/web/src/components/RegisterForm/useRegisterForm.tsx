import { handlerRegister } from '@/actions/handlerRegister'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import { useServerAction } from 'zsa-react'

export const registerSchema = z.object({
  email: z.string().email({
    message: 'Por favor, insira um email válido',
  }),
  password: z.string().min(8, {
    message: 'A senha deve ter no mínimo 8 caracteres',
  }),
  name: z.string().min(3, {
    message: 'O nome deve ter no mínimo 3 caracteres',
  }),
})

export type RegisterFormData = z.infer<typeof registerSchema>

export function useRegisterForm() {
  const { toast } = useToast()
  const { execute, isPending } = useServerAction(handlerRegister, {
    onSuccess: () => {
      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Agora você pode fazer login',
      })
    },
    onError: ({ err }) => {
      toast({
        title: 'Erro ao cadastrar',
        description: err.message,
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit(async ({ email, password, name }) => {
    await execute({ email, password, name })
  })

  const emailError = errors.email?.message
  const passwordError = errors.password?.message
  const nameError = errors.name?.message

  return {
    register,
    onSubmit,
    emailError,
    passwordError,
    nameError,
    isPending,
  }
}
