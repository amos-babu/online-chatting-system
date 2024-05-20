import { Link, useParams } from 'react-router-dom'
import Useravatar from '../Profile/Useravatar'
import { MessageContext } from '../Dashboard';
import { useContext } from 'react';


const Sidebarheader = ({ users }) => {
    const { id } = useParams();
    const messages = useContext( MessageContext );
    console.log(users);
    const activeUsersCount = Object.values(users).length;
  return (
    <>
        <div
            className="hidden md:flex fixed left-0 top-0 h-full flex-col py-8
                    pl-6 pr-2 w-64 bg-white overflow-y-auto flex-shrink-0">


            <div className="flex flex-col">
                <h2 className='font-bold pb-6'>Recents</h2>
                <div className="flex flex-row items-center justify-between text-xs">
                        <span className="font-bold">Active Conversations</span>
                        <span
                        className="flex items-center justify-center
                        bg-gray-300 h-4 w-4 rounded-full"
                        >{activeUsersCount}</span>
                </div>

                {Object.values(users).map(user => (
                <Link key={user.id} className="ml-2 text-sm font-semibold" to={`/dashboard/${user.id}`}>
                    <div className="flex flex-col space-y-1 mx-2 overflow-y-auto">
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        <Useravatar userName={user.name} />
                        <div className="ml-2 text-sm font-normal">
                        {/* Conditionally render based on is_read */}
                        {user.messages?.some(message => !message.is_read) ? (
                            <h2 className='font-semibold'>{user.name}</h2>
                        ) : (
                            <span>{user.name}</span>
                        )}
                        </div>
                    </button>
                    </div>
                </Link>
                ))}



                <div className="flex flex-row items-center justify-between text-xs mt-6">
                    <span className="font-bold">Archived</span>
                    <span
                    className="flex items-center justify-center
                    bg-gray-300 h-4 w-4 rounded-full"
                    >7
                    </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2">
                        <button
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                        >
                            <div
                                className="flex items-center justify-center
                                h-8 w-8 bg-indigo-200 rounded-full"
                            >
                                H
                            </div>
                            <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                        </button>
                </div>

            </div>
        </div>
    </>
  )
}

export default Sidebarheader
