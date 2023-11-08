import { BiHelpCircle } from 'react-icons/bi';
import { Fragment, memo } from 'react';
import { m } from 'framer-motion';
import ToolTip from './ToolTip';
import numbers from '../../../data/Numbers.json';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Numbers = memo(function Numbers({
  onSelect,
  windowWidth,
  mouseEntered,
  url,
  setUrl,
  changeMaterial,
  itemQuantity,
}) {
  const handleItemClick = (itemID, itemImage, itemImageName, itemStyle) => {
    onSelect({
      id: itemID,
      imagePath: `${itemImage}`,
      imageName: `${itemImageName}`,
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
        {numbers.styles.map((style, styleIndex) => (
          <Fragment key={styleIndex}>
            {styleIndex > 0 && <hr className='divider' />}
            <div className='style-container'>
              <div className='option-style'>
                {style.styleType}
                <ToolTip
                  className='tooltip-ballstop'
                  text={style.description}
                >
                  <BiHelpCircle className='side-options-icon' />
                </ToolTip>
              </div>
              <ul className='option-list'>
                {style.items.map((item) => (
                  <li
                    key={item.id}
                    className={`ballstop-option ${
                      url.numberId === item.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      console.log(item.style);
                      handleItemClick(
                        item.id,
                        item.imagePath,
                        item.imageName,
                        item.style
                      );
                      setUrl(
                        {
                          numberId: item.id,
                          numberImg: item.imagePath,
                          numberName: item.imageName,
                          numberStyle: item.style,
                        },
                        'replaceIn'
                      );
                    }}
                  >
                    <LazyLoadImage
                      effect='blur'
                      src={item.imagePath}
                      alt=''
                      className='option-img ballstop'
                    />
                    <div className='select-ballstop-container'>
                      <p className='option-name'>{item.imageName}</p>
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
});

export default Numbers;
