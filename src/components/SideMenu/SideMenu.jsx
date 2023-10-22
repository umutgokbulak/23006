import './sideMenu.css';
import '../../mediaQueries.css';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { m } from 'framer-motion';
import { useState, lazy, Suspense } from 'react';
import SideMenuHeaderResponsive from './SideMenuHeaderResponsive';
import Skeleton from '../Utilities/Skeleton/Skeleton';
import SkeletonLayout from '../Utilities/Skeleton/SkeletonLayout';

const Rims = lazy(async () => import('./SideMenuOptions/Rims.jsx'));
const BallStops = lazy(async () => import('./SideMenuOptions/BallStops.jsx'));
const Turrets = lazy(async () => import('./SideMenuOptions/Turrets.jsx'));
const Numbers = lazy(async () => import('./SideMenuOptions/Numbers.jsx'));
const IndexPage = lazy(async () =>
  import('./SideMenuOptions/IndexPage/IndexPage')
);

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
  windowWidth,
}) {
  const selectFeatures = ['Rims', 'Ball Stops', 'Turrets', 'Numbers', 'Index'];
  const [mouseEntered, setMouseEntered] = useState(true);

  return (
    <m.div
      initial={
        windowWidth < 1520
          ? { opacity: 0, scaleY: 0 }
          : { opacity: 0, scaleX: 0 }
      }
      animate={
        windowWidth < 1520
          ? { opacity: 1, scaleY: 1 }
          : { opacity: 1, scaleX: 1 }
      }
      exit={
        windowWidth < 1520
          ? { opacity: 0, scaleY: 0 }
          : { opacity: 0, scaleX: 0 }
      }
      transition={{ duration: 0.3 }}
      className={`sideMenu ${mouseEntered ? 'scrollY' : 'scrollX'}`}
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
          windowWidth={windowWidth}
          mouseEntered={mouseEntered}
        />
      )}

      {selectedFeature === 'Rims' && currentPage === 1 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Rims
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Rims', item)}
            setUrl={setUrl}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Ball Stops' && currentPage === 2 && (
        <Suspense fallback={<SkeletonLayout />}>
          <BallStops
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('BallStops', item)}
            setUrl={setUrl}
            url={url}
            setItemQuantity={setItemQuantity}
            itemQuantity={itemQuantity}
          />
        </Suspense>
      )}

      {selectedFeature === 'Turrets' && currentPage === 3 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Turrets
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Turrets', item)}
            setUrl={setUrl}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Numbers' && currentPage === 4 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Numbers
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Numbers', item)}
            setUrl={setUrl}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Index' && currentPage === 5 && (
        <Suspense fallback={<SkeletonLayout />}>
          <IndexPage
            mouseEntered={mouseEntered}
            windowWidth={windowWidth}
            selectedItems={selectedItems}
            focusNumbers={focusNumbers}
            focusTurrets={focusTurrets}
            focusBallTrack={focusBallTrack}
          />
        </Suspense>
      )}
    </m.div>
  );
}
