import { useState, useEffect } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

export default function SideMenuHeaderResponsive({
  focusBallStops,
  focusTurrets,
  focusNumbers,
  focusDefault,
  handlePrevious,
  handleNext,
  currentPage,
  windowWidth,
}) {
  const menuItems = [
    'Rims',
    'Ball Tracks',
    'Centre',
    'Ball Stops',
    'Turrets',
    'Numbers',
    'Index',
  ];
  const [activeItem, setActiveItem] = useState('Rims');

  useEffect(() => {
    // Sayfa numarasına göre aktif öğeyi ayarla
    setActiveItem(menuItems[currentPage - 1]);
  }, [currentPage]);

  const handleActiveItem = (item) => {
    item === 'Ball Stops'
      ? focusBallStops()
      : item === 'Turrets'
      ? focusTurrets()
      : item === 'Numbers'
      ? focusNumbers()
      : item === 'Index'
      ? focusDefault()
      : undefined;

    setActiveItem(item);
  };

  return (
    <div className={`scrollable-menu ${windowWidth < 771 ? 'scrollX' : ''}`}>
      <div className='menu-container'>
        <button
          className='nav-button page-down btn'
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <BsArrowLeft className='icon' />
        </button>
        <ul className='menu-list'>
          {menuItems.map((item, index) => (
            <li
              className={`menu-item ${item === activeItem ? 'active' : ''}`}
              key={index}
              style={{ display: 'inline-block', margin: '0 10px' }}
            >
              <span onClick={() => handleActiveItem(item)}>{item}</span>
            </li>
          ))}
        </ul>
        <button
          className='nav-button page-down btn'
          onClick={handleNext}
          disabled={currentPage === 7}
        >
          <BsArrowRight className='icon' />
        </button>
      </div>
    </div>
  );
}
