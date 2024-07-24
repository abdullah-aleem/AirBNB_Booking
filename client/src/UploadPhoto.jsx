import axios from 'axios';

import React, { useState } from 'react'
function UploadPhoto({ addedPhoto, setAddedPhoto }) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        axios.post('/uploadByToken', { link: photoLink }).then(data => {
            setAddedPhoto(prev => {
                return [...prev, data.data];
            })

        }).catch(err => {
            console.log(err)
        })
        setPhotoLink('')

    }
    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {

            data.append('photos', files[i]);
        }

        axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        }).then(response => {
            const { data } = response;
            console.log("this is data", data)

            setAddedPhoto(prev => {

                return prev.concat(data);
            })

        })
    }
    const makePrimary = (ev) => {
        ev.preventDefault();
        const link = ev.target.src.split('/').pop();
        console.log(link)
        console.log(addedPhoto)
        setAddedPhoto([link, ...addedPhoto.filter(photo => photo !== link)]);

    }
    const removePhoto=(link)=>{
        setAddedPhoto(prev=>prev.filter(photo=>photo!==link))
    }
    return (
        <div className='w-full' >
            <div className='flex gap-2 '>
                <input type="text" className='' value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder={'add using link.....'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 rounded-2xl px-4' >Add&nbsp;photos</button>
            </div>
            <div className='grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhoto.length > 0 && addedPhoto.map(link => (

                    <div className='h-32 flex relative' key={link}>
                        <img className=' rounded-2xl h-full w-full object-cover cursor-pointer ' key={link} src={'http://localhost:4000/uploads/' + link} onClick={makePrimary} />
                        <button onClick={()=>{removePhoto(link)}} className='absolute bottom-1 right-1 bg-black text-white py-1 px-2 bg-opacity-50 rounded-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>

                        </button>

                    </div>
                ))}
                <label className='h-32 cursor-pointer flex justify-center gap-1 border bg-transparent rounded-2xl p-2 items-center text-2xl text-gray-500'>
                    <input type="file" multiple={true} className='hidden ' onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    Upload
                </label>
            </div>
        </div>
    )
}

export default UploadPhoto