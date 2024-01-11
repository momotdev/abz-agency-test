import React from 'react';
import './styles/user-card.scss';

const UserCard = () => {
  return (
      <div className="user-card">
        <div className="user-card__image-wrapper">
          <img src="" alt="" className="user-card__image"/>
        </div>
        <div className="user-card__name">Salvador Stewart Flynn Thomas</div>
        <div className="user-card__position">Frontend Developer Frontend</div>
        <div className="user-card__email">frontend_develop@gmail.com</div>
        <div className="user-card__phone-number">+38 (098) 278 44 24</div>
      </div>
  );
};



export default UserCard;