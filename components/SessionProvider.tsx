'use client'

import { type Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react'
import React from 'react';

type Props = {
    children: React.ReactNode,
    session: Session | null
};

const SessionProvider: React.FC<Props> = ({ children, session }) => {
    return (
        <>
            <Provider session={session}>
                {children}
            </Provider>
        </>
    );
}

export default SessionProvider;