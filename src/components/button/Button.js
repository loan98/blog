import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../loading';
import Proptypes from "prop-types";
import { NavLink } from 'react-router-dom';

const ButtonStyle = styled.button`
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    border-radius: 8px;
    padding: 0 20px;
    line-height: 1;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${props => props.height || "60px"};
    background-image: linear-gradient(to right bottom,
    ${props => props.theme.primary},
    ${props => props.theme.secondary});
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }
`

const Button = ({type="button", onClick=() => {}, children, ...props}) => {
    const {isLoading, to} = props;
    const child = !!isLoading ? <LoadingSpinner size='20px' borderSize='2px'></LoadingSpinner> : children;

    if(to !== "" && typeof to === "string") {
        return (
            <NavLink to={to}>
                <ButtonStyle type={type} onClick={onClick} {...props}>
                    {child}
                </ButtonStyle>
            </NavLink>
        );
    }
    return (
        <ButtonStyle type={type} onClick={onClick} {...props}>
            {child}
        </ButtonStyle>
    );
};

Button.prototype = {
    type: Proptypes.oneOf(["button", "submit"]).isRequired,
    isLoading: Proptypes.bool,
    onClick: Proptypes.func,
    children: Proptypes.node
}

export default Button;