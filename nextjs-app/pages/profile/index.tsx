import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import MetaForProfile from '../../components/seo-tags/MetaForProfile'
import Sidebar from '../../components/ui/profile/Sidebar'
import { UserContext } from '../../lib/context/auth-context'
import { auth } from '../../lib/setup/firebase'

const SpecificProfile: NextPage = () => {
  const { user, extraInfo } = useContext(UserContext)
  const router = useRouter()

  const handleSignout = async () => {
    router.replace("/")
    await auth.signOut()
  }

  return (
    <>
      <MetaForProfile title="Profil - Oversigt" />
      <main className="h-screen flex flex-col bg-background">
        <AuthCheck>
          <section className="flex w-full h-full">
            <Sidebar />
            <article className="p-10 w-full overflow-y-auto">
              <h1 className="text-3xl font-thin">Hej {user?.displayName || extraInfo?.fullName || ""}</h1>
              <button onClick={handleSignout}>Sign Out</button>

            </article>
          </section>
        </AuthCheck>
      </main>
    </>
  )
}

export default SpecificProfile

