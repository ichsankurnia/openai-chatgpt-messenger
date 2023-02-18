'use client'

import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../utils/firebase';
import Message from './Message';

type Props = {
    chatId: string
};

const Chat: React.FC<Props> = ({ chatId }) => {

    const { data: session } = useSession()
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // LIST OF MESSAGE IN A CHATS
    const [data] = useCollection(
        session && query(
            collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'asc')
        )
    )


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
        // console.log("Scroll to bot")
    }, [data?.docs.length]);

    return (
        <div className='flex-1 overflow-y-auto overflow-x-hidden'>
            {data?.empty &&
                <>
                    <p className='mt-10 text-center text-gray-800 dark:text-white'>Type a prompt in below to get started</p>
                    <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-gray-800 dark:text-white animate-bounce' />
                </>
            }
            {data?.docs.map((item) =>
                <Message key={item.id} message={item.data()} />
            )}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Chat;