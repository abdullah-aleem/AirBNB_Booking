import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from '../Perks';
import axios from 'axios';
import UploadPhoto from '../UploadPhoto';
function Places() {
    const { action } = useParams();
    const [title,setTitle]=useState('');
    const [address,setAdress]=useState('');
    const [addedPhoto,setAddedPhoto]=useState([]);
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState('');
    const [redirect,setRedirect]=useState('')
    async function addNewPlace(ev){
        ev.preventDefault()
        const placeData={title,address,addedPhoto,description,perks,extraInfo,checkIn,checkOut,maxGuests}
        axios.post('/places',placeData).then(data=>{
            
            console.log(data)
            setRedirect("/account/places")

        })

    }
    function preinput(header,text){
        return(
            <>
            <h2 className='text-xl mt-4 '>{header}</h2>
            <p className='text-gray-500 text-sm'>{text}</p>
            </>
        )
    }
    

    if (redirect){
        return (
            
            <Navigate to={redirect} />
           
        )
    }
    console.log(action)
    return (
        <div>
            {action !== 'new' && <div className='text-center'>
                <Link className=" inline-flex bg-primary text-white px-6 py-2 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    Add New Place
                </Link>

            </div>}
            {
                action === 'new' && (
                    <div>
                        <form onSubmit={addNewPlace}>
                            {preinput('Title','Title for your place should be short and catchy')}        
                            <input type='text' value={title} onChange={e=> setTitle(e.target.value)} placeholder='title,for example "lonely Place"' />
                            {preinput('Address','Address to your place.')}
                            <input type='text' value={address} onChange={e=> setAdress(e.target.value)} placeholder='address' />
                            {preinput('Photos','more===better')}               
                            <div className='flex gap-2 w-full'>
                            <UploadPhoto addedPhoto={addedPhoto} setAddedPhoto={setAddedPhoto}/>
                            </div>
                            {preinput('Description','Description of your place')}
                            <textarea className='' value={description} onChange={e=> setDescription(e.target.value)} />
                            {preinput('Perks','Select all the perks for your place')}
                            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
                                <Perks selected={perks} onChange={setPerks}/>
                            </div>
                            {preinput('Extra Info','house rules, etc')}
                            <textarea value={extraInfo} onChange={e=> setExtraInfo(e.target.value)}/>
                            {preinput('Check in&out times','Enter check in check out times, remember to have a small window for cleaning the room for next guests')}
                            <div className='grid gap-2 sm:grid-cols-3'>
                                <div>
                                    <h3 className='mt-2 -mb-2 '>Check in time</h3>
                                    <input type="number" value={checkIn} onChange={e=> setCheckIn(e.target.value)} placeholder='16' />
                                    
                                </div>
                                <div>
                                <h3 className='mt-2 -mb-2 '>Check out time</h3>
                                    <input type="number" value={checkOut} onChange={e=> setCheckOut(e.target.value)} placeholder='11' />
                                    
                                </div>
                                <div>
                                <h3 className='mt-2 -mb-2 '>Max allowed Guests</h3>
                                    <input type="number" value={maxGuests} onChange={e=> setMaxGuests(e.target.value)} placeholder='2' />
                                    
                                </div>
                            </div>
                            <button className='primary my-4'>Save</button>
                        </form>
                    </div>

                )
            }


        </div>
    )
}

export default Places