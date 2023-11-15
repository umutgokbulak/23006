import { useState, useEffect } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

export default function SideMenuHeaderResponsive({
  handlePrevious,
  handleNext,
  currentPage,
  windowWidth,
}) {
  const features = [
    'Wheel Type',
    'Numbers',
    'Seperator Ring',
    'Aurora Centre Lightning',
    'Halo Rim Lightning',
    'Top Rim Finish',
    'Ball Track Finish',
    'Centre Finish',
    'Inlay Strips',
    'Turret',
    'Ball Stops',
    'Brightwork',
    'Outer Bowl',
    'Software Features',
    'Index',
  ];
  const [activeItem, setActiveItem] = useState('Wheel Type');

  useEffect(() => {
    // Sayfa numarasına göre aktif öğeyi ayarla
    setActiveItem(features[currentPage - 1]);
  }, [currentPage]);

  const handleActiveItem = (item) => {
    // item === 'Ball Stops'
    //   ? focusBallStops()
    //   : item === 'Turrets'
    //   ? focusTurrets()
    //   : item === 'Numbers'
    //   ? focusNumbers()
    //   : item === 'Index'
    //   ? focusDefault()
    //   : undefined;

    setActiveItem(item);
  };

  return (
    <div className={`scrollable-menu ${windowWidth < 1521 ? 'scrollX' : ''}`}>
      <div className='menu-container'>
        <button
          className='nav-button page-down btn'
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <BsArrowLeft className='icon' />
        </button>
        <ul className='menu-list'>
          {features.map((item, index) => (
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
          disabled={currentPage === 15}
        >
          <BsArrowRight className='icon' />
        </button>
      </div>
    </div>
  );
}
