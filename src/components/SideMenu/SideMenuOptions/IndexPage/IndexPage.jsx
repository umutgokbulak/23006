import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useState } from 'react';
import MailFormModal from './MailFormModal';


export default function IndexPage({ selectedItems }) {
  const [mailMeModal, setMailMeModal] = useState(false);

  function toggleMailModal() {
    setMailMeModal((prev) => !prev);
  }

  return (
    <m.section
      className='index-section'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ul className='chosen-option-list'>
        {Object.entries(selectedItems).map(
          ([componentName, selectedItem], index) => (
            <li key={componentName}>
              {index > 0 && <hr className='divider-index' />}
              {selectedItem.id !== null ? (
                <div className='chosen-option'>
                  <img
                    className={`chosen-img ${
                      componentName === componentName ? componentName : ''
                    }`}
                    src={selectedItem.imagePath}
                    alt={selectedItem.imageName}
                  />
                  <p className='chosen-text'>
                    {componentName === 'Rims' &&
                      `${selectedItem.imageName} Top Rim`}
                    {componentName === 'BallStops' &&
                      `x${selectedItem.quantity} ${selectedItem.style} Ball Stops in ${selectedItem.imageName}`}
                    {componentName === 'Turrets' &&
                      `${selectedItem.style} Turret, ${selectedItem.imageName}`}
                    {componentName === 'Numbers' && `${componentName} Top Rim`}
                  </p>
                </div>
              ) : (
                <p className='not-selected-text'>
                  No items selected for {componentName}
                </p>
              )}
            </li>
          )
        )}

        <hr className='divider-index' />
      </ul>
      <div className='index-container'>
        <AnimatePresence>
          {mailMeModal && (
            <LazyMotion features={domAnimation}>
              <m.div>
                <MailFormModal toggleMailModal={toggleMailModal} />
              </m.div>
            </LazyMotion>
          )}
        </AnimatePresence>
        <div className='save'>
          <p className='save-text'>Save This Design:</p>
          <button
            onClick={() => toggleMailModal()}
            className='index-btn mail-me'
          >
            E-Mail to Me...
          </button>
          <button className='index-btn contact-cammegh'>
            Contact Cammegh...
          </button>
        </div>
      </div>
    </m.section>
  );
}