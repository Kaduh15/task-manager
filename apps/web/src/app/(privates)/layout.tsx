import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')?.value

  if (!token) return redirect('/login')

  return children
}
