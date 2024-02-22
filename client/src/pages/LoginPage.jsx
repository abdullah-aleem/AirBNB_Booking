import React, { useContext, useState } from 'react'
import Header from '../Header'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../UserContext';
function LoginPage() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false);
  const {setUser,ready,user}=useContext(UserContext)
  async function handleLogin(e){
    console.log('inside')
      e.preventDefault();
      try{
        const {data}=await axios.post('/login',{email,password})
        setUser(data)
        setRedirect(true)
        alert('Login Successfull')
      }catch(e){
        alert('Could not Log you in!');
      }
     
  }
  
  if (redirect || (ready && user)){
    return <Navigate to={'/'}/>
  }
  return (

    <div className='mt-4 grow flex items-center justify-around'>
        <div className='-mt-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto ' onSubmit={handleLogin}>
        <input type='email' placeholder='your@email.com' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type='password' placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button className='primary'>Login</button>
        <div className='text-center py-2 text-gray-500'>
            Don't have an account yet? <Link className='underline text-black' to={'/register'}>Register Now</Link>
        </div>
        </form>
        </div>
     
        </div>
  )
}

export default LoginPage