import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart } from '@fortawesome/free-solid-svg-icons';

function Buyer() {
  //Mes constantes d'effet
  const [budget, setBudget] = useState(10000);
  const [typeOfRealty, setTypeOfRealty] = useState('');
  const [livingArea, setLivingArea] = useState();
  const [outdoorArea, setOutdoorArea] = useState();
  const [rooms, setRooms] = useState();
  const [terrace, setTerrace] = useState(false);
  const [card, setCard] = useState([]);
  const user = useSelector((state) => state.user.value);
  const [index, setIndex] = useState(0);
  console.log(card)
  //Création Jauge Budget
  const minBudget = 0;
  const maxBudget = 1000000;

  const handleBudgetChange = (e) => {
    let newBudget = parseInt(e.target.value);
    newBudget = Math.round(newBudget / 10000) * 10000;
    newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
    setBudget(newBudget);
  };

  //Création Jauge Jardin

  const minOutdoorArea = 0;
  const maxOutdoorArea = 600;

  const handleOutdoorSurface = (e) => {
    let newOutdoorArea = parseInt(e.target.value);
    newOutdoorArea = Math.min(Math.max(minOutdoorArea, newOutdoorArea), maxOutdoorArea);
    setOutdoorArea(newOutdoorArea);
  };

  //Création Jauge Surface Habitable

  const minLivingArea = 0;
  const maxLivingArea = 600;

  const handleIndoorSurface = (e) => {
    let newLivingArea = parseInt(e.target.value);
    newLivingArea = Math.min(Math.max(minLivingArea, newLivingArea), maxLivingArea);
    setLivingArea(newLivingArea);
  };

  //Création Jauge Nombre de Pièces

  const minRooms = 1;
  const maxRooms = 10;

  const handleRooms = (e) => {
    let newRooms = parseInt(e.target.value);
    newRooms = Math.min(Math.max(minRooms, newRooms), maxRooms);
    setRooms(newRooms);
  };

  //Pouvoir Cocher Maison ET Appartement
  const handleTypeChange = (e) => {
    const { checked, value } = e.target;
    setTypeOfRealty(prevType =>
      checked ? [...prevType, value] : prevType.filter(type => type !== value)
    );
  };

  const handleSubmit = () => {
    fetch(`https://homematcher-backend.vercel.app/realtys/filteredRealtys?budget[$lt]=${budget}&typeOfRealty=${typeOfRealty}&terrace=${terrace}&livingArea[$lt]=${livingArea}&outdoorArea[$lt]=${outdoorArea}&rooms[$lt]=${rooms}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.token}` 
      },
    }).then(response => response.json())
      .then(data => {
        setCard(data.realty)
        console.log(data)
      })
  }

  const handlenone = () => {
    if (index < card.length - 1) {
      setIndex(index + 1);
    } else {
      // Quand on est arrivés à la fin du tableau, on reviens au debut 
      setIndex(0);
    }
  };

  const handleLick = () => {
    const realtyId = card[index]._id;
    console.log(realtyId)
    const action = 'realtyLike';
    fetch('https://homematcher-backend.vercel.app/notification', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `${user.token}`
    },
    body: JSON.stringify({ realtyId, action })
    }).then(response => response.json())
    .then(data => {
      if (index < card.length - 1) {
        setIndex(index + 1);
      } else {
        // Quand on est arrivés à la fin du tableau, on reviens au debut 
        setIndex(0);
      }
    console.log(data)
    })
    }

    return (
      <>
        <div className="matchContent">
        <div className="myCriteria">
          <div className="inputConfiguration">
            <label className="h4">Budget:</label>
              <input className="inputRange" type="range" min={minBudget} max={maxBudget} value={budget} onChange={handleBudgetChange} />
              <span className="p">{budget}€</span>
          </div>
          <div>
            <label className="h4">Localisation:</label>
            <LoadScript googleMapsApiKey="AIzaSyCT2rUBJUBCi8pssdiVhICE4ZriXamrsjw" libraries={["places"]} >  
              <Autocomplete onLoad={(autocomplete) => {
                autocomplete.setFields(['address_component']);
                autocomplete.setTypes(['(regions)']); 
                }}
              onPlaceChanged={() => {}}
              >
              <input className="input" type="text" placeholder="Selectionnez la ville, le département, la région ou le pays" onChange={(e) => set} />
              </Autocomplete>
              </LoadScript>
          </div>
          <div className="inputConfiguration">
            <label className="h4">Type de Bien:</label>
            <div className="p">
              <input  className="p" type="checkbox" name="type" value="Appartement" checked={typeOfRealty.includes('Appartement')} onChange={handleTypeChange} /> Appartement
              <input  className="p" type="checkbox" name="type" value="Maison" checked={typeOfRealty.includes('Maison')} onChange={handleTypeChange} /> Maison
            </div>
          </div>
          <div className="inputConfiguration">
            <label className="h4">Surface du terrain:</label>
              <input className="cursor" type="range" min={minOutdoorArea} max={maxOutdoorArea} value={outdoorArea} onChange={handleOutdoorSurface} />
              <span className="p">{outdoorArea}m²</span>
          </div>
          <div className="inputConfiguration">
            <label className="h4">Surface habitable:</label>
              <input className="cursor" type="range" min={minLivingArea} max={maxLivingArea} value={livingArea} onChange={handleIndoorSurface} />
              <span className="p">{livingArea}m²</span>
          </div>
          <div className="inputConfiguration">
            <label className="h4">Nombre de pièces:</label>
              <input className="cursor" type="range" min={minRooms} max={maxRooms} value={rooms} onChange={handleRooms} />
              <span className="p">{rooms}</span>
          </div>
          <div className="inputConfiguration">
            <label className="h4">Terrasse Exterieure:</label>
            <div className="p">
              <input className="p" type="checkbox" name="outdoor" value={true} checked={terrace} onChange={(e) => setTerrace(true)} /> Oui
              <input className="p" type="checkbox" name="outdoor" value={false} checked={!terrace} onChange={(e) => setTerrace(false)} /> Non
            </div>
          </div>
            <button className="buttonSearch" onClick={handleSubmit} >Recherche</button>
        </div>
        <div className="cardBuyer">
          {card && card.length > 0 ? (
            <div className="cardContent">
              <img className="img" src={card[index].imageUrl} />
              <p className="p">{card[index].description}</p>
              <div className="buttonRow">
                <FontAwesomeIcon icon={faXmark} className="iconNotifications" onClick={handlenone}/>
                <FontAwesomeIcon icon={faHeart} className="iconNotifications" onClick={handleLick}/>
              </div>
            </div>
          ) : (
            <p className="p notFound">Aucun bien n'a été trouvé.</p>
          )}
        </div>
        </div>
      </>
    );
}
export default Buyer;