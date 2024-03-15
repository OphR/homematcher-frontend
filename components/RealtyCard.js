import styles from '../styles/RealtyCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRealty } from '../reducers/realtys';
import ImageCarrousel from './Carrousel';



function RealtyCard(props) {
  const dispatch = useDispatch();

  const deleteCard = (id) => {
    fetch(`https://homematcher-backend.vercel.app/realtys/delete/${id}`, { // Utilisez l'ID de la propriété immobilière dans l'URL de l'API
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        dispatch(deleteRealty(id)); // Supprimez la propriété immobilière en utilisant l'ID
      }
    })
    .catch(error => console.error('Erreur:', error));
  };

  

  return (
    <div className={styles.card}>
       <ImageCarrousel images={props.imageUrl} className={styles.carrousel}/>
       <div className={styles.description}>
      <p className={styles.p}><strong>Localisation:</strong> &nbsp;&nbsp;{props.location}</p>
      <p className={styles.p}><strong>Description du bien:</strong> &nbsp;&nbsp;{props.description}</p>
      <p className={styles.p}><strong>Prix du bien:</strong> &nbsp;&nbsp;{props.price}€</p>
      <p className={styles.p}><strong>Surface habitable:</strong> &nbsp;&nbsp;{props.livingArea}m²</p>
      <p className={styles.p}><strong>Nombre de pièces:</strong> &nbsp;&nbsp;{props.rooms}</p>
      <p className={styles.p}><strong>Surface du terrain:</strong> &nbsp;&nbsp;{props.outdoorArea}</p>
      <p className={styles.p}><strong>Terrasse : </strong> &nbsp;&nbsp;{props.terrace ? 'Oui' : 'Non'}</p>
      <p className={styles.p}><strong>Type de bien : </strong> &nbsp;&nbsp;{props.typeOfRealty}</p>
      <h1 className={styles.p}><strong>Profil acheteur souhaité pour le bien:</strong> 
        <ul><li>Délai: &nbsp;&nbsp;{props.delay} semaine(s)<br/></li>
        <li>Budget: &nbsp;&nbsp;{props.budget}€ <br/></li>
        <li>Financement: &nbsp;&nbsp;{props.financed ? 'Oui' : 'Non'} <br/></li>
        </ul></h1>
      </div>
      <FontAwesomeIcon icon={faTimes} className={styles.delete} onClick={()=>deleteCard(props._id)} />
    </div>
  );
}

export default RealtyCard;