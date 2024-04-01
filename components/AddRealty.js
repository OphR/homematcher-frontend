import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import HeaderConnected from './HeaderConnected';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion, faCheck } from '@fortawesome/free-solid-svg-icons';
import ImageCarrousel from './Carrousel';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
const uniqid = require('uniqid')

const libraries = ["places"];

function AddRealty() {
  const router = useRouter();
  const token = useSelector((state) => state.user.value.token);
  
  // Hooks d'états pour les inputs:
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [livingArea, setLivingArea] = useState();
  const [outdoorArea, setOutdoorArea] = useState();
  const [rooms, setRooms] = useState();
  const [location, setLocation] = useState();
  const [terrace, setTerrace] = useState(false);
  const [typeOfRealty, setTypeOfRealty] = useState('Maison')
  const [delay, setDelay] = useState(0);
  const [budget, setBudget] = useState(10000);
  const [financed, setFinanced] = useState(false);
  const [imageUrl, setImageUrl] = useState([])
  const [showDocs, setShowDocs] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [filesSelected, setFilesSelected] = useState(false);
  const [realtyId, setRealtyId] = useState();
  const docs = ['Le dossier de diagnostics techniques.', 'La superficie loi Carrez de la maison', 'Un justificatif d’identité, d’adresse et de situation familiale', 'Les règlements de copropriété', 'Les 3 derniers procès-verbaux des assemblées générales de copropriétaires', 'Le carnet d’entretien de la maison', 'Le dernier appel de charges', 'Les données financières et techniques de la maison '];

  const minBudget = 0;
  const maxBudget = 1000000;

  const minDelay = 0;
  const maxDelay = 52;


  const APIKEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  console.log('erreur apikey', APIKEY)
  console.log(process.env)
  const validateFields = () => {
    if (!description || !price || !livingArea || !outdoorArea || !rooms || !typeOfRealty || !delay || !budget ) {
      return false;
    }
    return true;
  };

  const handleBudgetChange = (e) => {
    let newBudget = parseInt(e.target.value);
    newBudget = Math.round(newBudget / 10000) * 10000;
    newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
    setBudget(newBudget);
    setRealtyId(uniqid())
  };

  const handleDelayChange = (e) => {
    let newDelay = parseInt(e.target.value);
    newDelay = Math.min(Math.max(minDelay, newDelay), maxDelay);
    setDelay(newDelay);
  };

  const handleInfoClick = () => {
    setShowDocs(!showDocs);
  };

  const handleButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData()
    formData.append('photoFromFront', file)
    fetch('https://homematcher-backend.vercel.app/realtys/upload', {
      method: "POST",
      body: formData
    }).then(response => response.json())
      .then(data => setImageUrl([...imageUrl, data.url]))
  };

  const handleAddRealty = () => {
    if (validateFields()) {
      fetch('https://homematcher-backend.vercel.app/realtys/addRealtys', {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ description, price, livingArea, outdoorArea, rooms, location, terrace, typeOfRealty, delay, budget, financed, imageUrl, realtyId})
      }).then(response => response.json())  
        .then(data => {
          console.log(data);
          router.push('/RealtysPage');
        })
        .catch(error => console.error('Erreur:', error));
    } else {
      setShowWarning(true); 
    }
  };

  const handleTerraceChange = (e) => {
    setTerrace(e.target.value === "true");
  };

  return (
    <div>
            <HeaderConnected />
        <div className="main">
        <button className="buttonAddRealty" onClick={handleAddRealty}> Ajouter un bien </button>
                    {showWarning && (
                        <div className="p position">
                            Veuillez renseigner tous les champs pour pouvoir ajouter votre bien.<br></br>
                            (seules les images et localisations ne sont pas obligatoires)
                        </div>
                    )}
            <div className="realtyContent">
                <div className="leftContent">
                    <div className="inputContainer">
                        <h2 className="h2"> Informations:</h2>
                        <h4 className="h4">Localisation : </h4>
                        <LoadScript googleMapsApiKey="AIzaSyCT2rUBJUBCi8pssdiVhICE4ZriXamrsjw" libraries={libraries} loading="async">
                            <Autocomplete onLoad={(autocomplete) => {
                                autocomplete.setFields(['address_component']);
                                autocomplete.setTypes(['(regions)']);
                            }}
                                onPlaceChanged={() => {}}>
                                <input className="input" type="text" placeholder="Selectionnez la ville, le département, la région ou le pays" onChange={(e) => setLocation(e.target.value)} value={location} />
                            </Autocomplete>
                        </LoadScript>
                        <h4 className="h4"> Description : </h4>
                        <input type="text" className="input" placeholder='Ecrivez une brève description du bien' onChange={(e) => setDescription(e.target.value)} value={description} />
                        <h4 className="h4">Prix de vente souhaité : </h4>
                        <input type="text" className="input" placeholder='Indiquez ici le prix en €' onChange={(e) => setPrice(e.target.value)} value={price} />
                        <h4 className="h4"> Intérieur : </h4>
                        <input type="text" className="input" placeholder='Surface habitable : ...m²' onChange={(e) => setLivingArea(e.target.value)} value={livingArea} />
                        <input type="text" className="input" placeholder='Nombre de pièces: ...' onChange={(e) => setRooms(e.target.value)} value={rooms} />
                        <h4 className="h4"> Extérieur : </h4>
                        <input type="text" className="input" placeholder='Surface du terrain : ...m²' onChange={(e) => setOutdoorArea(e.target.value)} value={outdoorArea} />
                        <div className="radioContainer">
                            <input type="radio" id="terrace-yes" name="terrace" value="true" checked={terrace} onChange={handleTerraceChange} />
                            <label className='p' htmlFor="terrace-yes">Avec terrasse</label>
                            <input type="radio" id="terrace-no" name="terrace" value="false" checked={!terrace} onChange={handleTerraceChange} />
                            <label className='p' htmlFor="terrace-no">Sans terrasse</label>
                        </div>
                        <h4 className="h4">Type de bien : </h4>
                        <input type="radio" id="typeofRealty-Maison" name="typeOfRealty" value="Maison" checked={typeOfRealty === "Maison"} onChange={() => setTypeOfRealty("Maison")} />
                        <label className='p' htmlFor="typeofRealty-Maison">Maison</label>
                        <input type="radio" id="typeOfRealty-Appartement" name="typeOfRealty" value="Appartement" checked={typeOfRealty === "Appartement"} onChange={() => setTypeOfRealty("Appartement")} />
                        <label className='p' htmlFor="typeOfRealty-Appartement">Appartement</label>
                    </div>
                </div>
                <div className="middle-Content">
                    <input type="file" id="fileInput" multiple onChange={handlePhotoChange} style={{ display: 'none' }} />
                    <button className="buttonAddRealty" onClick={handleButtonClick}>Ajouter une image</button>
                    <ImageCarrousel images={imageUrl} className="img" />
                </div>
                <div className="rightContent">
                <div>
                        <h2 className="h2">Documents Obligatoires</h2>
                        <FontAwesomeIcon onClick={handleInfoClick} className="iconDocuments" icon={faQuestion} />
                        {showDocs &&
                            <div>
                                <ul className='p'>
                                    {docs.map((doc, index) => (
                                        <li key={index}>{doc}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <div>
                            <input type="file" id="fileInput" multiple onChange={handleFileSelect} style={{ display: 'none' }} />
                            <button className="buttonAddRealty" onClick={handleButtonClick}>Documents à fournir</button>
                            {filesSelected && <FontAwesomeIcon className="downloadIcon" icon={faCheck} color="green" />}
                        </div>
                    </div>
                    <div className="buyerContainer">
                        <div>
                            <h3 className="h2"> Profil acheteur souhaité:</h3>
                            <div className="inputConfiguration">
                                <h4 className="h4">Délai :</h4>
                                <input className="inputRange" type="range" min={minDelay} max={maxDelay} value={delay} onChange={handleDelayChange}  />
                                <span p className="p">{delay} semaine(s)</span>
                            </div>
                            <div className="inputConfiguration">
                                <h4 className="h4"> Budget : </h4>
                                <input className="inputRange" type="range" min={minBudget} max={maxBudget} step={10000} value={budget} onChange={handleBudgetChange} />
                                <span p className="p">{budget} €</span>
                            </div>
                            <div className="inputConfiguration">
                                <h4 className="h4">Financement :</h4>
                                <div className="radioContainer">
                                    <input type="radio" id="financed-yes" name="financed" value={true} checked={financed === true} onChange={() => setFinanced(true)} />
                                    <label  className="p" htmlFor="financed-yes">Oui</label>
                                    <input type="radio" id="financed-no" name="financed" value={false} checked={financed === false} onChange={() => setFinanced(false)} />
                                    <label className="p" htmlFor="financed-no">Non</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default AddRealty;
