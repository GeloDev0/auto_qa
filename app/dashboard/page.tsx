import { syncUserWithDatabase } from "@/lib/clerk-sync";
import prisma from "@/lib/db"

export default async function Dashboard() {
  // Sync user data whenever they access the dashboard
  await syncUserWithDatabase();;

  return (
    <div>
      <h1 className='text-3xl font-bold'>welcome, John</h1>
      <p className='text-gray-500 mt-1'>manage your test cases and codes</p>
    </div>

    
  )
}
