import { checkRole } from '@/utils/roles'
import { redirect } from 'next/navigation'

export default async function UserDashboard() {
    // Protect the page from users who are admins
  const isAdmin = await checkRole('admin')
  if (isAdmin) {
    redirect('/')
  }

  return (
    <div>
      <p>This is the user dashboard. Hello User!</p>
    </div>
  )
}
