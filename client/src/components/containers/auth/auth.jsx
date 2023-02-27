import './auth.css'
import SignIn from './signIn'
import SignUp from './signUp'

import React, { useEffect, useState } from 'react'

function Auth() {
    const [hash, setHash] = useState(window.location.hash || '#sign-in');
    
    function handleHashChange() {
        setHash(window.location.hash);
    }
    useEffect(() => {
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className="auth-container">
            {
                hash === '#sign-in' 
                ? <SignIn /> 
                : hash === '#sign-up' 
                ? <SignUp /> 
                : null
            }
        </div>
    )
}

export default Auth