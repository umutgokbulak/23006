import { CiSettings } from 'react-icons/ci';
import { BsPlay, BsPlayFill } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { SymbolIcon } from '@radix-ui/react-icons';
import { LazyMotion, domAnimation, m } from 'framer-motion';

export default function BottomOptionsSide({
  focusDefault,
  focusTurrets,
  focusBallTrack,
  focusNumbers,
  currentPage,
  handleScreenShot,
  setSelectedFeature,
  setCurrentPage,
  openOptions,
  isLoaded,
  isSideMenuOpen,
}) {
  function handleRims() {
    setSelectedFeature('Rims');
    setCurrentPage(1);
  }
  return (
    <>
      {openOptions && (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.2,
              type: 'spring',
              damping: 25,
              stiffness: 300,
            }}
            className='container-bottom-menu-narrow'
          >
            <m.div className='side-options'>
              <div className='side-option spin'>
                <div className='side-option-text'>Spin</div>
                <div>
                  <SymbolIcon
                    width={30}
                    height={40}
                    className='side-option-icon'
                  />
                </div>
              </div>
              <div className='side-option play'>
                <div className='side-option-text'>Play</div>
                <div>
                  <BsPlayFill className='side-option-icon' />
                </div>
              </div>
              <div className='side-option screenshot'>
                <div className='side-option-text'>Screenshot</div>
                <div>
                  <FiCamera
                    className='side-option-icon'
                    onClick={handleScreenShot}
                  />
                </div>
              </div>
              <div className='side-option settings'>
                <div className='side-option-text'>Settings</div>
                <div>
                  <CiSettings className='side-option-icon' />
                </div>
              </div>
              <div className='side-option help'>
                <div className='side-option-text'>Help</div>
                <div className='side-option-icon'>
                  <BiHelpCircle className='side-option-icon' />
                </div>
              </div>
            </m.div>
          </m.div>
        </LazyMotion>
      )}
      {isLoaded && (
        <div
          className=' relative-views'
          style={
            isSideMenuOpen
              ? { marginBottom: '1rem' }
              : { marginBottom: '3.5rem' }
          }
        >
          <div className='bottom-option-header'>Views</div>
          <div className='view-container'>
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              checked={currentPage === 1}
              id='rims'
              onChange={handleRims}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='ballstops'
              checked={currentPage === 2}
              onChange={focusBallTrack}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='turrets'
              checked={currentPage === 3}
              onChange={focusTurrets}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='numbers'
              checked={currentPage === 4}
              onChange={focusNumbers}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='index'
              checked={currentPage === 5}
              onChange={focusDefault}
            />
            <input className='radio-btn' type='radio' name='radioGroup' />
            <input className='radio-btn' type='radio' name='radioGroup' />
          </div>
        </div>
      )}
    </>
  );
}
