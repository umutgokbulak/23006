import { useState, useEffect, Suspense, useCallback } from 'react';
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
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';

export default function UnityContainer({
  setItemQuantity,
  itemQuantity,
  handleHelp,
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
  //

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
    if (currentPage < 7) {
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
        setSelectedFeature('Ball Tracks');
        focusBallTrack();
        break;

      case 3:
        setSelectedFeature('Centre');
        focusCentre();
        break;

      case 4:
        setSelectedFeature('Ball Stops');
        focusBallStops();
        break;

      case 5:
        setSelectedFeature('Turrets');
        focusTurrets();
        break;

      case 6:
        setSelectedFeature('Numbers');
        focusNumbers();
        break;

      case 7:
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
        focusRims();
        break;

      case 'Ball Tracks':
        setCurrentPage(2);
        focusBallTrack();
        break;

      case 'Centre':
        setCurrentPage(3);
        focusCentre();
        break;

      case 'Ball Stops':
        setCurrentPage(4);
        focusBallStops();
        break;

      case 'Turrets':
        setCurrentPage(5);
        focusTurrets();
        break;

      case 'Numbers':
        setCurrentPage(6);
        focusNumbers();
        break;

      case 'Index':
        setCurrentPage(7);
        focusDefault();
        break;

      default:
        break;
    }
  };
  // DYMAMIC DEVICE PIXEL RATIO
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
  //
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

  // CAMERA FOCUS ANIMATION FUNCTIONS

  function focusRims() {
    setSelectedFeature('Rims');
    setCurrentPage(1);
  }

  function focusBallTrack() {
    setSelectedFeature('Ball Tracks');
    setCurrentPage(2);
  }

  function focusCentre() {
    setSelectedFeature('Centre');
    setCurrentPage(3);
  }

  function focusBallStops() {
    // sendMessage('Cameras', 'FocusOnBallTrack');
    setSelectedFeature('Ball Stops');
    setCurrentPage(4);
  }
  function focusTurrets() {
    // sendMessage('Cameras', 'FocusOnTurrets');
    setSelectedFeature('Turrets');
    setCurrentPage(5);
  }
  function focusNumbers() {
    // sendMessage('Cameras', 'FocusOnWheelNumbers');
    setSelectedFeature('Numbers');
    setCurrentPage(6);
  }
  function focusDefault() {
    // sendMessage('Cameras', 'UnFocusFromTarget');
    setSelectedFeature('Index');
    setCurrentPage(7);
  }
  //

  // CHANGINGMATERIAL FUNCTION
  const changeMaterial = useCallback(
    (partNmaterial) => {
      sendMessage('ConfigurationManager', 'ChangeMaterialOf', partNmaterial);
    },
    [sendMessage]
  );

  // SPINING ROULETTE ANIMATION
  const [changeSpin, setChangeSpin] = useState(false);

  function spinRoulette() {
    sendMessage('AnimationManager', 'RotateAroundAxis');
    setChangeSpin(true);
  }

  function stopRouletteSpin() {
    sendMessage('AnimationManager', 'StopRotation');
    setChangeSpin(false);
  }
  //

  // CHANGE QUALITY FUNCTIONS
  function changeQualityLow() {
    sendMessage('WebGLManager', `QualitySettingsLow`);
  }
  function changeQualityMedium() {
    sendMessage('WebGLManager', `QualitySettingsMid`);
  }
  function changeQualityHigh() {
    sendMessage('WebGLManager', `QualitySettingsHigh`);
  }
  //
  //LOADING PERCENTAGE
  const loadingPercentage = Math.round(loadingProgression * 100);

  const [url, setUrl] = useQueryParams({
    rimId: NumberParam,
    rimImg: StringParam,
    rimName: StringParam,
    // rimStyle: StringParam,

    ballTrackId: NumberParam,
    ballTrackImg: StringParam,
    ballTrackName: StringParam,
    ballTrackStyle: StringParam,

    centreId: NumberParam,
    centreImg: StringParam,
    centreName: StringParam,
    // centreInlayQuantity : NumberParam,

    ballStopId: NumberParam,
    ballStopQ: NumberParam,
    ballStopImg: StringParam,
    ballStopName: StringParam,
    ballStopStyle: StringParam,

    turretId: NumberParam,
    turretImg: StringParam,
    turretName: StringParam,
    turretStyle: StringParam,

    numberId: NumberParam,
    numberImg: StringParam,
    numberName: StringParam,
    numberStyle: StringParam,
  });

  const [selectedItems, setSelectedItems] = useState({
    Numbers: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },

    BallStops: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
      quantity: itemQuantity,
    },

    Rims: {
      id: null,
      imagePath: '',
      imageName: '',
    },
    BallTracks: {
      id: null,
      imagePath: '',
      imageName: '',
    },
    Centre: {
      id: null,
      imagePath: '',
      imageName: '',
      inlayQuantity: '8',
    },

    Turrets: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
  });

  useEffect(() => {
    if (url.rimId >= 0) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        Rims: {
          id: url.rimId,
          imagePath: url.rimImg,
          imageName: url.rimName,
        },
      }));
      changeMaterial(`toprim-${url.rimName}`);
    }

    if (url.ballStopId) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        BallStops: {
          id: url.ballStopId,
          imagePath: url.ballStopImg,
          quantity: url.ballStopQ,
          imageName: url.ballStopName,
          style: url.ballStopStyle,
        },
      }));
      // changeMaterial(`ballstop-${url.ballStopName}`);
    }

    if (url.turretId) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        Turrets: {
          id: url.turretId,
          imagePath: url.turretImg,
          imageName: url.turretName,
          style: url.turretStyle,
        },
      }));
      // changeMaterial(`turret-${url.turretName}`);
    }

    if (url.numberId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Numbers: {
          id: url.numberId,
          imagePath: url.numberImg,
          imageName: url.numberName,
          style: url.numberStyle,
        },
      }));
      // changeMaterial(`number-${url.numberName}`);
    }

    if (url.centreId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Centre: {
          id: url.centreId,
          imagePath: url.centreImg,
          imageName: url.centreName,
        },
      }));
      changeMaterial(`centre-${url.centreName}`);
    }
    if (url.ballTrackId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        BallTracks: {
          id: url.ballTrackId,
          imagePath: url.ballTrackImg,
          imageName: url.ballTrackName,
        },
      }));
      changeMaterial(`balltrack-${url.ballTrackName}`);
    }

    setSelectedItems((prevSelected) => ({
      ...prevSelected,
    }));
  }, [url, changeMaterial]);

  const handleComponentSelect = (componentName, selectedItem) => {
    setSelectedItems((prevSelected) => {
      const updatedItem = { ...prevSelected[componentName], ...selectedItem };

      return {
        ...prevSelected,
        [componentName]: updatedItem,
      };
    });
  };
  // //
  return (
    <>
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
                focusBallStops={focusBallStops}
                focusNumbers={focusNumbers}
                handleScreenShot={handleScreenShot}
                setCurrentPage={setCurrentPage}
                setSelectedFeature={setSelectedFeature}
                selectedFeature={selectedFeature}
                currentPage={currentPage}
                spinRoulette={spinRoulette}
                handleHelp={handleHelp}
                changeSpin={changeSpin}
                stopRouletteSpin={stopRouletteSpin}
                changeQualityLow={changeQualityLow}
                changeQualityMedium={changeQualityMedium}
                changeQualityHigh={changeQualityHigh}
              />
            )}

            <AnimatePresence>
              {windowWidth < 675 && isLoaded && (
                <BottomOptionsSide
                  focusDefault={focusDefault}
                  focusTurrets={focusTurrets}
                  focusBallStops={focusBallStops}
                  focusNumbers={focusNumbers}
                  handleScreenShot={handleScreenShot}
                  setCurrentPage={setCurrentPage}
                  setSelectedFeature={setSelectedFeature}
                  selectedFeature={selectedFeature}
                  currentPage={currentPage}
                  openOptions={openOptions}
                  isLoaded={isLoaded}
                  isSideMenuOpen={openSideMenu}
                  spinRoulette={spinRoulette}
                  handleHelp={handleHelp}
                  changeSpin={changeSpin}
                  stopRouletteSpin={stopRouletteSpin}
                  changeQualityLow={changeQualityLow}
                  changeQualityMedium={changeQualityMedium}
                  changeQualityHigh={changeQualityHigh}
                />
              )}
            </AnimatePresence>

            {isLoaded && (
              <button
                className={`sideMenu-btn ${openSideMenu ? 'active' : ''}`}
                onClick={() => setOpenSideMenu((prev) => !prev)}
              >
                <DotsVerticalIcon
                  width={20}
                  height={20}
                />
              </button>
            )}

            {windowWidth < 675 && isLoaded && (
              <button
                className={`bottomMenu-btn ${openOptions ? 'active' : ''}`}
                onClick={() => setOpenOptions((prev) => !prev)}
              >
                <BsGear
                  width={20}
                  height={20}
                />
              </button>
            )}
          </>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {openSideMenu && isLoaded && (
          <LazyMotion features={domAnimation}>
            <Suspense fallback={<Loader />}>
              <SideMenu
                selectedItems={selectedItems}
                handleComponentSelect={handleComponentSelect}
                isSideMenuOpen={openSideMenu}
                focusBallStops={focusBallStops}
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
                changeMaterial={changeMaterial}
              />
            </Suspense>
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
    </>
  );
}
