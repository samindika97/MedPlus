import React from 'react'
import doctorImg from "../../../assets/ContactDoctor.png"
import useCoversation from '../../../zustand/useConversation';

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation} = useCoversation();

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <div className={`flex gap-3 items-center rounded p-2 py-5 cursor-pointer ${isSelected ? " bg-mintGreen":""}`}
      onClick={() => setSelectedConversation(conversation)}
    >
        <div className=' avatar online'>
            <div className='w-10 rounded-full'> 
                <img src={doctorImg} alt="user avatar" />
            </div>
        </div>

       <p className='font-bold text-teal'>{conversation.userName}</p>
    </div>
  )
}

export default Conversation