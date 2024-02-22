import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'

function Account() {
 const {user,ready}=useContext(UserContext)
 let {subpage}=useParams()
 if (subpage=== undefined){
   subpage='profile'
 }
 if(!ready){
    return 'Loading....'
  }


  if(ready && !user){
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
 return (
    <div>
      <nav className='w-full flex mt-8 gap-2 justify-center'>
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
      
    </div>
  )
}

export default Account