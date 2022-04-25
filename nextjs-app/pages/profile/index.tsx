import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import ProfileNavbar from '../../components/ui/profile/ProfileNavbar'
import Sidebar from '../../components/ui/profile/Sidebar'
import { UserContext } from '../../lib/context/auth-context'
import { auth } from '../../lib/setup/firebase'

const SpecificProfile = () => {
  const { user } = useContext(UserContext)
  const router = useRouter()

  const handleSignout = async () => {
    await auth.signOut()
    router.replace("/")
  }

  return (
    <main className="h-screen flex flex-col bg-slate-200">
      <AuthCheck>
        <ProfileNavbar />
        <section className="flex w-full h-full">
          <Sidebar />
          <article>
            <p>Hello {user?.displayName}</p>
            <button onClick={handleSignout}>Sign Out</button>
          </article>
        </section>
      </AuthCheck>
    </main>
  )
}

export default SpecificProfile

