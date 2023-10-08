import { Fragment, useState, useEffect } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import BottomOptionsMenu from '../BottomOptionsMenu/BottomOptions';
import SideMenu from '../SideMenu/SideMenu';
import Loader from '../Loader/Loader.jsx';
import ScreenShotModal from './ScreenShotModal';
import '../../mediaQueries.css';
import './unityContainer.css';
import './modal.css';

export default function UnityContainer({
  setUrl,
  url,
  selectedItems,
  handleComponentSelect,
  setItemQuantity,
  itemQuantity,
}) {
  const [openSideMenu, setOpenSideMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState('Rims');
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [screenshotImage, setScreenshotImage] = useState('');

  const {
    unityProvider,
    takeScreenshot,
    sendMessage,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: '/assets/Unity/CMGH_React.loader.js',
    dataUrl: '/assets/Unity/CMGH_React.data',
    frameworkUrl: '/assets/Unity/CMGH_React.framework.js',
    codeUrl: '/assets/Unity/CMGH_React.wasm',
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateSelectedFeature(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
      updateSelectedFeature(currentPage + 1);
    }
  };

  const updateSelectedFeature = (page) => {
    switch (page) {
      case 1:
        setSelectedFeature('Rims');
        break;

      case 2:
        setSelectedFeature('Ball Stops');
        focusBallTrack();
        break;

      case 3:
        setSelectedFeature('Turrets');
        focusTurrets();
        break;

      case 4:
        setSelectedFeature('Numbers');
        focusNumbers();
        break;

      case 5:
        setSelectedFeature('Index');
        focusDefault();
        break;
    }
  };

  const handleFeatureSelect = (e) => {
    setSelectedFeature(e.target.value);

    switch (e.target.value) {
      case 'Rims':
        setCurrentPage(1);

        break;

      case 'Ball Stops':
        setCurrentPage(2);
        focusBallTrack();
        break;

      case 'Turrets':
        setCurrentPage(3);
        focusTurrets();
        break;

      case 'Numbers':
        setCurrentPage(4);
        focusNumbers();
        break;

      case 'Index':
        setCurrentPage(5);
        focusDefault();
        break;

      default:
        break;
    }
  };

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
        console.log('devicePixelRatio', devicePixelRatio);
      };
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      mediaMatcher.addEventListener('change', updateDevicePixelRatio);
      return function () {
        mediaMatcher.removeEventListener('change', updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );

  //SCREENSHOT
  function handleScreenShot() {
    if (isLoaded == false) return;

    const dataUrl = takeScreenshot('image/png', 1);
    setScreenshotImage(dataUrl);
    setScreenshotModalOpen(true);
  }

  const downloadScreenshot = () => {
    const a = document.createElement('a');
    a.href = screenshotImage;
    a.download = 'Cammegh';
    a.click();
  };
  ////

  function closeModal() {
    setScreenshotModalOpen(false);
  }

  function focusTurrets() {
    sendMessage('Cameras', 'FocusOnTurrets');
    setSelectedFeature('Turrets');
    setCurrentPage(3);
  }
  function focusBallTrack() {
    sendMessage('Cameras', 'FocusOnBallTrack');
    setSelectedFeature('Ball Stops');
    setCurrentPage(2);
  }
  function focusNumbers() {
    sendMessage('Cameras', 'FocusOnWheelNumbers');
    setSelectedFeature('Numbers');
    setCurrentPage(4);
  }
  function focusDefault() {
    sendMessage('Cameras', 'UnFocusFromTarget');
    setSelectedFeature('Index');
    setCurrentPage(5);
  }

  //LOADING PERCENTAGE
  const loadingPercentage = Math.round(loadingProgression * 100);
  // //
  return (
    <Fragment>
      <div className='unity-container'>
        <div className='configurator'>
          {isLoaded == false && (
            <div className='loading-overlay'>
              <p>
                <Loader />
                <span>{loadingPercentage}%</span>
              </p>
            </div>
          )}

          <Unity
            id='canvas'
            unityProvider={unityProvider}
            className='unity-canvas'
            devicePixelRatio={devicePixelRatio}
          />
          {isLoaded && (
            <>
              <BottomOptionsMenu
                focusDefault={focusDefault}
                focusTurrets={focusTurrets}
                focusBallTrack={focusBallTrack}
                focusNumbers={focusNumbers}
                handleScreenShot={handleScreenShot}
                setCurrentPage={setCurrentPage}
                setSelectedFeature={setSelectedFeature}
                selectedFeature={selectedFeature}
                currentPage={currentPage}
              />
              <button
                className='sideMenu-btn'
                onClick={() => setOpenSideMenu((prev) => !prev)}
              >
                <DotsVerticalIcon width={20} height={20} />
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {openSideMenu && isLoaded && (
          <LazyMotion features={domAnimation}>
            <SideMenu
              selectedItems={selectedItems}
              handleComponentSelect={handleComponentSelect}
              isSideMenuOpen={openSideMenu}
              focusBallTrack={focusBallTrack}
              focusDefault={focusDefault}
              focusNumbers={focusNumbers}
              focusTurrets={focusTurrets}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              selectedFeature={selectedFeature}
              currentPage={currentPage}
              handleFeatureSelect={handleFeatureSelect}
              setUrl={setUrl}
              url={url}
              setItemQuantity={setItemQuantity}
              itemQuantity={itemQuantity}
            />
          </LazyMotion>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {screenshotModalOpen && (
          <ScreenShotModal
            screenshotImage={screenshotImage}
            downloadScreenshot={downloadScreenshot}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence>
    </Fragment>
  );
}
