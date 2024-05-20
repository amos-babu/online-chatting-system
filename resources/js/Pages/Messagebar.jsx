import React from 'react'
import Postmessage from './Messagebar/Postmessage'

const Messagebar = ({ currentUser, recipientId, messages, users }) => {
  return (
    <>
        <Postmessage
            currentUser={ currentUser }
            recipientId={ recipientId }
            messages={ messages }
            users={ users }
        />
    </>
  )
}

export default Messagebar
