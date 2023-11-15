import { BiHelpCircle } from 'react-icons/bi';
import { m } from 'framer-motion';
import { Fragment, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ToolTip from './ToolTip';
import outerBowl from '../../../data/OuterBowl.json';
import '../SideMenuOptions/SideMenuOptions.css';

const OuterBowl = memo(function OuterBowl({
  onSelect,
  windowWidth,
  mouseEntered,
  setUrl,
  url,
  changeMaterial,
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
    <m.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`options-section ${
        windowWidth < 1520 && mouseEntered ? 'scrollX' : ''
      }`}
    >
      <m.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='options-container ballstop'
      >
        {outerBowl.styles.map((style, styleIndex) => (
          <Fragment key={styleIndex}>
            {styleIndex > 0 && <hr className='divider' />}
            <div className='style-container'>
              <div className='option-style'>
                {style.styleType}
                <ToolTip text={style.description}>
                  <BiHelpCircle className='side-options-icon' />
                </ToolTip>
              </div>
              <ul className='option-list'>
                {style.items.map((item) => (
                  <li
                    key={item.id}
                    className={`ballstop-option ${
                      url.outerBowlId === item.id ? 'active' : ''
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
                          outerBowlId: item.id,
                          outerBowlImg: item.imagePath,
                          outerBowlName: item.imageName,
                          outerBowltyle: item.style,
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
    </m.section>
  );
});

export default OuterBowl;
