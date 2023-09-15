import UnityContainer from './components/UnityContainer/UnityContainer';
import './App.css';
import { useState } from 'react';

function App() {
  const [selectedOptions, setSelectedOptions] = useState({
    Rims: null,
    BallStops: null,
    Turrets: null,
    Numbers: null,
  });

  const [selectedItems, setSelectedItems] = useState({
    Numbers: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
    BallStops: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
    Rims: {
      id: null,
      imagePath: '',
      imageName: '',
    },

    Turrets: {
      id: null,
      imagePath: '',
      imageName: '',
      style: '',
    },
  });

  const handleComponentSelect = (componentName, selectedItem) => {
    setSelectedItems((prevSelected) => {
      const updatedItem = { ...prevSelected[componentName], ...selectedItem };

      setSelectedOptions((prevSelectedOption) => {
        prevSelectedOption[componentName] = selectedItem.id;

        return {
          ...prevSelectedOption,
        };
      });

      return {
        ...prevSelected,

        [componentName]: updatedItem,
      };
    });
  };

  return (
    <div className='App'>
      <UnityContainer
        selectedOptions={selectedOptions}
        selectedItems={selectedItems}
        handleComponentSelect={handleComponentSelect}
      />
    </div>
  );
}

export default App;
