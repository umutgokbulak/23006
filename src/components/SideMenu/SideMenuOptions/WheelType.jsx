import { m } from 'framer-motion';
import { Fragment, memo, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import wheelTypeData from '../../../data/WheelType.json';
import '../SideMenuOptions/SideMenuOptions.css';

const WheelType = memo(function WheelType({
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

  const [preventSelection, setPreventSelection] = useState(false);
  const [hiddenFeatures, setHiddenFeatures] = useState([]);
  const [hiddenOptionGroups, setHiddenOptionGroups] = useState([]);

  useEffect(() => {
    const foundWheelType = wheelTypeData.styles
      .map((style) => style.items)
      .flat()
      .find((item) => item.id === url.wheelTypeId);

    if (foundWheelType) {
      const hiddenFeatureForSelectedStyle = foundWheelType.hiddenFeatures || [];
      const hiddenOptionGroupsForSelectedStyle =
        foundWheelType.hiddenOptionGroups || [];

      setHiddenOptionGroups(hiddenOptionGroupsForSelectedStyle);
      setHiddenFeatures(hiddenFeatureForSelectedStyle);
    }
  }, [url]);

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
        {wheelTypeData.styles.map((style, styleIndex) => (
          <Fragment key={styleIndex}>
            {styleIndex > 0 && <hr className='divider' />}
            <div className='style-container'>
              <ul className='option-list'>
                {style.items.map((item) => (
                  <li
                    key={item.id}
                    className={`ballstop-option ${
                      url.wheelTypeId === item.id ? 'active' : ''
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
                          wheelTypeId: item.id,
                          wheelTypeImg: item.imagePath,
                          wheelTypeName: item.imageName,
                          wheelTypeStyle: item.style,
                        },
                        'replaceIn'
                      );
                    }}
                  >
                    <LazyLoadImage
                      effect='blur'
                      src={item.imagePath}
                      alt=''
                      className='option-img ballstop wheeltype'
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

export default WheelType;
