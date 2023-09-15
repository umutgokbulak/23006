import './sideMenu.css';
import './SideMenuOptions/sideMenuMediaQueries.css';
import { BsArrowRight } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';
import { useState } from 'react';
import Rims from './SideMenuOptions/Rims.jsx';
import Turrets from './SideMenuOptions/Turrets.jsx';
import BallStops from './SideMenuOptions/BallStops';
import IndexPage from './SideMenuOptions/IndexPage/IndexPage';
import Numbers from './SideMenuOptions/Numbers';
import { m } from 'framer-motion';

export default function SideMenu({
  selectedOptions,
  selectedItems,
  handleComponentSelect,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeature, setSelectedFeature] = useState('rims');


  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      updateSelectedFeature(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < 5) {
      setCurrentPage(currentPage + 1);
      updateSelectedFeature(currentPage + 1);
    }
  };

  const updateSelectedFeature = (page) => {
    switch (page) {
      case 1:
        setSelectedFeature('rims');
        break;

      case 2:
        setSelectedFeature('ballStops');
        break;

      case 3:
        setSelectedFeature('turrets');
        break;

      case 4:
        setSelectedFeature('numbers');
        break;

      case 5:
        setSelectedFeature('index');
        break;
    }
  };

  const handleFeatureSelect = (e) => {
    setSelectedFeature(e.target.value);

    switch (e.target.value) {
      case 'rims':
        setCurrentPage(1);
        break;

      case 'ballStops':
        setCurrentPage(2);
        break;

      case 'turrets':
        setCurrentPage(3);
        break;

      case 'numbers':
        setCurrentPage(4);
        break;

      case 'index':
        setCurrentPage(5);
        break;

      default:
        break;
    }
  };

  const selectFeatures = ['rims', 'ballStops', 'turrets', 'numbers', 'index'];

  return (
    <m.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className='sideMenu'
    >
      <div className='menuHeader'>
        <button
          className='page-down btn'
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          <BsArrowLeft className='icon' />
        </button>

        <select
          value={selectedFeature}
          onChange={handleFeatureSelect}
          className='feature-select'
          name='featureSelect'
          id=''
        >
          {selectFeatures.map((feature) => (
            <option key={feature} value={feature}>
              {feature.charAt(0).toUpperCase() + feature.slice(1)}
            </option>
          ))}
        </select>

        <button
          className='page-up btn'
          onClick={handleNext}
          disabled={currentPage === 5}
        >
          <BsArrowRight className='icon' />
        </button>
      </div>

      {selectedFeature === 'rims' && currentPage === 1 && (
        <Rims
          selectedOption={selectedOptions['Rims']}
          onSelect={(item) => handleComponentSelect('Rims', item)}
        />
      )}

      {selectedFeature === 'ballStops' && currentPage === 2 && (
        <BallStops
          onSelect={(item) => handleComponentSelect('BallStops', item)}
          selectedOption={selectedOptions['BallStops']}
        />
      )}

      {selectedFeature === 'turrets' && currentPage === 3 && (
        <Turrets
          selectedOption={selectedOptions['Turrets']}
          onSelect={(item) => handleComponentSelect('Turrets', item)}
        />
      )}

      {selectedFeature === 'numbers' && currentPage === 4 && (
        <Numbers
          selectedOption={selectedOptions['Numbers']}
          onSelect={(item) => handleComponentSelect('Numbers', item)}
        />
      )}

      {selectedFeature === 'index' && currentPage === 5 && (
        <IndexPage selectedItems={selectedItems} />
      )}
    </m.div>
  );
}
