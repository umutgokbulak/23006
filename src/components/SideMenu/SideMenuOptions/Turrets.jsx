import { BiHelpCircle } from 'react-icons/bi';
import { Suspense, memo } from 'react';
import turrets from '../../../data/Turrets.json';
import ToolTip from './ToolTip';
import { Fragment } from 'react';
import { m } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Turrets = memo(function Turrets({
  onSelect,
  windowWidth,
  mouseEntered,
  setUrl,
  url,
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
      className={`options-section turrets ${
        windowWidth < 1520 && mouseEntered ? 'scrollX' : ''
      } `}
    >
      <m.div
        layout
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='options-container'
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
                  <li
                    key={item.imageName}
                    onClick={() => {
                      handleItemClick(
                        item.id,
                        item.imagePath,
                        item.imageName,
                        item.style
                      );
                      setUrl(
                        {
                          turretId: item.id,
                          turretImg: item.imagePath,
                          turretName: item.imageName,
                          turretStyle: item.style,
                        },
                        'replaceIn'
                      );
                    }}
                  >
                    <LazyLoadImage
                      effect='blur'
                      className={`turret-img ${
                        url.turretId === item.id ? 'active' : ''
                      }`}
                      src={item.imagePath}
                      alt={item.imageName}
                    />
                    <p className='option-name'>{item.imageName}</p>
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

export default Turrets;
