import React, {useState} from 'react';
import './styles/user-card.scss';
import NoImage from './assets/photo-cover.svg';

const UserCard = ({photo, name, position, email, phone}) => {
  const [imgSrc, setImgSrc] = useState(photo);
  return (
      <div className="user-card">
        <div className="user-card__image-wrapper">
          <img src={imgSrc} onError={() => setImgSrc(NoImage)} alt={name} className="user-card__image"/>
        </div>
        <div className="user-card__name">{name}</div>
        <div className="user-card__position">{position}</div>
        <div className="user-card__email">{email}</div>
        <div className="user-card__phone-number">{phone}</div>
      </div>
  );
};


export default UserCard;