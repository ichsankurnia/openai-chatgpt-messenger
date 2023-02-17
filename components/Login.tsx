'use client'

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

type Props = {};

// TODO: Don't forget to add redirect URL in https://console.cloud.google.com/apis/credentials

const Login: React.FC<Props> = ({ }) => {
    return (
        <>
            <div className='bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center'>
                <Image 
                    src='https://links.papareact.com/2i6'
                    width={300}
                    height={300}
                    alt='chatgpt-logo'
                />
                <button className='text-white font-semibold text-3xl animate-pulse' onClick={() => signIn('google')}>Sign In to use ChatGPT</button>
            </div>
        </>
    );
}

export default Login;