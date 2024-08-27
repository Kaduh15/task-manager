import { handlerRegister } from '@/app/actions/handlerRegister'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = handleSubmit((data) => {
    handlerRegister(JSON.stringify(data))
      .then(() => {
        toast({
          title: 'Cadastro realizado com sucesso',
          description: 'Agora você pode fazer login',
        })
      })
      .catch((err) => {
        console.log('🚀 ~ RegisterPage ~ err:', err)
        toast({
          title: 'Erro ao cadastrar',
          description: err.message,
        })
      })
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
  }
}
