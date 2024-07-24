import axios from 'axios';
import { set } from 'mongoose';
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
            console.log("this is data",data)
            
            setAddedPhoto(prev => {
                
                return prev.concat(data);
            })

        })
    }
    const makePrimary=(ev)=>{
        ev.preventDefault();
        const link=ev.target.src.split('/').pop();
        console.log(link)
        console.log(addedPhoto)
        setAddedPhoto([link,...addedPhoto.filter(photo=>photo!==link)]);

    }
    return (
        <div className='w-full' >
            <div className='flex gap-2 '>
                <input type="text" className='' value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder={'add using link.....'} />
                <button onClick={addPhotoByLink} className='bg-gray-200 rounded-2xl px-4' >Add&nbsp;photos</button>
            </div>
            <div className='grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6'>
                {addedPhoto.length > 0 && addedPhoto.map(link => (

                    <div className='h-32 ' key={link}>
                        <img className=' rounded-2xl h-full w-full object-cover cursor-pointer ' key={link} src={'http://localhost:4000/uploads/' + link}  onClick={makePrimary}/>
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