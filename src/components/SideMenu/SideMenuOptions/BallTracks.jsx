import { BiHelpCircle } from 'react-icons/bi';
import { m } from 'framer-motion';
import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ToolTip from './ToolTip';
import ballTracks from '../../../data/BallTracks.json';
import '../SideMenuOptions/SideMenuOptions.css';

const BallTracks = memo(function Rims({
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
                    changeMaterial(`balltrack-${url.ballTrackName}`);
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
    </m.section>
  );
});

export default BallTracks;
