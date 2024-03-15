import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import styles from '../styles/SignUp.module.css';
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
        <div className={styles.container}>
            <h2 className={styles.title}>Créer un compte</h2>
            <div className={styles.toConnect}>
                <p className={styles.p}>Vous avez déjà un compte ?</p>
                <button className={styles.connectButton} onClick={handleShowModalSignIn}>Se connecter</button>
            </div>
            <h4 className={styles.h4}>Votre e-mail:</h4>
            <input type="text" className={styles.input} onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} />
            <h4 className={styles.h4}>Votre mot de passe:</h4>
            <input type="password" className={styles.input} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
            {errorMessage && <p>{errorMessage}</p>}
            <div className={styles.connect}>
                <button className={styles.button} onClick={() => handleSubmit()}>Créer un compte</button>
                <h6 className={styles.h6}>ou</h6>
                <GoogleLogin
                    clientId="313442107107-r67n8849np3ndu8sqllj4qblsbd0eh7c.apps.googleusercontent.com"
                    buttonText="Sign Up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
            <Modal onCancel={handleCancelSignIn} open={signInModal} footer={null}>
                <SignIn />
            </Modal>
        </div>
    );
}

export default SignUp;
