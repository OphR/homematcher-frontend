import HeaderConnected from './HeaderConnected'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfil } from '../reducers/user';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Profil() {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    
    // Hooks d'états pour les inputs:
    const [selectedImage, setSelectedImage] = useState(null);
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const [delay, setDelay] = useState(0);
    const [budget, setBudget] = useState(10000);
    const [financed, setFinanced] = useState(false);
    const [message, setMessage] = useState('');
    //console.log(selectedImage)

    // Changer d'Avatar
    const handleImageChange = (event) => {
        setSelectedImage(event.target.value);
    };

//Modifier les données pour le fetch
    useEffect(() => {
        fetch('https://homematcher-backend.vercel.app/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}` 
          },
        })
          .then(response => response.json())
          .then(data => {
        data.result && dispatch(UpdateProfil({
            username: data.user.username,
            delay: data.user.delay,
            financed: data.user.financed,
            budget: data.user.budget,
            desciption: data.user.desciption,
            likedBy: data.user.likedBy
        })
        );
        setUsername(data.user.username);
        setDelay(data.user.delay);
        setFinanced(data.user.financed);
        setDescription(data.user.description);
        setBudget(data.user.budget)
        setSelectedImage(data.user.selectedImage)
          });
      }, []);

const handleSubmit = () => {
    fetch('https://homematcher-backend.vercel.app/users/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${user.token}`
          },
          body: JSON.stringify({ 
            username,
            delay,
            financed,
            budget,
            description,
            selectedImage,
        }),
    }).then(response => response.json()).then(data => {
        console.log(data)
        setMessage("Profil mis à jour !")
       // data.result && dispatch(UpdateProfil(
    
    })
}


    //Budget
    const minBudget = 0;
    const maxBudget = 1000000
  
    const handleBudgetChange = (e) => {
      let newBudget = parseInt(e.target.value);
      newBudget = Math.round(newBudget / 10000) * 10000;
      newBudget = Math.min(Math.max(minBudget, newBudget), maxBudget);
      setBudget(newBudget);
    };
  
    //Délai
    const minDelay = 0;
    const maxDelay = 52; 
  
    const handleDelayChange = (e) => {
    let newDelay = parseInt(e.target.value);
    newDelay = Math.min(Math.max(minDelay, newDelay), maxDelay);
    setDelay(newDelay);
  };

    return (
<div className="main">
        <HeaderConnected/>
    <div className="profilContainer">
        <div className="leftContainer">
            <div className="profilPic">
                {selectedImage && <img src={selectedImage} alt="Profil" className="selectedImage" />}                        
                <select className="avatarbutton" onChange={handleImageChange}>
                    <option className="p" value="">Choisis ton avatar</option>
                    <option className="p" value="./avatar1.jpg">Avatar 1</option>
                    <option className="p" value="./avatar2.jpg">Avatar 2</option>
                    <option className="p" value="./avatar3.jpg">Avatar 3</option>
                    <option className="p" value="./avatar4.jpg">Avatar 4</option>
                    <option className="p" value="./avatar5.jpg">Avatar 5</option>
                    <option className="p" value="./avatar6.jpg">Avatar 6</option>
                    <input type="hidden" className="input" />
                </select>
            </div>
        </div>
        <div className="rightContainer">
            <h4 className="h2">Mes informations:</h4>
            <div className="inputConfiguration">
                <h4 className="h4">Username :</h4>
                <input className="input" onChange={e => setUsername(e.target.value)} value={username} />
            </div>
            <div className="inputConfiguration">
                <h4 className="h4">Délai maximum:</h4>
                <input type="range" min={minDelay} max={maxDelay} value={delay} onChange={handleDelayChange} className="inputRange" />
                <span className='p'>{delay} semaine(s)</span>
            </div>
            <div className="inputConfiguration">
                <h4 className="h4">Budget maximum: </h4>
                <input type="range" min={minBudget} max={maxBudget} step={10000} value={budget} onChange={handleBudgetChange} className="inputRange" />
                <span className='p'>{budget} €</span>
            </div>
            <div>
                <h4 className="h4">Financement :</h4>
                <div >
                    <input className='p' type="radio" id="financed-yes" name="financed" value={true} checked={financed === true} onChange={() => setFinanced(true)} />
                    <label className='p' htmlFor="financed-yes">Oui</label>
                    <input type="radio" id="financed-no" name="financed" value={false} checked={financed === false} onChange={() => setFinanced(false)} />
                    <label className='p' htmlFor="financed-no">Non</label>
                </div>
                <div className="inputDesc">
                    <h4 className="h4">Quelques mots pour te décrire...</h4>
                    <input className="input" onChange={e => setDescription(e.target.value)} value={description} />
                </div>
            </div>
        </div>
    </div>
    <button onClick={handleSubmit} className="buttonUpdateProfil">
    <p className='p'> Mettre à jour mon profil </p>
    <FontAwesomeIcon icon={faCheck} className="icon" />
    </button>
    {message && <p className="p">{message}</p>}
</div>
)
}


export default Profil