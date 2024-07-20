import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Account from './Account'
import AcountNav from '../AcountNav'
import axios from 'axios'
function Places() {
        useEffect(()=>{
            
        axios.get('/places/user').then(data=>{
            console.log(data)
        })
        },[])


    
   
    return (
        <div>
            <AcountNav   />
           <div className='text-center'>
                list of all the previous places you own
                <br />
                <Link className=" inline-flex bg-primary text-white px-6 py-2 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add New Place
                </Link>

            </div>
            

        </div>
    )
}

export default Places