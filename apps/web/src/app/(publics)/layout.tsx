import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')?.value

  if (token) redirect('/')

  return <>{children}</>
}
