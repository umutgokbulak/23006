import { BiHelpCircle } from 'react-icons/bi';
import { m } from 'framer-motion';
import { Fragment, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ToolTip from './ToolTip';
import ballTracks from '../../../data/BallTracks.json';
import '../SideMenuOptions/SideMenuOptions.css';

const BallTracks = memo(function BallTracks({
  onSelect,
  windowWidth,
  mouseEntered,
  setUrl,
  url,
  changeMaterial,
}) {
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
        {ballTracks.styles.map((style, styleIndex) => (
          <Fragment key={styleIndex}>
            {styleIndex > 0 && <hr className='divider' />}
            <div className='style-container'>
              <div className='option-style'>
                {style.styleType}
                <ToolTip
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
                      url.ballTrackId === item.id ? 'active' : ''
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
                          ballTrackId: item.id,
                          ballTrackImg: item.imagePath,
                          ballTrackName: item.imageName,
                          ballTrackStyle: item.style,
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

export default BallTracks;


{/* <m.section
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
    </m.section> */}