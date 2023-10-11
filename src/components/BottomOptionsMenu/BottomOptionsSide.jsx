import { CiSettings } from 'react-icons/ci';
import { BsPlay } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { FiCamera } from 'react-icons/fi';
import { SymbolIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { LiaLessThanSolid, LiaGreaterThanSolid } from 'react-icons/lia';
export default function BottomOptionsSide() {
  const [openOptions, setOpenOptions] = useState(false);

  return (
    <aside className='container-bottom-menu-narrow'>
      <div className='bottom-side-menu'>
        <div
          className='btn-side-options'
          onClick={() => setOpenOptions((prev) => !prev)}
        >
          <LiaGreaterThanSolid />
        </div>
        <div className='side-options'>
          <div className='side-option spin'>
            <div className='side-option-text'>Spin</div>
            <div className='side-option-icon'>
              <SymbolIcon width={25} height={25} />
            </div>
          </div>
          <div className='side-option play'>
            <div className='side-option-text'>Play</div>
            <div className='side-option-icon'>
              <BsPlay />
            </div>
          </div>
          <div className='side-option screenshot'>
            <div className='side-option-text'>Screenshot</div>
            <div className='side-option-icon'>
              <FiCamera />
            </div>
          </div>
          <div className='side-option settings'>
            <div className='side-option-text'>Settings</div>
            <div className='side-option-icon'>
              <CiSettings />
            </div>
          </div>
          <div className='side-option help'>
            <div className='side-option-text'>Help</div>
            <div className='side-option-icon'>
              <BiHelpCircle />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
