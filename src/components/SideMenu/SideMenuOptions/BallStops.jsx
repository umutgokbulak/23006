import { BiHelpCircle } from 'react-icons/bi';
import { Fragment } from 'react';
import { useState } from 'react';
import { m } from 'framer-motion';
import ToolTip from './ToolTip';
import ballStops from '../../../data/BallStops.json';

export default function BallStops({
  onSelect,
  windowWidth,
  mouseEntered,
  url,
  setUrl,
}) {
  const [itemQuantity, setItemQuantity] = useState(8);

  const handleItemClick = (itemID, itemImage, itemImageName, itemStyle) => {
    onSelect({
      id: itemID,
      imagePath: `${itemImage}`,
      imageName: `${itemImageName}`,
      quantity: itemQuantity,
      style: `${itemStyle}`,
    });
  };

  return (
    <section
      className={`options-section ${
        windowWidth < 1520 && mouseEntered ? 'scrollX' : ''
      } `}
    >
      <m.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='options-container ballstop'
      >
        {ballStops.styles.map((style, styleIndex) => (
          <Fragment key={styleIndex}>
            {styleIndex > 0 && <hr className='divider' />}
            <div className='style-container'>
              <div className='option-style'>
                {style.styleType}
                <ToolTip className='tooltip-ballstop' text={style.description}>
                  <BiHelpCircle className='side-options-icon' />
                </ToolTip>
              </div>
              <ul className='option-list'>
                {style.items.map((item) => (
                  <li
                    key={item.imageName}
                    className={`ballstop-option ${
                      url.ballStopId === item.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      handleItemClick(
                        item.id,
                        item.imagePath,
                        item.imageName,
                        item.style
                      );
                      setUrl(
                        {
                          ballStopId: item.id,
                          ballStopQ: itemQuantity,
                          ballStopImg: item.imagePath,
                          ballStopName: item.imageName,
                          ballStopStyle: item.style,
                        },
                        'replaceIn'
                      );
                    }}
                  >
                    <img
                      src={item.imagePath}
                      alt=''
                      className='option-img ballstop'
                    />
                    <div className='select-ballstop-container'>
                      <p className='option-header'>{item.imageName}</p>
                      <select
                        className='ballstop-select'
                        name='ballStop'
                        id='select-ballstop'
                        onChange={(e) => setItemQuantity(e.target.value)}
                      >
                        <option value='8'>x8</option>
                        <option value='12'>x12</option>
                      </select>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </m.div>
    </section>
  );
}
