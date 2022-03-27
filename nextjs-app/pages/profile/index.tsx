import React from 'react'
import AuthCheck from '../../components/authentication/AuthCheck'
import { auth } from '../../lib/setup/firebase'

const SpecificProfile = () => {
  return (
    <AuthCheck>
	    <p>Hello User</p>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </AuthCheck>
  )
}

export default SpecificProfile

