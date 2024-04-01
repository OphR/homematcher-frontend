import { useState } from 'react';
import Buyer from './Buyer';
import Seller from './Seller';

function MyCriterias() {
  const [mode, setMode] = useState('seller');
 

  return (
    <div className="main">
      <div className="btnSellorBuy">
        <button className="buttonSellorBuy" style={{ backgroundColor: mode === 'buyer' ? '#D32F2F' : '#FF4D4D' }} onClick={() => setMode('buyer')}>Acheteur</button>
        <button className="buttonSellorBuy" style={{ backgroundColor: mode === 'seller' ? '#D32F2F' : '#FF4D4D' }} onClick={() => setMode('seller')}>Vendeur</button>
      </div>
  
      {mode === 'seller' ? (
        <Seller/>
      ) : (
        <Buyer />
      )}
    </div>
  );
}

export default MyCriterias;