import { CiSettings } from 'react-icons/ci';
import { BsPlay } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { SymbolIcon } from '@radix-ui/react-icons';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import './BottomOptionsMenu.css';

export default function BottomOptions({
  focusDefault,
  focusTurrets,
  focusBallTrack,
  focusNumbers,
  currentPage,
  handleScreenShot,
  setSelectedFeature,
  setCurrentPage,
}) {
  // TEMPORARY FUNCTION TO UPDATE SELECTED FEATURE
  function handleRims() {
    setSelectedFeature('Rims');
    setCurrentPage(1);
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className='bottom-menu'>
        <div className='spin bottom-option'>
          <div className='bottom-option-header'>Spin</div>
          <div className='option-icon'>
            <SymbolIcon width={25} height={25} />
          </div>
        </div>

        <div className='play-game bottom-option'>
          <div className='bottom-option-header'>Play Game</div>
          <div className='option-icon'>
            <BsPlay />
          </div>
        </div>

        <div className='views bottom-option'>
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

        <div className='screenshot bottom-option'>
          <div className='bottom-option-header'>Screenshot</div>
          <div className='option-icon'>
            <FiCamera onClick={handleScreenShot} />
          </div>
        </div>

        <div className='settings bottom-option'>
          <div className='bottom-option-header'>Settings</div>
          <div className='option-icon'>
            <CiSettings />
          </div>
        </div>

        <div className='help bottom-option'>
          <div className='bottom-option-header'>Help</div>
          <div className='option-icon'>
            <BiHelpCircle />
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
