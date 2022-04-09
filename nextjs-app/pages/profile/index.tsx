import AuthCheck from '../../components/authentication/AuthCheck'
import ProfileNavbar from '../../components/ui/profile/ProfileNavbar'
import Sidebar from '../../components/ui/profile/sidebar'
import { auth } from '../../lib/setup/firebase'

const SpecificProfile = () => {

  return (
    <main className="h-screen flex flex-col bg-slate-200">
      <ProfileNavbar />
      <AuthCheck>
        <section className="flex w-full h-full">
          <Sidebar />
          <article>
            <p>Hello User</p>
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </article>
        </section>
      </AuthCheck >
    </main>
  )
}

export default SpecificProfile

