import UnityContainer from './components/UnityContainer/UnityContainer';
import './App.css';
import { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

export default function App() {
  const [itemQuantity, setItemQuantity] = useState(8);
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
      quantity: itemQuantity,
    },
    // BallTrack: {
    //   id: null,
    //   imagePath: '',
    //   imageName: '',
    //   style: '',
    // },
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

  const [url, setUrl] = useQueryParams({
    rimId: NumberParam,
    rimImg: StringParam,
    rimName: StringParam,
    // rimStyle: StringParam,

    ballStopId: NumberParam,
    ballStopQ: NumberParam,
    ballStopImg: StringParam,
    ballStopName: StringParam,
    ballStopStyle: StringParam,

    turretId: NumberParam,
    turretImg: StringParam,
    turretName: StringParam,
    turretStyle: StringParam,

    numberId: NumberParam,
    numberImg: StringParam,
    numberName: StringParam,
  });

  useEffect(() => {
    if (url.rimId >= 0) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        Rims: {
          id: url.rimId,
          imagePath: url.rimImg,
          imageName: url.rimName,
        },
      }));
    }

    if (url.ballStopId) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        BallStops: {
          id: url.ballStopId,
          imagePath: url.ballStopImg,
          quantity: url.ballStopQ,
          imageName: url.ballStopName,
          style: url.ballStopStyle,
        },
      }));
    }

    if (url.turretId) {
      setSelectedItems((prevSelected) => ({
        ...prevSelected,
        Turrets: {
          id: url.turretId,
          imagePath: url.turretImg,
          imageName: url.turretName,
          style: url.turretStyle,
        },
      }));
    }

    if (url.numberId) {
      setSelectedItems((prevselected) => ({
        ...prevselected,
        Numbers: {
          id: url.numberId,
          imagePath: url.numberImg,
          imageName: url.numberName,
        },
      }));
    }

    setSelectedItems((prevSelected) => ({
      ...prevSelected,
    }));
  }, [url]);

  const handleComponentSelect = (componentName, selectedItem) => {
    setSelectedItems((prevSelected) => {
      const updatedItem = { ...prevSelected[componentName], ...selectedItem };

      return {
        ...prevSelected,
        [componentName]: updatedItem,
      };
    });
  };

  return (
    <div className='App'>
      <UnityContainer
        selectedItems={selectedItems}
        handleComponentSelect={handleComponentSelect}
        setUrl={setUrl}
        url={url}
        setItemQuantity={setItemQuantity}
        itemQuantity={itemQuantity}
      />
    </div>
  );
}
