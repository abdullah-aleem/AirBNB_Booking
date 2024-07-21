import  React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AcountNav from '../AcountNav'
import axios from 'axios'
function Places() {
    const [places, setPlaces] = useState([])
    useEffect(() => {

        axios.get('/places/user').then(data => {
            console.log(data)
            setPlaces(data.data)
        })
    }, [])




    return (
        <div>   
            <AcountNav />
            <div className='text-center'>
                <div className='flex flex-col justify-center items-center w-full'>
                    
                    {places.length > 0 && places.map(place=>{
                        return (
                            <Link key={place._id} className='flex gap-4 border p-2 rounded-lg mt-2 bg-gray-300 text-left w-2/3' to={"/acounts/places/"+place._id}>
                                {place.photos.length>0?<img className='w-32 h-32 rounded-xl' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="img" />: <div className='w-23 h-32 rounded-xl bg-gray-800'  ></div> }
                               <div>
                               <h1>{place.title}</h1>
                               <p>{place.description}</p>
                               </div>
                            </Link>
                        )
                    })}
                </div>
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