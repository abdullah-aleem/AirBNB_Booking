import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AcountNav from '../AcountNav'
import axios from 'axios'
import Loading from '../Loading'

function Places() {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)
    const [change, setChange] = useState(false)
    useEffect(() => {

        axios.get('/places/user').then(data => {
            console.log(data)


            setPlaces(data.data)
            setLoading(false);

        })
    }, [change])
    const deletePlace = (ev) => {

        console.log(ev.target)
        axios.delete('/places/' + ev.target.value).then(data => {
            console.log(data)
            setChange(!change)

        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <div>
            <AcountNav />
            <div className='text-center'>
                <div className='flex flex-col justify-center items-center w-full'>
                    {loading ? <Loading /> : null}
                    {places.length > 0 && places.map(place => {
                        return (
                            <div key={places._id} className='relative flex gap-4 border p-2 rounded-3xl mt-2 bg-gray-300 text-left w-2/3'>
                                <Link
                                    key={place._id}
                                    to={"/account/places/" + place._id}
                                    className='flex p-2 gap-4 flex-grow'
                                >
                                    {place.photos.length > 0 ? (
                                        <img
                                            className='w-32 h-32 rounded-xl'
                                            src={'http://localhost:4000/uploads/' + place.photos[0]}
                                            alt="img"
                                        />
                                    ) : (
                                        <div className='w-32 h-32 rounded-xl bg-gray-800'></div>
                                    )}
                                    <div>
                                        <h1 className='text-2xl '>{place.title}</h1>
                                        <p className='text-sm '>{place.description}</p>
                                    </div>
                                </Link>
                                <button
                                    className='absolute top-2 right-2 z-10 text-red-500  p-2 rounded-lg'
                                    value={place._id}
                                    onClick={(e) => {
                                        e.preventDefault(); // Prevent default behavior
                                        deletePlace(e);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>
                            </div>
                        )
                    })}
                </div>
                <br />
                <Link className=" inline-flex bg-primary text-white px-6 py-2 rounded-full " to={'/account/places/new'}>
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