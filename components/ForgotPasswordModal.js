import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { showSignInModal, showSignUpModal,closeForgotPassword } from '../reducers/modal.js';
import styles from '../styles/ForgotPasswordModal.module.css';


const ForgotPasswordModal = () => {


const[email, setEmail] = useState(null)
const dispatch = useDispatch();
const [resMessage, setResMessage] = useState('');


const handleSubmit = ()=>{
    fetch('https://homematcher-backend.vercel.app/users/forgotpassword', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
})
 .then(response => response.json())
 .then(data => {
  if(data.result){
    console.log(data);
    setResMessage(data.message);
  }else{
    setResMessage(data.error);
  }
  
   
 });
}
const handleConnection =()=>{
    dispatch(showSignInModal());
    dispatch(closeForgotPassword())
}

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Réinitialisation du mot de passe</h2>
      <h3 className={styles.h3}>Mot de passe oublié ?</h3>
      <p className={styles.p}>Saisissez votre e-mail relié à votre compte. S'il est reconnu, vous recevrez un e-mail vous permettant de mettre à jour votre mot de passe.</p>
      <h4 className={styles.h4}>Votre e-mail: </h4>
      <input className={styles.input} type="email"  placeholder="Votre adresse e-mail" value={email}  onChange={(e) => setEmail(e.target.value)} />
        <button className={styles.button} type="submit" onClick={handleSubmit}> Envoyer</button>
        {resMessage && <p>{resMessage}</p>}
      <p className={styles.p}>J'ai retrouvé mon mot de passe :<button  className={styles.connectButton} onClick={()=>handleConnection()} type='button' >Se connecter</button></p>
    </div>
  );

};


export default ForgotPasswordModal;