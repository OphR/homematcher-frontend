import React, { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { showSignInModal, closeForgotPassword } from '../reducers/modal.js';


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
    <div className="container forgotPass">
        <h5 className="h5">Réinitialisation du mot de passe</h5>
        <div className="close">
        <h4 className="h4">Mot de passe oublié ?</h4>
        <p className="p">Saisissez votre e-mail relié à votre compte. S'il est reconnu, vous recevrez un e-mail vous permettant de mettre à jour votre mot de passe.</p>
        </div>
        <h4 className="h4">Votre e-mail: </h4>
        <input className="input" type="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="buttonsignInandUp" type="submit" onClick={handleSubmit}>Envoyer</button>
        {resMessage && <p>{resMessage}</p>}
        <p className="p">J'ai retrouvé mon mot de passe :
            <button className="connectButton" onClick={() => handleConnection()} type='button'>Se connecter</button>
        </p>
    </div>
  );

};


export default ForgotPasswordModal;