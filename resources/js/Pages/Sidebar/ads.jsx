import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Sidebar from './Sidebar';
import Messagebar from './Messagebar';

export default function Dashboard({ auth, users, currentUser, recipientId, messages }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Dashboard" />

                <div className="flex h-screen antialiased text-gray-800 mt-16">
                    {/* Sidebar for larger screens */}
                    <div className="hidden md:flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                        <Sidebar users={users} recipientId={recipientId} messages={messages} />
                    </div>

                    {/* Button to toggle sidebar on small screens */}
                    <button
                        className="md:hidden fixed top-0 left-0 p-4 cursor-pointer"
                        onClick={toggleSidebar}
                    >
                        ☰
                    </button>

                    {/* Sidebar for small screens */}
                    {sidebarVisible && (
                        <div className="md:hidden fixed top-0 left-0 z-50 w-full h-full bg-white">
                            <Sidebar users={users} recipientId={recipientId} messages={messages} />
                        </div>
                    )}

                    {/* Main content */}
                    <div className="flex flex-col py-8 pl-6 pr-2 w-full">
                        <Messagebar currentUser={currentUser} recipientId={recipientId} messages={messages} users={users} />
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
