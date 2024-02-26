import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
function Account() {
  const [toHome,setToHome]=useState(false)
 const {user,ready,setUser}=useContext(UserContext)
 let {subpage}=useParams()
 if (subpage=== undefined){
   subpage='profile'
 }
 if(!ready){
    return 'Loading....'
  }

  async function logout(){
    await axios.post('/logout')
      setToHome(true)
      setUser(null)
      
  }
  if(ready && !user && !toHome){
    return <Navigate to={'/login'}/>
  }

  function linkClass(type=null){
    if(subpage===type ){
      return 'py-2 px-8 bg-primary text-white rounded-full'
    }
    else{
      return 'py-2 px-8'
    }
  }
  if(toHome){
    return(
      <Navigate to={'/'}/>
    )
  }
 return (
    <div>
      <nav className='w-full flex mt-8 gap-2 justify-center mb-8'>
      <Link className={linkClass('profile')} to={'/account'}>
        My Profile
      </Link>
      <Link className={linkClass('bookings')} to={'/account/bookings'}>
        My Bookings
      </Link>
      <Link className={linkClass('places')} to={'/account/places'}>
        My Accommodations
      </Link>
      </nav>
      { subpage==='profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as : {user.name} ({user.email})
          <br />
          <button className='primary text-white px-2 rounded-full max-w-md mt-2' onClick={()=>{
            logout()
          }}>
          Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Account