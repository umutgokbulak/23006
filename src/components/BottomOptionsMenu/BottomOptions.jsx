import { CiSettings } from 'react-icons/ci';
import { BsPlay } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { SymbolIcon } from '@radix-ui/react-icons';
import './BottomOptionsMenu.css';

export default function BottomOptions({
  takeScreenshot,
  focusOnDefault,
  focusOnTurrets,
  focusOnBallTrack,
  focusOnNumbers,
  setCurrentPage,
  setSelectedFeature,
}) {
  function handleViewChange(feature, page, focusOption) {
    setSelectedFeature(feature);
    setCurrentPage(page);
    focusOption();
  }

  return (
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
            id='rims'
            checked
            onChange={() => handleViewChange('rims', 1)}
          />
          <input
            className='radio-btn'
            type='radio'
            name='radioGroup'
            id='ballstops'
            onChange={() => handleViewChange('ballStops', 2, focusOnBallTrack)}
          />
          <input
            className='radio-btn'
            type='radio'
            name='radioGroup'
            id='turrets'
            onChange={() => handleViewChange('turrets', 3, focusOnTurrets)}
          />
          <input
            className='radio-btn'
            type='radio'
            name='radioGroup'
            id='numbers'
            onChange={() => handleViewChange('numbers', 4, focusOnNumbers)}
          />
          <input
            className='radio-btn'
            type='radio'
            name='radioGroup'
            id='index'
            onChange={() => handleViewChange('index', 5, focusOnDefault)}
          />

          <input className='radio-btn' type='radio' name='radioGroup' />
          <input className='radio-btn' type='radio' name='radioGroup' />
        </div>
      </div>

      <div className='screenshot bottom-option'>
        <div className='bottom-option-header'>Screenshot</div>
        <div className='option-icon'>
          <FiCamera onClick={takeScreenshot} />
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
  );
}
