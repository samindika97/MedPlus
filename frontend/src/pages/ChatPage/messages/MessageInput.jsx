import React from 'react'

const MessageInput = () => {
  return (
    <form className='px-4 my-3'>
        <div className='w-full flex'>
            <input type="text" className='border text-sm rounded-lg block w-full p-2.5' placeholder='Send a message' />
            <button type='submit' className=' bg-mintGreen'>send</button>
        </div>
    </form>
  )
}

export default MessageInput