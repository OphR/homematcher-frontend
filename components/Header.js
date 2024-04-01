import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Import Style et Logo
import Image from 'next/image';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';
//Modales de connexion/inscription
import { Modal } from 'antd';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { showSignInModal, showSignUpModal, hideSignUpModal, hideSignInModal } from '../reducers/modal.js';
//Liens
import Link from 'next/link';
import { logout } from '../reducers/user'; 
import click from "../public/click.wav";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(state => state.user.value)
    const signInModal = useSelector(state => state.modal.value.signInModalVisible)
    const SignUpModal = useSelector(state => state.modal.value.signUpModalVisible)
    const dispatch = useDispatch();

    const handleLogout = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(logout());
        };

    const handleShowModalSignIn = () => {
        dispatch(showSignInModal());
        let audio = new Audio(click);
        audio.play();
    };

    const handleShowModalSignUp = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(showSignUpModal());
    };

    const handleCancelSignUp = () => {
        dispatch(hideSignUpModal());
    };

    const handleCancelSignIn = () => {
        dispatch(hideSignInModal());
    };

const toggleMenu  = () => {
    let audio = new Audio(click);
    audio.play();
    setIsOpen(!isOpen);
    //console.log(user);
};

    let userSection;
    if (user.token) {
        userSection = (
            <div className="buttonsContainer">
                <div className="button" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    <h3 className="h3" >Mon compte</h3>
                    {isOpen && (
                    <div className="dropdownMenu">
                        <Link className="p" href="/ProfilPage"><a> Mon compte</a></Link>
                        <Link className="p" href="/RealtysPage"><a>Mes biens</a></Link>
                        <a className="p" onClick={() => handleLogout()}>Se déconnecter</a>
                    </div>
                )}
                </div>
            </div>
        );
    } else {
        userSection = (
            <div className="buttonsContainer">
                <div className="button" onClick={handleShowModalSignIn}>
                    <FontAwesomeIcon icon={faRightToBracket} className="icon" />
                    <h3 className="h3" >Se connecter</h3>
                </div>
                <div className="button" onClick={handleShowModalSignUp}>
                    <FontAwesomeIcon icon={faPen} className="icon" />
                    <h3 className="h3" >S'inscrire</h3>
                </div>
            </div>
        );

    }

    return (
        <div className="header">
            <div className="logoContainer">
                <Image className="logo" src="/logo.png" alt="Logo" width={70} height={70} />
                <h1 className="h1">Home Matcher</h1>
            </div>
            {userSection}
            {signInModal && <Modal onCancel={handleCancelSignIn} open={signInModal} footer={null} className="modal">
                <SignIn />
            </Modal>}
            {SignUpModal && <Modal onCancel={handleCancelSignUp} open={SignUpModal} footer={null} className="modal">
                <SignUp />
            </Modal>}
        </div>
    );
};

export default Header;