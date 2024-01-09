import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase-app/firebase-config';
import styled from 'styled-components';
import Header from '../components/layout/Header';

const HomepageStyle = styled.div``;

const Homepage = () => {
    const handleSignOut = () => {
        signOut(auth)
    }
    return (
        <HomepageStyle>
            {/* <button onClick={handleSignOut}>Sign Out</button> */}
            <Header></Header>
        </HomepageStyle>
    );
};

export default Homepage;