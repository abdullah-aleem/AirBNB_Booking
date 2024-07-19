import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Register() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    async function regUser(event){
        event.preventDefault();
        try{
          await axios.post('/register',{name,email,password});
          alert('Registration is Succesfull')
        }catch(e){
          alert('Registration Failed.Try again later')
        }
       
    }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
    <div className='-mt-64'>
    <h1 className='text-4xl text-center mb-4'>Register</h1>
    <form className='max-w-md mx-auto ' onSubmit={regUser}>

    <input type='text' placeholder='username' value={name} onChange={e=> setName(e.target.value)}/>
    <input type='email' placeholder='your@email.com' value={email} onChange={e=> setEmail(e.target.value)}/>
    <input type='password' placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}/>
    <button className='primary' >Register</button>
    <div className='text-center py-2 text-gray-500'>
        Already Have an Account? <Link className='underline text-black' to={'/login'}>Login</Link>
    </div>
    </form>
    </div>
 
    </div>  
  ) 
}

export default Register