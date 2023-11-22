import { BiHelpCircle } from 'react-icons/bi';
import { m } from 'framer-motion';
import { Fragment, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ToolTip from './ToolTip';
import rims from '../../../data/Rims.json';
import '../SideMenuOptions/SideMenuOptions.css';

const Rims = memo(function Rims({
  onSelect,
  windowWidth,
  mouseEntered,
  setUrl,
  url,
  changeMaterial,
}) {
  const handleItemClick = (
    itemID,
    itemImage,
    itemImageName,
    itemStyle,
    matId
  ) => {
    onSelect({
      id: itemID,
      imagePath: `${itemImage}`,
      imageName: `${itemImageName}`,
      style: `balltrack-${itemStyle}`,
    });

    setUrl(
      {
        rimId: itemID,
        rimImg: itemImage,
        rimName: itemImageName,
        rimStyle: itemStyle,
      },
      'replaceIn'
    );
    changeMaterial(`toprim-${matId}-${itemStyle}`);
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
        {rims.styles.map((style, styleIndex) => (
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
                      url.rimId === item.id ? 'active' : ''
                    }`}
                    onClick={() => {
                      handleItemClick(
                        item.id,
                        item.imagePath,
                        item.imageName,
                        item.style,
                        item.matId
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

export default Rims;

{
  /* <m.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`options-section ${
        windowWidth < 1520 && mouseEntered ? 'scrollX' : ''
      }`}
    >
      <div className='options-container'>
        <div className='style-container'>
          <div className='option-style'>
            {ballTracks.styles[0].styleType}
            <ToolTip text={ballTracks.styles[0].description}>
              <BiHelpCircle className='side-options-icon' />
            </ToolTip>
          </div>
          <div className='option-list'>
            {ballTracks.styles[0].items.map((item) => (
              <div
                className='option'
                key={item.imageName}
              >
                <ul
                  className={`option-rim ${
                    url.ballTrackId === item.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    handleItemClick(item.id, item.imagePath, item.imageName);
                    setUrl(
                      {
                        ballTrackId: item.id,
                        ballTrackImg: item.imagePath,
                        ballTrackName: item.imageName,
                        // rimStyle: item.style,
                      },
                      'replaceIn'
                    );
                    changeMaterial(`balltrack-${item.imageName}`);
                  }}
                >
                  <li>
                    <LazyLoadImage
                      effect='blur'
                      src={item.imagePath}
                      alt={item.imageName}
                      className='option-img'
                    />

                    <p className='option-name'>{item.imageName}</p>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </m.section> */
}
