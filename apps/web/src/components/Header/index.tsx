'use client'

import { ModeToggle } from '../toggle-theme'
import { Button } from '../ui/button'
import { useHeader } from './useHeader'

export function Header() {
  const { handleLogout, isPending } = useHeader()

  return (
    <header className="bg-primary px-6 py-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <Button
          disabled={isPending}
          onClick={handleLogout}
          variant="secondary"
          className="ml-auto"
        >
          Logout
        </Button>

        <ModeToggle />
      </div>
    </header>
  )
}
