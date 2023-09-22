import { Fragment, useState, useEffect, useRef } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import BottomOptionsMenu from '../BottomOptionsMenu/BottomOptions';
import SideMenu from '../SideMenu/SideMenu';
import Loader from '../Loader/Loader.jsx';
import ScreenShotModal from './ScreenShotModal';
import './unityContainer.css';
import './modal.css';

export default function UnityContainer({
  selectedOptions,
  selectedItems,
  handleComponentSelect,
}) {
  const [openSideMenu, setOpenSideMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState('rims');
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [screenshotImage, setScreenshotImage] = useState('');

  const {
    unityProvider,
    takeScreenshot,
    sendMessage,
    isLoaded,
    loadingProgression,
    requestPointerLock,
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
        setSelectedFeature('rims');
        break;

      case 2:
        setSelectedFeature('ballStops');
        focusBallTrack();
        break;

      case 3:
        setSelectedFeature('turrets');
        focusTurrets();
        break;

      case 4:
        setSelectedFeature('numbers');
        focusNumbers();
        break;

      case 5:
        setSelectedFeature('index');
        focusDefault();
        break;
    }
  };

  const handleFeatureSelect = (e) => {
    setSelectedFeature(e.target.value);

    switch (e.target.value) {
      case 'rims':
        setCurrentPage(1);

        break;

      case 'ballStops':
        setCurrentPage(2);
        focusBallTrack();
        break;

      case 'turrets':
        setCurrentPage(3);
        focusTurrets();
        break;

      case 'numbers':
        setCurrentPage(4);
        focusNumbers();
        break;

      case 'index':
        setCurrentPage(5);
        focusDefault();
        break;

      default:
        break;
    }
  };

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

  function closeModal() {
    setScreenshotModalOpen(false);
  }

  function focusTurrets() {
    sendMessage('Cameras', 'FocusOnTurrets');
    setSelectedFeature('turrets');
    setCurrentPage(3);
  }
  function focusBallTrack() {
    sendMessage('Cameras', 'FocusOnBallTrack');
    setSelectedFeature('ballStops');
    setCurrentPage(2);
  }
  function focusNumbers() {
    sendMessage('Cameras', 'FocusOnWheelNumbers');
    setSelectedFeature('numbers');
    setCurrentPage(4);
  }
  function focusDefault() {
    sendMessage('Cameras', 'UnFocusFromTarget');
    setSelectedFeature('index');
    setCurrentPage(5);
  }

  const unityRef = useRef(null);

  useEffect(() => {
    const unity = unityRef.current;

    if (unity) {
      unity.addEventListener('mousedown', requestPointerLock);

      return () => {
        unity.removeEventListener('mousedown', requestPointerLock);
      };
    }
  }, [requestPointerLock]);

  const loadingPercentage = Math.round(loadingProgression * 100);

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
            ref={unityRef}
          />
          {isLoaded !== false && (
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
        {openSideMenu && (
          <LazyMotion features={domAnimation}>
            <SideMenu
              selectedOptions={selectedOptions}
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
