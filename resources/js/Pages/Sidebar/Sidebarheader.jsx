import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Useravatar from '../Profile/Useravatar';
import { MessageContext } from '../Dashboard';

const Sidebarheader = ({ users }) => {
    const [userMessages, setUserMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const { id } = useParams();
    const messages = useContext(MessageContext);

    const activeUsersCount = Object.keys(users).length;

    useEffect(() => {
        if (typeof users === 'object' && users !== null) {
            const userArray = Object.values(users);
            setUserMessages(userArray);
        } else {
            console.error('users is not a valid object');
        }
    }, [users, id]);

    const handleReadMessage = (userId) => {
        setUserMessages(prevState => {
            return prevState.map(user => {
                if (user.id === userId) {
                    const updatedMessages = user.messages.map(message => {
                        return { ...message, is_read: 1 };
                    });
                    return { ...user, messages: updatedMessages };
                }
                return user;
            });
        });
    };

    const handleClick = (userId) => {
        handleReadMessage(userId);
        setSelectedUserId(userId);
    };

    return (
        <div className="hidden md:flex fixed left-0 top-0 h-full flex-col py-8 pl-6 pr-2 w-64 bg-white overflow-y-auto flex-shrink-0">
            <div className="flex flex-col">
                <h2 className='font-bold pb-6'>Recents</h2>
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold">Active Conversations</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                        {activeUsersCount}
                    </span>
                </div>
                <div className="flex flex-col space-y-1 mx-2 overflow-y-auto">
                    {userMessages.map(user => (
                        <div
                            key={user.id}
                            className={`ml-2 text-sm font-semibold `}
                            onClick={() => handleClick(user.id)}
                        >
                            <button className={`flex flex-row items-center hover:bg-gray-100 ${selectedUserId === user.id ? 'bg-gray-200' : ''} rounded-xl p-2`}>
                                <Useravatar userName={user.name} />
                                <div className="ml-2 text-sm font-normal">
                                    {Array.isArray(user.messages) && user.messages.some(message => message.is_read === 1) ? (
                                        <h2>{user.name}</h2>
                                    ) : (
                                        <h2 className='font-semibold'>{user.name}</h2>
                                    )}
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row items-center justify-between text-xs mt-6">
                    <span className="font-bold">Archived</span>
                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">7</span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2">
                    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            H
                        </div>
                        <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebarheader;
