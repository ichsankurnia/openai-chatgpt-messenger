'use client'

import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../utils/firebase';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';

type Props = {};

const Sidebar: React.FC<Props> = ({ }) => {
    const { data: session } = useSession()

    // LIST OF CHAT IN A USER
    const [data, loading, error] = useCollection(
        session && query(
            collection(db, 'users', session.user?.email!, 'chats'),
            orderBy('createdAt', 'asc')
        )
    )

    return (
        <>
            <div className='p-2 flex flex-col h-screen'>
                <div className='flex-1'>
                    <div>
                        {/* NEWCHAT */}
                        <NewChat />

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
                                <ChatRow id={item.id} key={item.id} />
                            )}
                        </div>
                    </div>
                </div>

                {session &&
                    <img
                        onClick={() => signOut()}
                        src={session.user?.image!}
                        alt='user-avatar'
                        className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
                    />
                }
            </div>
        </>
    );
}

export default Sidebar;