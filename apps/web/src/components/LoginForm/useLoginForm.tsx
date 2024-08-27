import { handlerLogin } from '@/app/actions/handlerLogin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from '../ui/use-toast'

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit((data) => {
    handlerLogin(JSON.stringify(data))
      .then(() => {
        toast({
          title: 'Login realizado com sucesso',
        })
      })
      .catch((err) => {
        console.log('🚀 ~ LoginPage ~ err:', err)
        toast({
          title: 'Erro ao logar',
          description: err.message,
        })
      })
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
