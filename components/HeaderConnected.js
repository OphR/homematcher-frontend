import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useRouter } from 'next/router';
//Import Style et Logo
import Image from 'next/image';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
//Liens
import Link from 'next/link';
import { logout } from '../reducers/user';
import click from "../public/click.wav";

function Header() {

    //Modifier nom de la page en fonction de la page actuelle
    const router = useRouter();
    const pageTitles = {
      MyCriteriasPage: ' Time to Match ! ',
      ProfilPage: 'Mon profil',
      AddRealtyPage: 'Ajouter un bien',
      MatchPage: ' Ma messagerie',
      NotificationsPage: 'Mes notifications',
      RealtysPage: 'Mes biens',
    };
  
    const lastRouteSegment = router.pathname.split('/').pop();
    const pageTitle = pageTitles[lastRouteSegment] || '';
  
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    //Fonction de déconnexion
    const handleLogout = () => {
        let audio = new Audio(click);
        audio.play();
        dispatch(logout());
        router.push('/')
      };
      
    //Fonction pour retourner à la page d'accueil
      const returnHome = () => {
        let audio = new Audio(click);
        audio.play();
        router.push('/')
      }

      return (
        <div className="header">
            <div className="logoContainer">
                <Image className="logo" src="/logo.png" alt="Logo" width={70} height={70} />
                <h1 className="h1">Home Matcher</h1>
            </div>
            <h2 className="h2 title">{pageTitle}</h2>
            <div className="buttonsContainer">
                <Link href="/MyCriteriasPage">
                    <div className="button">
                        <FontAwesomeIcon icon={faHeart} className="icon" /> 
                        <h3 className="h3" >Matchs</h3>
                    </div>
                </Link>
                <Link href="/NotificationsPage">
                    <div className="button">
                        <FontAwesomeIcon icon={faBell} className="icon" /> 
                        <h3 className="h3" >Notifications</h3>
                    </div>
                </Link>
                <Link href="/MatchPage">
                    <div className="button">
                        <FontAwesomeIcon icon={faComments}  className="icon"/> 
                        <h3 className="h3">Messagerie</h3>
                    </div>
                </Link>
                <div className="button" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faUser}  className="icon"/> 
                    <h3 className="h3">Profil</h3>
                    {isOpen && (
                        <div className="dropdownMenu">
                            <Link className="p" href="/ProfilPage"><a>Mon compte</a></Link>
                            <Link className="p" href="/RealtysPage"><a>Mes biens</a></Link>
                            <a className="p" onClick={() => handleLogout()}>Se déconnecter</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
