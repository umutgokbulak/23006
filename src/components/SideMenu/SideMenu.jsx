import './sideMenu.css';
import '../../mediaQueries.css';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { useState, lazy, Suspense } from 'react';
import WheelType from './SideMenuOptions/WheelType.jsx';
import Separators from './SideMenuOptions/Separators.jsx';
import Aurora from './SideMenuOptions/Aurora.jsx';
import Halo from './SideMenuOptions/Halo.jsx';
import InlayStrips from './SideMenuOptions/InlayStrips.jsx';
import Brightwork from './SideMenuOptions/Brightwork.jsx';
import OuterBowl from './SideMenuOptions/OuterBowl.jsx';
import Software from './SideMenuOptions/Software.jsx';

const SkeletonLayout = lazy(() =>
  import('../Utilities/Skeleton/SkeletonLayout')
);
const SideMenuHeaderResponsive = lazy(() =>
  import('./SideMenuHeaderResponsive')
);

const Rims = lazy(() => import('./SideMenuOptions/Rims.jsx'));
const BallStops = lazy(() => import('./SideMenuOptions/BallStops.jsx'));
const Turrets = lazy(() => import('./SideMenuOptions/Turrets.jsx'));
const Numbers = lazy(() => import('./SideMenuOptions/Numbers.jsx'));
const BallTracks = lazy(() => import('./SideMenuOptions/BallTracks.jsx'));
const Centre = lazy(() => import('./SideMenuOptions/Centre.jsx'));
const IndexPage = lazy(() => import('./SideMenuOptions/IndexPage/IndexPage'));

export default function SideMenu({
  selectedItems,
  handleComponentSelect,
  handlePrevious,
  handleNext,
  handleFeatureSelect,
  currentPage,
  selectedFeature,
  setUrl,
  url,
  setItemQuantity,
  itemQuantity,
  windowWidth,
  changeMaterial,
}) {
  const features = [
    'Wheel Type',
    'Numbers',
    'Separator Ring',
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
            {features.map((feature) => (
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
            disabled={currentPage === 15}
          >
            <BsArrowRight className='icon' />
          </button>
        </div>
      ) : (
        <SideMenuHeaderResponsive
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          currentPage={currentPage}
          windowWidth={windowWidth}
          mouseEntered={mouseEntered}
        />
      )}

      {selectedFeature === 'Wheel Type' && currentPage === 1 && (
        <Suspense fallback={<SkeletonLayout />}>
          <WheelType
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('WheelType', item)}
            setUrl={setUrl}
            url={url}
            changeMaterial={changeMaterial}
          />
        </Suspense>
      )}

      {selectedFeature === 'Numbers' && currentPage === 2 && (
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

      {selectedFeature === 'Separator Ring' && currentPage === 3 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Separators
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Separator', item)}
            setUrl={setUrl}
            url={url}
            changeMaterial={changeMaterial}
          />
        </Suspense>
      )}

      {selectedFeature === 'Aurora Centre Lightning' && currentPage === 4 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Aurora
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Aurora', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}
      {selectedFeature === 'Halo Rim Lightning' && currentPage === 5 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Halo
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Halo', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Top Rim Finish' && currentPage === 6 && (
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

      {selectedFeature === 'Ball Track Finish' && currentPage === 7 && (
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

      {selectedFeature === 'Centre Finish' && currentPage === 8 && (
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

      {selectedFeature === 'Inlay Strips' && currentPage === 9 && (
        <Suspense fallback={<SkeletonLayout />}>
          <InlayStrips
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Numbers', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Turret' && currentPage === 10 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Turrets
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('InlayStrips', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Ball Stops' && currentPage === 11 && (
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

      {selectedFeature === 'Brightwork' && currentPage === 12 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Brightwork
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Brightwork', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}
      {selectedFeature === 'Outer Bowl' && currentPage === 13 && (
        <Suspense fallback={<SkeletonLayout />}>
          <OuterBowl
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('OuterBowl', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}
      {selectedFeature === 'Software Features' && currentPage === 14 && (
        <Suspense fallback={<SkeletonLayout />}>
          <Software
            windowWidth={windowWidth}
            mouseEntered={mouseEntered}
            onSelect={(item) => handleComponentSelect('Software', item)}
            setUrl={setUrl}
            changeMaterial={changeMaterial}
            url={url}
          />
        </Suspense>
      )}

      {selectedFeature === 'Index' && currentPage === 15 && (
        <Suspense fallback={<SkeletonLayout />}>
          <IndexPage
            mouseEntered={mouseEntered}
            windowWidth={windowWidth}
            selectedItems={selectedItems}
          />
        </Suspense>
      )}
    </div>
  );
}
