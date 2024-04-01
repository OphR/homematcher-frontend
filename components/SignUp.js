import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import GoogleLogin from 'react-google-login';
import SignIn from './SignIn';
import { Modal } from 'antd';
import { showSignInModal, hideSignUpModal, hideSignInModal } from '../reducers/modal.js';
import click from "../public/click.wav";

function SignUp() {
    const BACKEND_URL = process.env.BACKEND_URL
    const dispatch = useDispatch();
    const router = useRouter();
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const signInModal = useSelector(state => state.modal.value.signInModalVisible)
    const [errorMessage, setErrorMessage] = useState('');

    const handleShowModalSignIn = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(showSignInModal());
        dispatch(hideSignUpModal());
    };


    const handleCancelSignIn = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(hideSignInModal());

        };

    const handleSubmit = () => {
        let audio = new Audio(click);
        audio.play();
        fetch('https://homematcher-backend.vercel.app/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
               if (data.result) {
                dispatch(login({ token: data.user.token,  email: data.user.email  }));
                setSignUpEmail('');
                setSignUpPassword('');
                dispatch(hideSignUpModal());
               } else {
                console.log(data.error)
                setErrorMessage(data.error);
               }
            });
    };

    const responseGoogle = (response) => {
        console.log(response);
    }


    return (
        <div className="container">
            <h5 className="h5">Créer un compte</h5>
            <div className="toConnect">
                <p className="p">Vous avez déjà un compte ?</p>
                <button className="connectButton" onClick={handleShowModalSignIn}>Se connecter</button>
            </div>
            <h4 className="h4">Votre e-mail:</h4>
            <input type="text" className="input" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} />
            <h4 className="h4">Votre mot de passe:</h4>
            <input type="password" className="input" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
            {errorMessage && <p>{errorMessage}</p>}
                <button className="buttonsignInandUp" onClick={() => handleSubmit()}>Créer un compte</button>
                <h6 className="h6 position">ou</h6>
                <GoogleLogin
                    clientId="313442107107-r67n8849np3ndu8sqllj4qblsbd0eh7c.apps.googleusercontent.com"
                    buttonText="Sign Up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            <Modal onCancel={handleCancelSignIn} open={signInModal} footer={null}>
                <SignIn />
            </Modal>
        </div>
    );
}

export default SignUp;
