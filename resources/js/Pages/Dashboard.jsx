import React, { useState, createContext } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Sidebar from './Sidebar';
import Messagebar from './Messagebar';

export const MessageContext = createContext();

export default function Dashboard({ auth, users, currentUser, recipientId, messages }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
                <AuthenticatedLayout
                    user={auth.user}
                >
                <Head title="Dashboard" />

                    <div className="flex h-screen antialiased text-gray-800 mt-16">
                        <button className="md:hidden absolute top-0 left-0 p-4 cursor-pointer"
                                onClick={toggleSidebar}
                        >
                                ☰
                        </button>
                        <div className="flex flex-row h-full w-full">
                                <MessageContext.Provider value={ messages }>
                                    <Sidebar
                                        users={ users }
                                        recipientId={ recipientId }
                                    />
                                </MessageContext.Provider>
                                <Messagebar
                                    currentUser={ currentUser }
                                    recipientId={ recipientId }
                                    messages={ messages }
                                    users={ users }
                                />
                        </div>
                    </div>

            </AuthenticatedLayout>
    );
}
