import { Fragment } from 'react';
import { useState } from 'react';
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

          <Unity unityProvider={unityProvider} className='unity-canvas' />
          <BottomOptionsMenu
            focusOnDefault={focusOnDefault}
            focusOnTurrets={focusOnTurrets}
            focusOnBallTrack={focusOnBallTrack}
            focusOnNumbers={focusOnNumbers}
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
