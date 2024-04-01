import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user.js';
import GoogleLogin from 'react-google-login';
import SignUp from './SignUp';
import ForgotPasswordModal from './ForgotPasswordModal.js';
import { Modal } from 'antd';
import { showSignUpModal, hideSignUpModal, hideSignInModal, handleForgotPassword , closeForgotPassword} from '../reducers/modal.js';
import click from "../public/click.wav";

function SignIn() {
    const user = useSelector((state) => state.user.value);
    const BACKEND_URL = process.env.BACKEND_URL
    const dispatch = useDispatch();
    const router = useRouter();
    const SignUpModal = useSelector(state => state.modal.value.signUpModalVisible)
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const showForgotPasswordModal = useSelector(state => state.modal.value.ForgotPasswordModal)
    

    const handleShowModalSignUp = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(showSignUpModal());
        dispatch(hideSignInModal());

    };


    const handleCancelSignUp = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(hideSignUpModal());

    };

    const clickForgotPassword = () => {
        let audio = new Audio(click);
        audio.play();
        console.log('hello')
        dispatch(handleForgotPassword());
        
    }


    const handleSubmit = () => {
        let audio = new Audio(click);
        audio.play();
        fetch('https://homematcher-backend.vercel.app/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signInEmail, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if(data.result){
                    dispatch(login({ token: data.user.token,  email: data.user.email }));
                    setSignInEmail('');
                    setSignInPassword('');
                    dispatch(hideSignInModal());
                }else {
                    console.log(data.error)
                    setErrorMessage(data.error);
                }
                
            });
    };

    const responseGoogle = () => {
        console.log(response);
    }

    return (
        !showForgotPasswordModal ? (
            <div className="container">
                <h5 className="h5">Se connecter</h5>
                <div className="toConnect">
                    <p className="p">Vous n'avez pas de compte ?</p>
                    <button onClick={handleShowModalSignUp} className="connectButton">Créer un compte</button>
                </div>
                <h4 className="h4">Votre e-mail:</h4>
                <input type="text" className="input" onChange={(e) => setSignInEmail(e.target.value)} value={signInEmail} />
                <h4 className="h4">Votre mot de passe:</h4>
                <input type="password" className="input" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
                {errorMessage && <p>{errorMessage}</p>}
                <button className="buttonsignInandUp" onClick={() => handleSubmit()}>Se connecter</button>
                <button onClick={clickForgotPassword} className="forgotPassword">Mot de passe oublié ?</button>
                <h6 className="h6 position">ou</h6>
                <GoogleLogin
                    clientId="313442107107-r67n8849np3ndu8sqllj4qblsbd0eh7c.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <Modal onCancel={handleCancelSignUp} open={SignUpModal} footer={null}>
                    <SignUp />
                </Modal>
            </div>) : (
                <div className="modalContent">
                <Modal open={showForgotPasswordModal} onCancel={() => dispatch(closeForgotPassword())} footer={null}>
                    <ForgotPasswordModal />
                </Modal>
              </div>

            )
    );
}

export default SignIn;
