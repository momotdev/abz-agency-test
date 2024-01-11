import React from 'react';
import './styles/user-card.scss';

const UserCard = ({photo, name, position, email, phone}) => {
  return (
      <div className="user-card">
        <div className="user-card__image-wrapper">
          <img src={photo} alt={name} className="user-card__image"/>
        </div>
        <div className="user-card__name">{name}</div>
        <div className="user-card__position">{position}</div>
        <div className="user-card__email">{email}</div>
        <div className="user-card__phone-number">{phone}</div>
      </div>
  );
};


export default UserCard;