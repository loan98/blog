import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const AuthenticationPageStyle = styled.div`
    min-height: 100vh;
    padding: 40px;
    .logo {
        margin: 0 auto;
    }
    .heading {
        text-align: center;
        font-size: 35px;
        font-weight: bold;
        margin: 20px 0 40px 0;
        color: ${props => props.theme.primary};
    }
    form {
        max-width: 600px;
        margin: 0 auto;
    }
    .have-account {
        margin-bottom: 40px;
        font-size: 14px;
        a {
            color: ${props => props.theme.primary};
            text-decoration: none;
            font-weight: 500;
        }
    }
`

const AuthenticationPage = ({ children }) => {
    return (
        <AuthenticationPageStyle>
            <div className="container">
                <NavLink to="/">
                    <img srcSet='logo.png 3x' alt="monkey-blogging-logo" className="logo" />
                </NavLink>
                <h1 className="heading">Monkey Blogging</h1>
                {children}
            </div>
        </AuthenticationPageStyle>
    );
};

export default AuthenticationPage;