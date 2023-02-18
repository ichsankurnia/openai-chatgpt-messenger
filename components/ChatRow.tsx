'use client'

import { ChatBubbleLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../utils/firebase';

type Props = {
    id: string,
    onClickChat: MouseEventHandler<HTMLAnchorElement>
};

const ChatRow: React.FC<Props> = ({ id, onClickChat }) => {
    const [active, setActive] = useState(false)

    const pathname = usePathname()
    const router = useRouter()

    const { data: session } = useSession()

    // LIST OF MESSAGE IN A CHATS
    const [data] = useCollection(
        session && query(
            collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
            orderBy('createdAt', 'asc')
        )
    )

    useEffect(() => {
        if (!pathname) return

        setActive(pathname.includes(id))
    }, [pathname])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        onClickChat('')
        router.replace('/')
    }

    return (
        <>
            <Link href={`/chat/${id}`} onClick={onClickChat} className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}>
                <ChatBubbleLeftIcon className='h-5 w-5' />
                <p className='flex-1 truncate'>
                    {data?.docs.length && data?.docs[data.docs.length - 1]?.data().text || 'New Chat'}
                </p>
                <TrashIcon onClick={removeChat} className='h-5 w-5 text-gray-700 hover:text-red-700' />
            </Link>
        </>
    );
}

export default ChatRow;