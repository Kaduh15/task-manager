'use client'

import { handlerLogout } from '@/app/actions/handlerLogout'
import { Button } from '../ui/button'

export function Header() {
  return (
    <header className="bg-primary px-6 py-4 text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <Button
          onClick={async () => await handlerLogout()}
          variant="outline"
          className="ml-auto text-white"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
