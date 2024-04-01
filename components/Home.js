import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { showSignInModal } from '../reducers/modal.js';
import Header from './Header';
import ImageCarrousel from './Carrousel';
import click from "../public/click.wav";

function Home() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAcheterClick = () => {
    let audio = new Audio(click);
    audio.play();
    if(!user.token) {
      dispatch(showSignInModal());
    }else {
      router.push('/ProfilPage');
    }
  };

  const handleVendreClick = () => {
    let audio = new Audio(click);
    audio.play();
    if(!user.token) {
      dispatch(showSignInModal());
    }else {
      router.push('/RealtysPage');
    }
  };
  const images = [
    "appart1.jpg",
    "appart2.jpg",
    "appart3.jpg"
  ]

  return (
    <div className="main">
        <Header/>
      <div className="middleContent">
        <h1 className="h2">Quel est votre Projet ?</h1>
        <button className="achat" onClick={handleAcheterClick}>Acheter</button><br></br>
        <button className="vente" onClick={handleVendreClick}>Vendre</button>
      </div>
      <div className="contentBlockparent">
      <div className="contentBlock">
        <h3 className="h4">Qui sommes nous ?</h3>
        <p className="p text">Bienvenue chez Home Matcher, votre partenaire de confiance dans la recherche de votre prochain chez-vous. Nous sommes un collectif passionné d'experts en technologie, en immobilier et en design d'expérience utilisateur, unis par la vision commune de simplifier la quête souvent complexe et stressante du logement parfait.
        <br/><br/>
Fondée en 2024, notre mission chez HomeMatcher est de transformer la façon dont les individus et les familles trouvent leur maison idéale. Nous croyons que la recherche d'un nouveau foyer devrait être une expérience excitante, transparente et personnalisée. <br/><br/>Pour réaliser cette vision, nous avons développé une plateforme innovante qui combine intelligence artificielle, données immobilières précises et interfaces intuitives pour offrir à chacun une expérience de recherche sur mesure.</p>
      </div>
      <div className="contentBlock contentCarrousel">
        <ImageCarrousel images={images}/>
        <p className="p special">Ils nous ont fait confiance !</p>
      </div>
      <div className="contentBlock">
        <h3 className="h4">Pourquoi choisir Home Matcher ?</h3>
        <p className="p text">Dans le monde en constante évolution de l'immobilier, il est essentiel 
          de choisir un partenaire qui non seulement comprend
           vos besoins mais s'engage également à les servir sans vous imposer 
           de charges supplémentaires inutiles. Voici pourquoi Home Matcher est votre choix idéal pour trouver le logement de vos rêves, sans les tracas habituels des frais de dossier :
           <br/>
           <br/>
1. <strong>Économies significatives </strong> : L'un des avantages immédiats de choisir HomeMatcher réside dans notre engagement à ne pas prélever de frais de dossier pour vos achats de biens. Dans un secteur où ces frais peuvent rapidement s'accumuler, choisir HomeMatcher signifie réaliser des économies substantielles, vous permettant d'investir davantage dans votre futur chez-vous.
<br/>
<br/>
2. <strong>Transparence totale </strong> : Nous croyons en une approche transparente de l'immobilier. Chez HomeMatcher, il n'y a pas de coûts cachés ni de surprises de dernière minute. Notre politique de non-prélèvement de frais de dossier témoigne de notre engagement envers une transparence totale et une confiance mutuelle avec nos utilisateurs.</p>
      </div>
    </div>
</div>
  );
}

export default Home;
