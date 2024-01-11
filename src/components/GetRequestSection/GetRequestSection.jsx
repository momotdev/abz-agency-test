import React from 'react';
import './styles/get-request-section.scss'
import BasicButton from "../BasicButton/BasicButton";
import UserCard from "../UserCard/UserCard";

const GetRequestSection = () => {
  return (
      <div className="section get-request-section">
        <div className="get-request-section__title">
          Working with GET request
        </div>
        <div className="get-request-section__list-wrapper">
          <UserCard/>
        </div>
        <div className="get-request-section__button-wrapper">
          <BasicButton>Show More</BasicButton>
        </div>
      </div>
  );
};

export default GetRequestSection;