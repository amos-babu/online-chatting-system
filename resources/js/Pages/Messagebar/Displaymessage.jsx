import React, { useEffect, useState } from 'react'
import Useravatar from '../Profile/Useravatar'
import { useParams } from 'react-router-dom'

const Displaymessage = ({ currentUser, messages, users }) => {
    const [userMessage, setUserMessage] = useState([]);

    useEffect(() => {
        if (Array.isArray(messages)) {
            setUserMessage(messages);
        }
    }, [messages]);
  return (
    <>
    <div className="flex flex-col h-full overflow-x-auto mb-4">
            <div className="flex flex-col h-full">
            { userMessage.map(message =>
              <div key={message.id} className="grid grid-cols-12 gap-y-2">
                {message.recipient_id === currentUser.id ? (
                <div className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                  {users[message.sender_id] && (
                    <Useravatar
                        userName={users[message.sender_id].name}
                    />
                    )}

                    <div
                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                    >
                      <div>{message.message}</div>

                    </div>
                  </div>
                </div>
                ) : (
                <div className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div
                      className="flex items-center justify-center
                      h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                    >
                      A
                    </div>
                    <div
                      className="relative mr-3 text-sm bg-indigo-100
                      py-2 px-4 shadow rounded-xl"
                    >
                      <div>{message.message}</div>
                      <div
                        className="absolute text-xs bottom-0
                        right-0 -mb-5 mr-2 text-gray-500"
                      >
                        Seen
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>
              )}
            </div>
          </div>
    </>
  )
}

export default Displaymessage
