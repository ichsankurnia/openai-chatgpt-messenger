'use client'

import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import LogoutModal from './LogoutModal';

type Props = {};

const Sidebar: React.FC<Props> = ({ }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const { data: session } = useSession()
    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    // LIST OF CHAT IN A USER
    const [data, loading, error] = useCollection(
        session && query(
            collection(db, 'users', session.user?.email!, 'chats'),
            orderBy('createdAt', 'asc')
        )
    )

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: any) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: any) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <>
            {/* SIDEBAR MOBILE */}
            <div className={`fixed inset-0 bg-slate-900 bg-opacity-60 z-40 lg:hidden md:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
            <div className='lg:hidden sticky top-0 w-full px-4 sm:px-6 lg:px-8 z-30 bg-[#343541]'>
                <div className="flex items-center justify-between pt-4 pb-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='inline-flex items-center justify-center p-1 rounded-md text-gray-300 hover:bg-slate-700 hover:text-white outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900'
                    >
                        {sidebarOpen ?
                            <svg className="block h-6 w-6 bg-transparent text-darkText1 opa-anim" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            :
                            <svg className="block h-6 w-6 text-darkText1 opa-anim" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        }
                    </button>

                    {/* Header */}
                    {session &&
                        <div className='flex items-center justify-center space-x-2'>
                            <img
                                src={session.user?.image!}
                                alt='user-avatar'
                                className='h-8 w-8 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
                            />
                            <p className='truncate mb-2'>{session.user?.name}</p>
                        </div>
                    }
                </div>
            </div>

            {/* SIDEBAR */}
            <div id="sidebar" ref={sidebar}
                className={`bg-[#202123] absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto h-screen overflow-y-auto 
                    w-[17rem] sm:w-[20rem] ${sidebarOpen ? 'translate-x-0' : '-translate-x-[20rem]'} md:translate-x-0 
                    transform transition-all ease-in-out duration-500
                `}>
                <div className='p-2 flex flex-col h-screen'>
                    <div className='flex-1'>
                        <div>
                            {/* NEWCHAT */}
                            <NewChat onNewChat={() => setSidebarOpen(false)} />

                            <div className='hidden sm:inline'>
                                {/* MODEL SEELCTION */}
                                <ModelSelection />
                            </div>

                            <div className='space-y-2'>
                                {loading &&
                                    <div className='animate-pulse text-center text-white mt-2.5'>
                                        <p>Loading chats...</p>
                                    </div>
                                }

                                {/* Map through ChatRows */}
                                {data?.docs.map(item =>
                                    <ChatRow id={item.id} key={item.id} onClickChat={() => setSidebarOpen(false)} />
                                )}
                            </div>
                        </div>
                    </div>

                    {session &&
                        <label htmlFor='logout-modal' className='flex justify-between items-center hover:bg-gray-700/70 cursor-pointer text-gray-300 transition-all duration-200 ease-out rounded-lg px-2' >
                            <div className='flex items-center space-x-3'>
                                <img
                                    src={session.user?.image!}
                                    alt='user-avatar'
                                    className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
                                />
                                <p className='truncate'>{session.user?.name}</p>
                            </div>
                            <ArrowLeftOnRectangleIcon className='h-7 w-7' />
                        </label>
                    }
                </div>
            </div>

            <LogoutModal modalId='logout-modal' onContinue={() => signOut()} />
        </>
    );
}

export default Sidebar;