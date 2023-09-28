import UnityContainer from './components/UnityContainer/UnityContainer';
import './App.css';
import { useState, useEffect } from 'react';
import {
  useQueryParams,
  NumberParam,
  StringParam,
  encodeQueryParams,
} from 'use-query-params';

export default function App() {
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
      // quantity: null,
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
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      Rims: {
        id: url.rimId,
        imagePath: decodeURIComponent(url.rimImg),
        imageName: url.rimName,
      },
      BallStops: {
        id: url.ballStopId,
        imagePath: url.ballStopImg,
        imageName: url.ballStopName,
        style: url.ballStopStyle,
        quantity: url.ballStopQ,
      },
      Turrets: {
        id: url.turretId,
        imagePath: url.turretImg,
        imageName: url.turretName,
        style: url.turretStyle,
      },
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
      />
    </div>
  );
}
