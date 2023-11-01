import './sideMenu.css';
import '../../mediaQueries.css';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { useState, lazy, Suspense } from 'react';

const SkeletonLayout = lazy(async() =>
  import('../Utilities/Skeleton/SkeletonLayout')
);
const SideMenuHeaderResponsive = lazy(async () =>
  import('./SideMenuHeaderResponsive')
);

const Rims = lazy(async () => import('./SideMenuOptions/Rims.jsx'));
const BallStops = lazy(async () => import('./SideMenuOptions/BallStops.jsx'));
const Turrets = lazy(async () => import('./SideMenuOptions/Turrets.jsx'));
const Numbers = lazy(async () => import('./SideMenuOptions/Numbers.jsx'));
const BallTracks = lazy(async () => import('./SideMenuOptions/BallTracks.jsx'));
const Centre = lazy(async () => import('./SideMenuOptions/Centre.jsx'));
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
  focusBallStops,
  focusDefault,
  setUrl,
  url,
  setItemQuantity,
  itemQuantity,
  windowWidth,
  changeMaterial,
}) {
  const selectFeatures = [
    'Rims',
    'Ball Tracks',
    'Centre',
    'Ball Stops',
    'Turrets',
    'Numbers',
    'Index',
  ];
  const [mouseEntered, setMouseEntered] = useState(true);

  return (
    <div
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
              <option
                key={feature}
                value={feature}
              >
                {feature}
              </option>
            ))}
          </select>

          <button
            className='page-up btn icon'
            onClick={handleNext}
            disabled={currentPage === 7}
          >
            <BsArrowRight className='icon' />
          </button>
        </div>
      ) : (
        <SideMenuHeaderResponsive
          focusBallStops={focusBallStops}
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
            changeMaterial={changeMaterial}
          />
        </Suspense>
      )}

      {selectedFeature === 'Ball Tracks' && currentPage === 2 && (
        <Suspense fallback={<SkeletonLayout />}>
          <BallTracks
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('BallTracks', item)}
            setUrl={setUrl}
            url={url}
            changeMaterial={changeMaterial}
          />
        </Suspense>
      )}

      {selectedFeature === 'Centre' && currentPage === 3 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Centre
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Centre', item)}
            setUrl={setUrl}
            url={url}
            changeMaterial={changeMaterial}
          />
        </Suspense>
      )}

      {selectedFeature === 'Ball Stops' && currentPage === 4 && (
        <Suspense fallback={<SkeletonLayout />}>
          <BallStops
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('BallStops', item)}
            setUrl={setUrl}
            url={url}
            setItemQuantity={setItemQuantity}
            itemQuantity={itemQuantity}
            changeMaterial={changeMaterial}
          />
        </Suspense>
      )}

      {selectedFeature === 'Turrets' && currentPage === 5 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Turrets
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Turrets', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Numbers' && currentPage === 6 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Numbers
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Numbers', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Index' && currentPage === 7 && (
        <Suspense fallback={<SkeletonLayout />}>
          <IndexPage
            mouseEntered={mouseEntered}
            windowWidth={windowWidth}
            selectedItems={selectedItems}
            focusNumbers={focusNumbers}
            focusTurrets={focusTurrets}
            focusBallStops={focusBallStops}
          />
        </Suspense>
      )}
    </div>
  );
}
