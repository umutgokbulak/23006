import UnityContainer from './components/UnityContainer/UnityContainer';
import './App.css';
import { useState } from 'react';
import UserTutorial from './components/BottomOptionsMenu/UserTutorial';
export default function App() {
  
  const [openHelp, setOpenHelp] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(8);
  
  function handleHelp() {
    setOpenHelp((prev) => !prev);
  }

  return (
    <div className='App'>
     
      {openHelp && <UserTutorial handleHelp={handleHelp} />}
      <UnityContainer
        
        setItemQuantity={setItemQuantity}
        itemQuantity={itemQuantity}
        handleHelp={handleHelp}
      />
    </div>
  );
}
