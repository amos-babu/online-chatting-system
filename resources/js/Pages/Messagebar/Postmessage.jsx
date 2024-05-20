import React from 'react';
import Displaymessage from './Displaymessage';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { CiLink } from "react-icons/ci";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { Transition } from '@headlessui/react';


const Postmessage = ({ currentUser, recipientId, messages, users }) => {
    const { data, setData, processing, recentlySuccessful } = useForm({
        message: '',
        recipient_id: recipientId
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/send', data)
    };


  return (
    <>
        <div className="flex flex-col flex-auto h-full ml-0 md:ml-64 p-4 w-full">
            <div
            className="flex flex-col flex-auto flex-shrink-0
            rounded-2xl bg-gray-100 h-full"
            >
                <Displaymessage
                    users={ users }
                    currentUser={ currentUser }
                    recipientId={ recipientId }
                    messages={ messages }
                />

                <form onSubmit={ handleSubmit }>
                    <div
                        className="flex flex-row fixed end-0 bottom-0
                        items-center h-16 rounded-xl w-full md:w-3/4"
                    >
                        <div>
                        <button
                            className="flex items-center justify-center
                            text-gray-400 hover:text-gray-600"
                        >
                            <span className="ml-2 text-2xl">
                            <CiLink/>
                            </span>
                        </button>
                        </div>
                        <div className="flex-grow ml-4">
                            <div className="relative w-full">
                                    <input
                                        id='message'
                                        type="text"
                                        value={ data.message }
                                        onChange={(e) => setData('message', e.target.value)}
                                        className="flex w-full border rounded-xl
                                        focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                    />
                                    <button
                                        className="absolute flex items-center justify-center
                                        h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                                        >

                                        <span className="ml-2 text-xl">
                                            <MdEmojiEmotions/>
                                        </span>
                                    </button>

                            </div>
                            <div className="relative w-full">
                                    <input
                                        id='recipient_id'
                                        type='hidden'
                                        value={ data.recipient_id }
                                        className="flex w-full border rounded-xl focus:outline-none
                                        focus:border-indigo-300 pl-4 h-10"
                                    />
                            </div>
                        </div>
                        <div className="ml-4">
                            <button disabled={processing} type='submit'
                            className="flex items-center justify-center bg-indigo-500
                            hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                            >
                                <span>Send</span>
                                <span className="ml-2 text-sm">
                                    <IoSend/>
                                </span>
                            </button>
                            <Transition
                                show = { recentlySuccessful }
                                enter='transition ease-in-out'
                                enterFrom='opacity-0'
                                leave='transition ease-in-out'
                                leaveFrom='opacity-0'
                            >
                                <p className='text-sm text-gray-600'>Saved</p>
                            </Transition>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Postmessage
