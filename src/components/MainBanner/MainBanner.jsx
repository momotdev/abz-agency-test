import React from 'react';
import './styles/main-banner.scss';
import BasicButton from '../BasicButton/BasicButton';

const MainBanner = () => {
  return (
    <div className='banner'>
      <div className='banner__text-wrapper'>
        <div className='banner__text'>
          <h1 className='h1'>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they&apos;ll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
          <div className='banner__button-wrapper'>
            <BasicButton>Sign up</BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
