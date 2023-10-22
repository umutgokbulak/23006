import { Fragment, useState, useEffect, lazy } from 'react';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { BsGear } from 'react-icons/bs';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import BottomOptionsMenu from '../BottomOptionsMenu/BottomOptions';
import SideMenu from '../SideMenu/SideMenu';
import Loader from '../Utilities/Loader/Loader.jsx';
import ScreenShotModal from './ScreenShotModal';
import '../../mediaQueries.css';
import './unityContainer.css';
import './modal.css';
import BottomOptionsSide from '../BottomOptionsMenu/BottomOptionsSide';

export default function UnityContainer({
  setUrl,
  url,
  selectedItems,
  handleComponentSelect,
  setItemQuantity,
  itemQuantity,
}) {
  const [openSideMenu, setOpenSideMenu] = useState(true);
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('Rims');
  const [screenshotImage, setScreenshotImage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
          <>
            {windowWidth > 676 && isLoaded && (
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
            )}

            <AnimatePresence>
              {windowWidth < 675 && isLoaded && (
                <BottomOptionsSide
                  focusDefault={focusDefault}
                  focusTurrets={focusTurrets}
                  focusBallTrack={focusBallTrack}
                  focusNumbers={focusNumbers}
                  handleScreenShot={handleScreenShot}
                  setCurrentPage={setCurrentPage}
                  setSelectedFeature={setSelectedFeature}
                  selectedFeature={selectedFeature}
                  currentPage={currentPage}
                  openOptions={openOptions}
                  isLoaded={isLoaded}
                  isSideMenuOpen={openSideMenu}
                />
              )}
            </AnimatePresence>

            {isLoaded && (
              <button
                className={`sideMenu-btn ${openSideMenu ? 'active' : ''}`}
                onClick={() => setOpenSideMenu((prev) => !prev)}
              >
                <DotsVerticalIcon width={20} height={20} />
              </button>
            )}

            {windowWidth < 675 && isLoaded && (
              <button
                className={`bottomMenu-btn ${openOptions ? 'active' : ''}`}
                onClick={() => setOpenOptions((prev) => !prev)}
              >
                <BsGear width={20} height={20} />
              </button>
            )}
          </>
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
              windowWidth={windowWidth}
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
