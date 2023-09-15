import { CiSettings } from 'react-icons/ci';
import { BsPlay } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { SymbolIcon} from '@radix-ui/react-icons';
import './BottomOptionsMenu.css';

export default function BottomOptions({ takeScreenshotAndShowModal }) {
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
          <input className='radio-btn' type='radio' name='radioGroup' id='1' />
          <input className='radio-btn' type='radio' name='radioGroup' id='2' />
          <input className='radio-btn' type='radio' name='radioGroup' id='3' />
          <input className='radio-btn' type='radio' name='radioGroup' id='4' />
          <input className='radio-btn' type='radio' name='radioGroup' id='5' />
          <input className='radio-btn' type='radio' name='radioGroup' id='6' />
          <input className='radio-btn' type='radio' name='radioGroup' id='7' />
        </div>
      </div>

      <div className='screenshot bottom-option'>
        <div className='bottom-option-header'>Screenshot</div>
        <div onClick={takeScreenshotAndShowModal} className='option-icon'>
          <FiCamera />
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
