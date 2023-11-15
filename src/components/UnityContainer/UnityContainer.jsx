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
  const [selectedFeature, setSelectedFeature] = useState('Top Rim Finish');
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
    if (currentPage < 15) {
      setCurrentPage(currentPage + 1);
      updateSelectedFeature(currentPage + 1);
    }
  };

  const updateSelectedFeature = (currentPage) => {
    switch (currentPage) {
      case 1:
        setSelectedFeature('Wheel Type');
        break;

      case 2:
        setSelectedFeature('Numbers');
        break;

      case 3:
        setSelectedFeature('Separator Ring');
        break;
      case 4:
        setSelectedFeature('Aurora Centre Lightning');
        break;

      case 5:
        setSelectedFeature('Halo Rim Lightning');
        break;

      case 6:
        setSelectedFeature('Top Rim Finish');
        break;

      case 7:
        setSelectedFeature('Ball Track Finish');
        break;

      case 8:
        setSelectedFeature('Centre Finish');
        break;

      case 9:
        setSelectedFeature('Inlay Strips');
        break;

      case 10:
        setSelectedFeature('Turret');
        break;

      case 11:
        setSelectedFeature('Ball Stops');
        break;

      case 12:
        setSelectedFeature('Brightwork');
        break;

      case 13:
        setSelectedFeature('Outer Bowl');
        break;

      case 14:
        setSelectedFeature('Software Features');
        break;

      case 15:
        setSelectedFeature('Index');
        break;
    }
  };

  const handleFeatureSelect = (e) => {
    setSelectedFeature(e.target.value);

    switch (e.target.value) {
      case 'Wheel Type':
        setCurrentPage(1);
        break;

      case 'Numbers':
        setCurrentPage(2);
        break;

      case 'Separator Ring':
        setCurrentPage(3);
        break;

      case 'Aurora Centre Lightning':
        setCurrentPage(4);
        break;

      case 'Halo Rim Lightning':
        setCurrentPage(5);
        break;

      case 'Rims':
        setCurrentPage(6);
        break;

      case 'Ball Track Finish':
        setCurrentPage(7);
        break;

      case 'Centre Finish':
        setCurrentPage(8);
        break;

      case 'Inlay Strips':
        setCurrentPage(9);
        break;

      case 'Turret':
        setCurrentPage(10);
        break;

      case 'Ball Stops':
        setCurrentPage(11);
        break;

      case 'Brightwork':
        setCurrentPage(12);
        break;

      case 'Outer Bowl':
        setCurrentPage(13);
        break;

      case 'Software Features':
        setCurrentPage(14);
        break;

      case 'Index':
        setCurrentPage(15);
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

  // function focusRims() {
  //   setSelectedFeature('Top Rim Finish');
  //   setCurrentPage(1);
  // }

  // function focusBallTrack() {
  //   setSelectedFeature('Ball Track Finish');
  //   setCurrentPage(2);
  // }

  // function focusCentre() {
  //   setSelectedFeature('Centre Finish');
  //   setCurrentPage(3);
  // }

  // function focusBallStops() {
  //   // sendMessage('Cameras', 'FocusOnBallTrack');
  //   setSelectedFeature('Ball Stops');
  //   setCurrentPage(4);
  // }
  // function focusTurrets() {
  //   // sendMessage('Cameras', 'FocusOnTurrets');
  //   setSelectedFeature('Turret');
  //   setCurrentPage(5);
  // }
  // function focusNumbers() {
  //   // sendMessage('Cameras', 'FocusOnWheelNumbers');
  //   setSelectedFeature('Numbers');
  //   setCurrentPage(2);
  // }
  // function focusDefault() {
  //   // sendMessage('Cameras', 'UnFocusFromTarget');
  //   setSelectedFeature('Index');
  //   setCurrentPage(15);
  // }
  // //

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
    rimStyle: StringParam,

    ballTrackId: NumberParam,
    ballTrackImg: StringParam,
    ballTrackName: StringParam,
    ballTrackStyle: StringParam,

    centreId: NumberParam,
    centreImg: StringParam,
    centreName: StringParam,
    centreStyle: StringParam,

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

    wheelId: NumberParam,
    wheelImg: StringParam,
    wheelName: StringParam,
    wheelStyle: StringParam,

    separatorId: NumberParam,
    separatorImg: StringParam,
    separatorName: StringParam,
    separatorStyle: StringParam,

    auroraId: NumberParam,
    auroraImg: StringParam,
    auroraName: StringParam,
    auroraStyle: StringParam,

    haloId: NumberParam,
    haloImg: StringParam,
    haloName: StringParam,
    haloStyle: StringParam,

    inlayId: NumberParam,
    inlayImg: StringParam,
    inlayName: StringParam,
    inlayStyle: StringParam,

    brightworkId: NumberParam,
    brightworkImg: StringParam,
    brightworkName: StringParam,
    brightworkStyle: StringParam,

    outerBowlId: NumberParam,
    outerBowlImg: StringParam,
    outerBowlName: StringParam,
    outerBowlStyle: StringParam,

    softwareId: NumberParam,
    softwareImg: StringParam,
    softwareName: StringParam,
    softwareStyle: StringParam,
  });

  const [selectedItems, setSelectedItems] = useState({
    WheelType: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },

    Numbers: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
    Separator: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
    Aurora: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
    Halo: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },

    Rims: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
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
      style: '',
    },

    InlayStrips: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },

    Turrets: {
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

    Brightwork: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },

    OuterBowl: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },

    Software: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
  });

  useEffect(() => {
    if (url.wheelId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        WheelType: {
          id: url.wheelId,
          imagePath: url.wheelImg,
          imageName: url.wheelName,
          style: url.wheelStyle,
        },
      }));
    }

    if (url.separatorId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Separator: {
          id: url.seperatorId,
          imagePath: url.seperatorImg,
          imageName: url.seperatorName,
          style: url.seperatorStyle,
        },
      }));
    }

    if (url.auroraId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Aurora: {
          id: url.auroraId,
          imagePath: url.auroraImg,
          imageName: url.auroraName,
          style: url.auroraStyle,
        },
      }));
    }

    if (url.haloId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Halo: {
          id: url.haloId,
          imagePath: url.haloImg,
          imageName: url.haloName,
          style: url.haloStyle,
        },
      }));
    }

    if (url.inlayId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        InlayStrips: {
          id: url.inlayId,
          imagePath: url.inlayImg,
          imageName: url.inlayName,
          style: url.inlayStyle,
        },
      }));
    }

    if (url.brihghtworkId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Brightwork: {
          id: url.brihghtworkId,
          imagePath: url.brihghtworkImg,
          imageName: url.brihghtworkName,
          style: url.brihghtworkStyle,
        },
      }));
    }

    if (url.outerBowlId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        OuterBowl: {
          id: url.outerBowlId,
          imagePath: url.outerBowlImg,
          imageName: url.outerBowlName,
          style: url.outerBowlStyle,
        },
      }));
    }

    if (url.softwareId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Software: {
          id: url.softwareId,
          imagePath: url.softwareImg,
          imageName: url.softwareName,
          style: url.softwareStyle,
        },
      }));
    }

    if (url.rimId >= 0) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        Rims: {
          id: url.rimId,
          imagePath: url.rimImg,
          imageName: url.rimName,
          style: url.rimStyle,
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
    }

    if (url.centreId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Centre: {
          id: url.centreId,
          imagePath: url.centreImg,
          imageName: url.centreName,
          style: url.centreStyle,
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
          style: url.ballTrackStyle,
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
