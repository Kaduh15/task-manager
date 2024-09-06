'use client'

import { logoutAction } from '@/actions/handlerLogout'
import { useServerAction } from 'zsa-react'
import { useToast } from '../ui/use-toast'

export function useHeader() {
  const { toast } = useToast()
  const { execute, isPending } = useServerAction(logoutAction, {
    onSuccess: () => {
      toast({
        title: 'Logout realizado com sucesso',
      })
    },
    onError: ({ err }) => {
      toast({
        title: 'Erro ao sair da conta',
        description: err.message,
      })
    },
  })

  async function handleLogout() {
    await execute()
  }

  return {
    handleLogout,
    isPending,
  }
}
