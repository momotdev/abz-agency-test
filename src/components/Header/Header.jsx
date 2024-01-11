import React from 'react';
import Logo from "./assets/Logo.svg"
import BasicButton from "../BasicButton/BasicButton";

const Header = () => {
  return (
      <div className="header">
        <header className="header-wrapper">
          <img src={Logo} alt="Site Logo"/>
          <nav className="nav">
            <BasicButton>Users</BasicButton>
            <BasicButton>Sign up</BasicButton>
          </nav>
        </header>
      </div>
  );
};

export default Header;