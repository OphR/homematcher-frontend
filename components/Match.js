import HeaderConnected from './HeaderConnected'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

function Match() {
    const user = useSelector((state) => state.user.value);
    const [match, setMatch] = useState([])
    console.log(user)
    useEffect(() => { 
        fetch(`https://homematcher-backend.vercel.app/users/${user}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
          },
        }).then(response => response.json())
          .then(data => {
            console.log(data)
            setMatch(data.result)
          })
    }, [])
    
    


    return (
      <div className="main">
              <HeaderConnected/>
          <div className="match">
                  <img src='./Avatar1.jpg' className="profilpic" />
                  <h4 className="h4">Utilisateur</h4>
                  <p className="p"> Vous avez un nouveau message !</p>
                  <FontAwesomeIcon icon={faMessage} className="iconNotifications" />
          </div>
      </div>
  );
}

export default Match;