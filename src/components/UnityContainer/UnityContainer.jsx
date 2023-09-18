import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import BottomOptionsMenu from '../BottomOptionsMenu/BottomOptions';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import SideMenu from '../SideMenu/SideMenu';
import './modal.css';
import './unityContainer.css';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { Unity, useUnityContext } from 'react-unity-webgl';
import Loader from '../Loader/Loader.jsx';

export default function UnityContainer({
  selectedOptions,
  selectedItems,
  handleComponentSelect,
}) {
  const [openSideMenu, setOpenSideMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState('rims');

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
        focusOnBallTrack();
        break;

      case 3:
        setSelectedFeature('turrets');
        focusOnTurrets();
        break;

      case 4:
        setSelectedFeature('numbers');
        focusOnNumbers();
        break;

      case 5:
        setSelectedFeature('index');
        focusOnDefault();
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
        focusOnBallTrack();
        break;

      case 'turrets':
        setCurrentPage(3);
        focusOnTurrets();
        break;

      case 'numbers':
        setCurrentPage(4);
        focusOnNumbers();
        break;

      case 'index':
        setCurrentPage(5);
        focusOnDefault();
        break;

      default:
        break;
    }
  };

  function handleScreenShot() {
    const dataUrl = takeScreenshot('image/jpg', 0.5);
    window.open(dataUrl, '_blank');
  }

  function focusOnTurrets() {
    sendMessage('Cameras', 'FocusOnTurrets');
  }
  function focusOnBallTrack() {
    sendMessage('Cameras', 'FocusOnBallTrack');
  }
  function focusOnNumbers() {
    sendMessage('Cameras', 'FocusOnWheelNumbers');
  }
  function focusOnDefault() {
    sendMessage('Cameras', 'UnFocusFromTarget');
  }

  function handlePointerLock() {
    requestPointerLock();
  }

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
            unityProvider={unityProvider}
            className='unity-canvas'
            onClick={handlePointerLock}
          />
          <BottomOptionsMenu
            focusOnDefault={focusOnDefault}
            focusOnTurrets={focusOnTurrets}
            focusOnBallTrack={focusOnBallTrack}
            focusOnNumbers={focusOnNumbers}
            setCurrentPage={setCurrentPage}
            setSelectedFeature={setSelectedFeature}
          />
          <button
            className='sideMenu-btn'
            onClick={() => setOpenSideMenu((prev) => !prev)}
          >
            <DotsVerticalIcon width={20} height={20} />
          </button>
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
              focusOnBallTrack={focusOnBallTrack}
              focusOnDefault={focusOnDefault}
              focusOnNumbers={focusOnNumbers}
              focusOnTurrets={focusOnTurrets}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              selectedFeature={selectedFeature}
              currentPage={currentPage}
              handleFeatureSelect={handleFeatureSelect}
            />
          </LazyMotion>
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {screenshotModalOpen && (
          <ScreenshotModal
            screenshotImage={screenshotImage}
            downloadScreenshot={downloadScreenshot}
            closeModal={closeModal}
          />
        )}
      </AnimatePresence> */}
    </Fragment>
  );

  // const takeScreenshotAndShowModal = () => {
  //   if (contentRef.current) {
  //     html2canvas(contentRef.current).then((canvas) => {
  //       const screenshotURL = canvas.toDataURL('image/jpeg');
  //       setScreenshotImage(screenshotURL);
  //       setScreenshotURL(screenshotURL);
  //       setScreenshotModalOpen(true);
  //     });
  //   }
  // };

  // const downloadScreenshot = () => {
  //   const a = document.createElement('a');
  //   a.href = screenshotURL;
  //   a.download = 'Cammegh';
  //   a.click();
  // };
}
