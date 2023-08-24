import React from 'react';
import Header from './Header';
import Main from './Main';

export default function ProtectedMainElement({ name, userEmail, ...props }) {
    return (
        <>
            <Header userEmail={userEmail} />
            <Main name='content' {...props} />
        </>
    )
}