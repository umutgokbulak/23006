import './sideMenuOptions.css';
import { useState } from 'react';

export default function ToolTip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='tooltip-container'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className='tooltip'>{text}</div>}
    </div>
  );
}
