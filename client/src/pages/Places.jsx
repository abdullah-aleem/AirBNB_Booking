import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks';

function Places() {
    const { action } = useParams();
    const [title,setTitle]=useState('');
    const [address,setAdress]=useState('');
    const [addedPhoto,setAddedPhoto]=useState([]);
    const [photoLink,setPhotoLink]=useState('');
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState('');
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState('');
    function preinput(header,text){
        return(
            <>
            <h2 className='text-xl mt-4 '>{header}</h2>
            <p className='text-gray-500 text-sm'>{text}</p>
            </>
        )
    }
    function addPhotoByLink(){
        j
    }
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
                        <form>
                            {preinput('Title','Title for your place should be short and catchy')}        
                            <input type='text' value={title} onChange={e=> setTitle(e.target.value)} placeholder='title,for example "lonely Place"' />
                            {preinput('Address','Address to your place.')}
                            <input type='text' value={address} onChange={e=> setAdress(e.target.value)} placeholder='address' />
                            {preinput('Photos','more===better')}               
                            <div className='flex gap-2'>
                                <input type="text" value={photoLink} onChange={e=> setPhotoLink(e.target.value)} placeholder={'add using link.....'} />
                                <button className='bg-gray-200 rounded-2xl px-4' >Add&nbsp;photos</button>
                            </div>
                            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                                <button className='flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                                    </svg>Upload
                                </button>
                            </div>
                            {preinput('Description','Description of your place')}
                            <textarea className='' value={description} onChange={e=> setDescription(e.target.value)} />
                            {preinput('Perks','Select all the perks for your place')}
                            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
                                <Perks slected={perks} onChange={setPerks}/>
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