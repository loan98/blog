import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundPageStyle = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .heading {
        margin: 40px 0;
    }
    .back {
        margin-bottom: 40px;
        padding: 15px 30px;
        color: #fff;
        font-weight: 500;
        background: ${props => props.theme.primary};
        border-radius: 8px;
    }
`;

const NotFoundPage = () => {
    return (
        <NotFoundPageStyle>
            <NavLink to="/">
                <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
            </NavLink>
            <h1 className="heading">Oops! Page Not Found.</h1>
            <NavLink to="/" className="back">Back to Homepage</NavLink>
        </NotFoundPageStyle>
    );
};

export default NotFoundPage;