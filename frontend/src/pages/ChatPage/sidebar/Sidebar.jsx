import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

const Sidebar = () => {
  return (
    <div className=' flex'>
        <div className=''>
        <SearchInput/>
        <Conversations/>
        </div>

    </div>
  )
}

export default Sidebar