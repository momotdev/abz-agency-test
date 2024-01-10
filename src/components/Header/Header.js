import React from 'react';
import Logo from "./assets/Logo.svg"

const Header = () => {
    return (
        <div className="header">
            <header className="header-wrapper">
                <img src={Logo} alt="Site Logo"/>
            </header>
        </div>
    );
};

export default Header;