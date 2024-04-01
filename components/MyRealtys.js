import Link from 'next/link'
import HeaderConnected from './HeaderConnected';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { gitRealtys } from '../reducers/realtys';
import RealtyCard from './RealtyCard';

function MyRealtys() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const myRealty= useSelector((state) => state.realtys.value);

   // Récupération des biens immobiliers
  useEffect(() => {
    fetch('https://homematcher-backend.vercel.app/realtys', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(gitRealtys(data.realtys))
      });
  }, []);

  const realtys = myRealty.map((data, i) => {
    return <RealtyCard key={i} {...data} />;
  })

  return (
    <div className="main">
        <HeaderConnected/>
      <div className="btnContainer">
        <Link href='/AddRealtyPage'>
          <button className="buttonAddRealty"> Ajouter un bien </button>
        </Link>
      </div>
      <div className="realtycontainer">
        <div className="realtyCard">
          {realtys}
        </div>
      </div>
    </div>
  );
  
}

export default MyRealtys;