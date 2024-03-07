import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

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
                            <input type='text' placeholder='title,for example "lonely Place"' />
                            {preinput('Address','Address to your place.')}
                            <input type='text' placeholder='address' />
                            {preinput('Photos','more===better')}               
                            <div className='flex gap-2'>
                                <input type="text" placeholder={'add using link.....'} />
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
                            <textarea className='' />
                            {preinput('Perks','Select all the perks for your place')}
                            <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4'>
                                <label  className='flex gap-2 border p-4 item-center cursor-pointer rounded-2xl'>
                                    <input type="checkbox" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                                    </svg>
                                    <span>

                                        Wifi</span>
                                </label>
                                <label  className='flex gap-2 border p-4 item-center cursor-pointer rounded-2xl'>
                                    <input type="checkbox" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                    </svg>

                                    <span>Heater</span>
                                </label>
                                <label  className='flex gap-2 border p-4 item-center cursor-pointer rounded-2xl'>
                                    <input type="checkbox" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>

                                    <span>Pets</span>
                                </label>
                                <label  className='flex gap-2 border p-4 item-center cursor-pointer rounded-2xl'>
                                    <input type="checkbox" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                    <span>TV</span>
                                </label>
                                <label  className='flex gap-2 border p-4 item-center cursor-pointer rounded-2xl'>
                                    <input type="checkbox" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>

                                    <span>Free parking</span>
                                </label>
                                <label  className='flex gap-2 border p-4 item-center cursor-pointer rounded-2xl'>
                                    <input type="checkbox" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
                                    </svg>

                                    <span>Barbque spot</span>
                                </label>

                            </div>
                            {preinput('Extra Info','house rules, etc')}
                            <textarea />
                            {preinput('Check in&out times','Enter check in check out times, remember to have a small window for cleaning the room for next guests')}
                            <div className='grid gap-2 sm:grid-cols-3'>
                                <div>
                                    <h3 className='mt-2 -mb-2 '>Check in time</h3>
                                    <input type="text" placeholder='16:00' />
                                    
                                </div>
                                <div>
                                <h3 className='mt-2 -mb-2 '>Check out time</h3>
                                    <input type="text" placeholder='16:00' />
                                    
                                </div>
                                <div>
                                <h3 className='mt-2 -mb-2 '>Max allowed Guests</h3>
                                    <input type="text" placeholder='2' />
                                    
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