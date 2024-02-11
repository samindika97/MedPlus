import React from 'react';
import Sidebar from '../ChatPage/sidebar/Sidebar';
import MessageContainer from './messages/MessageContainer';

const ChatPage = () => {
  

  return (
    <div className='flex w-ful'>
      <Sidebar/>

      <div className=' w-full'>
            <MessageContainer/>
        </div>
        
      
    </div>
  );
};

export default ChatPage;
