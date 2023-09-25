import './sideMenu.css';
import './SideMenuOptions/sideMenuMediaQueries.css';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { m } from 'framer-motion';
import Rims from './SideMenuOptions/Rims.jsx';
import Turrets from './SideMenuOptions/Turrets.jsx';
import BallStops from './SideMenuOptions/BallStops';
import IndexPage from './SideMenuOptions/IndexPage/IndexPage';
import Numbers from './SideMenuOptions/Numbers';
import SideMenuHeaderResponsive from './SideMenuHeaderResponsive';
import { useEffect, useState } from 'react';

export default function SideMenu({
  selectedOptions,
  selectedItems,
  handleComponentSelect,
  handlePrevious,
  handleNext,
  handleFeatureSelect,
  currentPage,
  selectedFeature,
  focusNumbers,
  focusTurrets,
  focusBallTrack,
  focusDefault,
}) {
  const selectFeatures = ['rims', 'ballStops', 'turrets', 'numbers', 'index'];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className='sideMenu'
    >
      {windowWidth > 1520 ? (
        <div className='menuHeader'>
          <button
            className='page-down btn'
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <BsArrowLeft className='icon' />
          </button>

          <select
            value={selectedFeature}
            onChange={handleFeatureSelect}
            className='feature-select'
            name='featureSelect'
            id='feature-Select'
          >
            {selectFeatures.map((feature) => (
              <option key={feature} value={feature}>
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </option>
            ))}
          </select>

          <button
            className='page-up btn icon'
            onClick={handleNext}
            disabled={currentPage === 5}
          >
            <BsArrowRight className='icon' />
          </button>
        </div>
      ) : (
        <SideMenuHeaderResponsive
          focusBallTrack={focusBallTrack}
          focusTurrets={focusTurrets}
          focusNumbers={focusNumbers}
          focusDefault={focusDefault}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
        />
      )}

      {selectedFeature === 'rims' && currentPage === 1 && (
        <Rims
          selectedOption={selectedOptions['Rims']}
          onSelect={(item) => handleComponentSelect('Rims', item)}
        />
      )}

      {selectedFeature === 'ballStops' && currentPage === 2 && (
        <BallStops
          onSelect={(item) => handleComponentSelect('BallStops', item)}
          selectedOption={selectedOptions['BallStops']}
        />
      )}

      {selectedFeature === 'turrets' && currentPage === 3 && (
        <Turrets
          selectedOption={selectedOptions['Turrets']}
          onSelect={(item) => handleComponentSelect('Turrets', item)}
        />
      )}

      {selectedFeature === 'numbers' && currentPage === 4 && (
        <Numbers
          selectedOption={selectedOptions['Numbers']}
          onSelect={(item) => handleComponentSelect('Numbers', item)}
        />
      )}

      {selectedFeature === 'index' && currentPage === 5 && (
        <IndexPage
          selectedItems={selectedItems}
          focusNumbers={focusNumbers}
          focusTurrets={focusTurrets}
          focusBallTrack={focusBallTrack}
        />
      )}
    </m.div>
  );
}
