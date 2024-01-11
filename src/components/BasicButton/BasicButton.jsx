import React from 'react';

const BasicButton = ({children, ...props}) => {
  return (
      <button className="button" {...props}>
        {children}
      </button>
  );
};

export default BasicButton;