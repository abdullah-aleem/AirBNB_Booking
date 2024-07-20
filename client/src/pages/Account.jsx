import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Places from './Places'
import AccountNav from '../AcountNav'
function Account() {
  const [toHome, setToHome] = useState(false)
  const { user, ready, setUser } = useContext(UserContext)
  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }
  if (!ready) {
    return 'Loading....'
  }

  async function logout() {
    await axios.post('/logout')
    setToHome(true)
    setUser(null)

  }
  if (ready && !user && !toHome) {
    return <Navigate to={'/login'} />
  }
 
  
  return (
    <div>
      <AccountNav />    
      
        <div className='text-center max-w-lg mx-auto'>
          Logged in as : {user.name} ({user.email})
          <br />
          <button className='primary text-white px-2 rounded-full max-w-md mt-2' onClick={() => {
            logout()
          }}>
            Logout
          </button>
        </div>
   
      
    </div>
  )
}

export default Account