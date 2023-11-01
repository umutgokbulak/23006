import { CiSettings } from 'react-icons/ci';
import { BsPlay } from 'react-icons/bs';
import { BiHelpCircle, BiStop } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { SymbolIcon } from '@radix-ui/react-icons';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import './BottomOptionsMenu.css';
import { useState } from 'react';

export default function BottomOptions({
  focusDefault,
  focusTurrets,
  focusBallStops,
  focusNumbers,
  currentPage,
  handleScreenShot,
  setSelectedFeature,
  setCurrentPage,
  spinRoulette,
  handleHelp,
  changeSpin,
  stopRouletteSpin,
}) {
  // TEMPORARY FUNCTION TO UPDATE SELECTED FEATURE
  function handleRims() {
    setSelectedFeature('Rims');
    setCurrentPage(1);
  }

  const [openSettings, setOpenSettings] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <div className='bottom-menu'>
        <div className='spin bottom-option'>
          <div className='bottom-option-header'>
            {changeSpin ? 'Stop' : 'Spin'}
          </div>
          <div className='option-icon'>
            {!changeSpin ? (
              <SymbolIcon
                onClick={spinRoulette}
                width={25}
                height={25}
              />
            ) : (
              <BiStop onClick={stopRouletteSpin} />
            )}
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
              id='balltrack'
              checked={currentPage === 2}
              onChange={focusDefault}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='centre'
              checked={currentPage === 3}
              onChange={focusDefault}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='ballstops'
              checked={currentPage === 4}
              onChange={focusBallStops}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='turrets'
              checked={currentPage === 5}
              onChange={focusTurrets}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='numbers'
              checked={currentPage === 6}
              onChange={focusNumbers}
            />
            <input
              className='radio-btn'
              type='radio'
              name='radioGroup'
              id='index'
              checked={currentPage === 7}
              onChange={focusDefault}
            />
          </div>
        </div>

        <div className='screenshot bottom-option'>
          <div className='bottom-option-header'>Screenshot</div>
          <div className='option-icon'>
            <FiCamera onClick={handleScreenShot} />
          </div>
        </div>

        <div className='settings bottom-option'>
          <QualitySettings openSettings={openSettings} />
          <div className='bottom-option-header'>Settings</div>
          <div className='option-icon'>
            <CiSettings onClick={() => setOpenSettings((prev) => !prev)} />
          </div>
        </div>

        <div className='help bottom-option'>
          <div className='bottom-option-header'>Help</div>
          <div className='option-icon'>
            <BiHelpCircle onClick={handleHelp} />
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

function QualitySettings({ openSettings, classes }) {
  return openSettings ? (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: 10 }}
      className={`quality-settings`}
    >
      <div className='quality-options'>
        <div className='quality-option low'>Low</div>
        <div className='quality-option medium'>Medium</div>
        <div className='quality-option high'>High</div>
      </div>
    </m.div>
  ) : null;
}
