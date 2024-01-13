import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
  const [active, setActive] = useState(false);

  let timeout;

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, 400);
  };

  const hideTooltip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div className='tooltip' onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {active && <span className='tooltip__text bottom'>{text}</span>}
    </div>
  );
};

export default Tooltip;
