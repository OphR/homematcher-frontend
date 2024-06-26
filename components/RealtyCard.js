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
<div className="card">
   <ImageCarrousel images={props.imageUrl} />
   <div className="modalDescription">
      <p className="p"><strong>Localisation:</strong> &nbsp;&nbsp;{props.location}</p>
      <p className="p"><strong>Description du bien:</strong> &nbsp;&nbsp;{props.description}</p>
      <p className="p"><strong>Prix du bien:</strong> &nbsp;&nbsp;{props.price}€</p>
      <p className="p"><strong>Surface habitable:</strong> &nbsp;&nbsp;{props.livingArea}m²</p>
      <p className="p"><strong>Nombre de pièces:</strong> &nbsp;&nbsp;{props.rooms}</p>
      <p className="p"><strong>Surface du terrain:</strong> &nbsp;&nbsp;{props.outdoorArea}m²</p>
      <p className="p"><strong>Terrasse : </strong> &nbsp;&nbsp;{props.terrace ? 'Oui' : 'Non'}</p>
      <p className="p"><strong>Type de bien : </strong> &nbsp;&nbsp;{props.typeOfRealty}</p>
      <h1 className="p"><strong>Profil acheteur souhaité pour le bien:</strong> 
        <ul>
           <li className="p"><strong>Délai:</strong> &nbsp;&nbsp;{props.delay} semaine(s)<br/></li>
           <li className="p"><strong>Budget:</strong> &nbsp;&nbsp;{props.budget}€ <br/></li>
           <li className="p"><strong>Financement:</strong> &nbsp;&nbsp;{props.financed ? 'Oui' : 'Non'} <br/></li>
        </ul>
      </h1>
   </div>
   <FontAwesomeIcon icon={faTimes} className="iconDelete" onClick={()=>deleteCard(props._id)} />
</div>
  );
}

export default RealtyCard;