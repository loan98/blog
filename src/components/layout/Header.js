import React from 'react';
import styled from 'styled-components';
import { Button } from '../button';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

const HeaderStyle = styled.header`
    padding: 20px 0;
    .header-main {
        display: flex;
        align-items: center;
        gap: 30px;
    }
    .logo {
        display: inline-block;
        max-width: 50px;
    }
    .menu {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .search {
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 1px solid #CFCFCF;
        padding: 10px 10px 10px 20px;
        position: relative;
    }
    .search-icon {
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
    .header-right {
        margin-left: auto;
        display: flex;
        gap: 20px;
        align-items: center;
    }
`;

const menuLinks = [
    {
        url: "/",
        title: "Home"
    },
    {
        url: "/blog",
        title: "Blog"
    },
    {
        url: "/contact",
        title: "Contact"
    }
]

const Header = () => {
    const { userInfo } = useAuth();
    //console.log(userInfo)
    return (
        <HeaderStyle>
            <div className="container">
                <div className="header-main">
                    <NavLink to="/">
                        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
                    </NavLink>
                    <ul className="menu">
                        {menuLinks.map(item => (
                            <li className="menu-item" key={item.title}>
                                <NavLink to={item.url} className="menu-link">{item.title}</NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="header-right">
                        <div className="search">
                            <input type="text" className="search-input" placeholder="Search posts..." />
                            <span className="search-icon">
                                <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <ellipse cx="7.66669" cy="7.05161" rx="6.66669" ry="6.05161" stroke="#999999" strokeWidth="1.5" />
                                    <path d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>

                            </span>
                        </div>
                        {!userInfo?.email ?
                            (<Button type="button" height="46px" to="/sign-in" style={{
                                fontSize: 16
                            }}>
                                Sign In
                            </Button>) : 
                            <div className="user-info">
                                <span>Welcome back, </span>
                                <strong className="text-primary">{userInfo?.displayName}</strong>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </HeaderStyle>
    );
};

export default Header;