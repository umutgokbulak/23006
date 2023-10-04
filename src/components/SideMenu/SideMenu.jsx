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
  setUrl,
  url,
  setItemQuantity,
  itemQuantity,
}) {
  const selectFeatures = ['Rims', 'Ball Stops', 'Turrets', 'Numbers', 'Index'];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mouseEntered, setMouseEntered] = useState(true);

  // FOR UPDATING MENU HEADER FOR NARROW SCREENS
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
      className={`sideMenu ${mouseEntered ? 'scrollY' : ''}`}
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
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
                {feature}
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

      {selectedFeature === 'Rims' && currentPage === 1 && (
        <Rims
          windowWidth={windowWidth}
          mouseEntered={mouseEntered}
          onSelect={(item) => handleComponentSelect('Rims', item)}
          setUrl={setUrl}
          url={url}
        />
      )}

      {selectedFeature === 'Ball Stops' && currentPage === 2 && (
        <BallStops
          windowWidth={windowWidth}
          mouseEntered={mouseEntered}
          onSelect={(item) => handleComponentSelect('BallStops', item)}
          setUrl={setUrl}
          url={url}
          setItemQuantity={setItemQuantity}
          itemQuantity={itemQuantity}
        />
      )}

      {selectedFeature === 'Turrets' && currentPage === 3 && (
        <Turrets
          windowWidth={windowWidth}
          mouseEntered={mouseEntered}
          onSelect={(item) => handleComponentSelect('Turrets', item)}
          setUrl={setUrl}
          url={url}
        />
      )}

      {selectedFeature === 'Numbers' && currentPage === 4 && (
        <Numbers
          windowWidth={windowWidth}
          mouseEntered={mouseEntered}
          onSelect={(item) => handleComponentSelect('Numbers', item)}
          setUrl={setUrl}
          url={url}
        />
      )}

      {selectedFeature === 'Index' && currentPage === 5 && (
        <IndexPage
          mouseEntered={mouseEntered}
          windowWidth={windowWidth}
          selectedItems={selectedItems}
          focusNumbers={focusNumbers}
          focusTurrets={focusTurrets}
          focusBallTrack={focusBallTrack}
        />
      )}
    </m.div>
  );
}
