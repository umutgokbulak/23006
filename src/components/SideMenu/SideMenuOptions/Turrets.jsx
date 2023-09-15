import { BiHelpCircle } from 'react-icons/bi';
import turrets from '../../../data/Turrets.json';
import ToolTip from './ToolTip';
import { Fragment } from 'react';
import { m } from 'framer-motion';
export default function Turrets({ onSelect, selectedOption }) {
  const handleItemClick = (itemID, itemImage, itemImageName, itemStyle) => {
    onSelect({
      id: itemID,
      imagePath: `${itemImage}`,
      imageName: `${itemImageName}`,
      style: `${itemStyle}`,
    });
  };

  return (
    <section className='options-section'>
      <m.div
        layout
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='options-container turrets'
      >
        {turrets.styles.map((style, styleIndex) => (
          <Fragment key={styleIndex}>
            {styleIndex > 0 && <hr className='divider' />}
            <div className='style-container'>
              <div className='option-style'>
                {style.styleType}
                <ToolTip text={style.description}>
                  <BiHelpCircle className='side-options-icon' />
                </ToolTip>
              </div>
              <ul className='turret-list'>
                {style.items.map((item) => (
                  <m.li
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    key={item.imageName}
                    onClick={() =>
                      handleItemClick(
                        item.id,
                        item.imagePath,
                        item.imageName,
                        item.style
                      )
                    }
                  >
                    <img
                      className={`turret-img ${
                        selectedOption === item.id ? 'active' : ''
                      }`}
                      src={item.imagePath}
                      alt={item.imageName}
                    />
                    <p className='option-header'>{item.imageName}</p>
                  </m.li>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </m.div>
    </section>
  );
}
