import React from 'react'
import useGetMessages from '../hooks/useGetMessages'

const Message = ({message}) => {

  
  return (
    <div>{message.message}</div>
  )
}

export default Message