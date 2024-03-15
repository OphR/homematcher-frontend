import styles from '../styles/Profil.module.css';
import HeaderConnected from './HeaderConnected'
import React, { useState, useEffect } from 'react';
import '../styles/CarrouselAvatar.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfil } from '../reducers/user';
import { Descriptions } from 'antd';

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
<div className={styles.main}>
    <div className={styles.header}>
        <HeaderConnected/>
    </div>
    <div className={styles.container}>
        <div className={styles.leftContainer}>
            <div className={styles.profilPic}>
            {selectedImage && <img src={selectedImage} alt="Profil" className={styles.selectedImage} />}                        
            <select className={styles.avatarbutton} onChange={handleImageChange}>
                <option value="">Choisis ton avatar</option>
                <option  value="./avatar1.jpg">Avatar 1</option>
                <option  value="./avatar2.jpg">Avatar 2</option>
                <option  value="./avatar3.jpg">Avatar 3</option>
                <option  value="./avatar4.jpg">Avatar 4</option>
                <option  value="./avatar5.jpg">Avatar 5</option>
                <option  value="./avatar6.jpg">Avatar 6</option>
                <input type="hidden" className={styles.input} />
            </select>
            </div>
        </div>
        <div className={styles.rightContainer}>
           <h3 className={styles.h3}> Mes informations:</h3>
           <div className={styles.inputConfiguration}>
                <p className={styles.p}>Username :</p>
                <input className={styles.input} onChange={e => setUsername(e.target.value)} value={username} />
                </div>
                <div className={styles.inputConfiguration}>
                <p className={styles.p}>Délai maximum:</p>
                <input type="range" min={minDelay} max={maxDelay} value={delay} onChange={handleDelayChange} className={styles.inputRange}/>
                <span>{delay} semaine(s)</span>
                </div>
              <div className={styles.inputConfiguration}>
                <p className={styles.p}> Budget maximum: </p>
                <input type="range" min={minBudget} max={maxBudget} step={10000} value={budget} onChange={handleBudgetChange} className={styles.inputRange} />
                <span>{budget} €</span>
              </div>
              <div>
                <p className={styles.p}>Financement :</p>
                        <div >
                        <input type="radio" id="financed-yes" name="financed" value={true} checked={financed === true} onChange={() => setFinanced(true)} />
                        <label htmlFor="financed-yes">Oui</label>
                        <input type="radio" id="financed-no" name="financed" value={false} checked={financed === false} onChange={() => setFinanced(false)} />
                        <label htmlFor="financed-no">Non</label>
                        </div>
                <div className={styles.inputConfiguration}>
                <p className={styles.p}>Quelques mots pour te décrire...</p>
                <input className={styles.inputDesc} onChange={e => setDescription(e.target.value)} value={description}/>
                </div>
            </div>
        </div>
    </div> 
    <button onClick={handleSubmit} className={styles.button}>Mettre à jour mon profil ✓</button>
    {message && <p className={styles.check} >{message}</p>}
    
</div>
)
}


export default Profil