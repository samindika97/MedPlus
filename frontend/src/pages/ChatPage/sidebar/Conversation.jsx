import React from 'react'
import doctorImg from "../../../assets/ContactDoctor.png"

const Conversation = () => {
  return (
    <div className='flex gap-3 items-center rounded p-2 py-5 cursor-pointer'>
        <div className=' avatar online'>
            <div className='w-10 rounded-full bg-red'> 
                <img src={doctorImg} alt="user avatar" />
            </div>
        </div>

       <p className='font-bold text-teal'>Jhone Doe</p>
    </div>
  )
}

export default Conversation