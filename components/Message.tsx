import { DocumentData } from 'firebase/firestore';
import React from 'react';

type Props = {
    message: DocumentData
};

const deleteFirstCharEnter = (realText: string) => {
    try {
        const text = realText
        const arr = text.split('\n')
        if (arr.length > 1) {
            let result: any[] = []
            for (let i = 0; i < arr.length; i++) {
                const text = arr[i];
                if (text === '') {
                    continue
                } else {
                    result = arr.slice(i, arr.length)
                    break
                }
            }

            return result.join('\n')
        } else {
            return realText
        }
    } catch (error) {
        return realText
    }
}

const Message: React.FC<Props> = ({ message }) => {
    const isChatGPT = message.user.name === 'ChatGPT'

    return (
        <div className={`py-5 text-gray-800 dark:text-white ${isChatGPT && 'bg-[#f7f7f8] dark:bg-[#434654]'}`}>
            <div className={`flex ${!isChatGPT && 'items-center'} space-x-5 px-10 max-w-2xl mx-auto`}>
                <img src={message.user.avatar} alt='' className='h-8 w-8' />
                {/* <textarea className='text-sm w-full outline-none bg-transparent' rows={5} defaultValue={message.text} readOnly></textarea> */}
                {/* <div className='text-sm whitespace-pre-wrap'>{deleteFirstCharEnter(message.text)}</div> */}
                <div className='text-sm whitespace-pre-wrap'>{(message.text as string).trimStart()}</div>
            </div>
        </div>
    );
}

export default Message;