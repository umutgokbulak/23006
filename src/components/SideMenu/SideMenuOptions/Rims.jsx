import { BiHelpCircle } from 'react-icons/bi';
import rims from '../../../data/Rims.json';
import ToolTip from './ToolTip';
import { m } from 'framer-motion';

export default function Rims({ onSelect, selectedOption }) {
  const handleItemClick = (itemID, itemImage, itemImageName) => {
    onSelect({
      id: itemID,
      imagePath: `${itemImage}`,
      imageName: `${itemImageName}`,
    });
  };

  return (
    <m.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='options-section'
    >
      <div className='options-container'>
        <div className='style-container'>
          <div className='option-style'>
            {rims.styles[0].styleType}{' '}
            <ToolTip text={rims.styles[0].description}>
              <BiHelpCircle className='side-options-icon' />
            </ToolTip>
          </div>
          <div className='option-list'>
            {rims.styles[0].items.map((item) => (
              <div className='option' key={item.imageName}>
                <ul
                  className={`option-rim ${
                    selectedOption === item.id ? 'active' : ''
                  }`}
                  onClick={() =>
                    handleItemClick(item.id, item.imagePath, item.imageName)
                  }
                >
                  <m.li initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                    <img
                      src={item.imagePath}
                      alt={item.imageName}
                      className='option-img'
                    />
                    <p className='option-header'>{item.imageName}</p>
                  </m.li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </m.section>
  );
}
