import React from 'react';

const BasicButton = ({children}) => {
  return (
      <button className="button">
        {children}
      </button>
  );
};

export default BasicButton;