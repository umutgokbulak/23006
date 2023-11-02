import { BiHelpCircle } from 'react-icons/bi';
import centre from '../../../data/Centre.json';
import ToolTip from './ToolTip';
import { m } from 'framer-motion';
import { memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Centre = memo(function Centre({
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
            {centre.styles[0].styleType}
            <ToolTip text={centre.styles[0].description}>
              <BiHelpCircle className='side-options-icon' />
            </ToolTip>
          </div>
          <div className='option-list'>
            {centre.styles[0].items.map((item) => (
              <div
                className='option'
                key={item.imageName}
              >
                <ul
                  className={`option-rim ${
                    url.centreId === item.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    handleItemClick(item.id, item.imagePath, item.imageName);
                    setUrl(
                      {
                        centreId: item.id,
                        centreImg: item.imagePath,
                        centreName: item.imageName,
                        // centretyle: item.style,
                      },
                      'replaceIn'
                    );
                    changeMaterial(`centre-${item.imageName}`);
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

export default Centre;
