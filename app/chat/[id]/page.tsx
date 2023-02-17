import React from 'react';
import Chat from '../../../components/Chat';
import ChatInput from '../../../components/ChatInput';

type Props = {
    params: {
        id: string,
    },
    searchParams?: {}
};

const ChatPage: React.FC<Props> = ({ params: { id } }) => {
    return (
        <>
            <div className='flex flex-col h-screen overflow-hidden'>
                {/* Chat */}
                <Chat chatId={id} />

                {/* ChatInput */}
                <ChatInput chatId={id} />
            </div>
        </>
    );
}

export default ChatPage;