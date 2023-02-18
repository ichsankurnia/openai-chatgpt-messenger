import React, { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db } from '../utils/firebase';

type Props = {
    onNewChat: (e: React.MouseEventHandler<HTMLButtonElement | HTMLButtonElement>) => any
};


// c_user {email} have => chats {message, userId, createdAt}
const NewChat: React.FC<Props> = ({ onNewChat }) => {
    const { data: session } = useSession()
    const router = useRouter()

    const createNewChat = async (e: any) => {
        const doc = await addDoc(
            collection(db, 'users', session?.user?.email!, 'chats'), {
            // messages: [],
            userId: session?.user?.email!,
            createdAt: serverTimestamp()
        }
        )
        /* users > user@gmail.com > chats > VnEX06OtWiJe0AHt9h5H > {message: [], userId: user@gmail.com, createdAt: 13 February 2023 at 19:12:49 UTC+7} */

        onNewChat(e)
        router.push(`/chat/${doc.id}`)
    }

    return (
        <>
            <div onClick={createNewChat} className='border-gray-700 border chatRow'>
                <PlusIcon className='h-4 w-4' />
                <p>New Chat</p>
            </div>
        </>
    );
}

export default NewChat;