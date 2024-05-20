import React from 'react'
import Sidebarheader from './Sidebar/Sidebarheader'


const Sidebar = ({ users, recipientId }) => {

  return (
    <>
        <Sidebarheader
            users={users}
            recipientId={ recipientId }
        />
    </>

  )
}

export default Sidebar
