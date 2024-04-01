import React, { useEffect, useState } from 'react';
import HeaderConnected from './HeaderConnected'
import { useSelector } from 'react-redux';
//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
function Likes() {
    const user = useSelector((state) => state.user.value);
    const [notifications, setNotifications] = useState([])
    const [selectedNotification, setSelectedNotification] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch('https://homematcher-backend.vercel.app/notification/messages', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}` // Incluez le token dans l'en-tête Authorization
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setNotifications(data.notifications)

            })
    }, [])


    const notification = notifications.map((data, i) => {
        return (
        <div key={i} className="notifications" onClick={() => handleNotificationClick(data)}>
            <div className="p strong" >{data.notificationMessage}</div>
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="iconNotifications" />
        </div>
        );
    });


    const handleDelete = async (index) => {
        try {
            const response = await fetch(`https://homematcher-backend.vercel.app/notification/${index}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${user.token}`
                }
            });
            if (response.ok) {
                const updatedNotifications = [...notifications];
                updatedNotifications.splice(index, 1);
                setNotifications(updatedNotifications);
                setShowModal(false);
            } else {
                console.error('La suppression de la notification a échoué');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la notification :', error);
        }
    };

    const handleNotificationClick = (data) => {
        setShowModal(true);
        const userId = data.by;
        console.log(userId);
        fetch(`https://homematcher-backend.vercel.app/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Une erreur s\'est produite lors de la récupération de l\'utilisateur');
                }
            })
            .then(userData => {
                console.log(userData);
                setSelectedNotification(userData.result);
                console.log(selectedNotification);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            });
    };



    const closeModal = () => {
        setShowModal(false);
    };
    const handleLick = () => {
        const email = selectedNotification.email;
        const action = 'profileLike';
        fetch('https://homematcher-backend.vercel.app/notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${user.token}`
            },
            body: JSON.stringify({ email, action })
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setShowModal(false);
            })
    }

    const Modal = ({ username, onClose }) => {
        return (
            <div className="modal">
                <div className="modalContent">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img src={selectedNotification.selectedImage} alt="Profile Picture" height={200} width={200} />
                    <h2 className="h2">{selectedNotification.username}</h2>
                    <div className="modalDescription">
                        <p className='p'><strong>Description:</strong> {selectedNotification.description}</p>
                        <p className='p'><strong>Email:</strong> {selectedNotification.email}</p>
                        <p className='p'><strong>Délai:</strong> {selectedNotification.delay}</p>
                        <p className='p'><strong>Financement:</strong> {selectedNotification.financed ? 'Oui' : 'Non'}</p>
                    </div>
                    <div className="iconContainer">
                        <FontAwesomeIcon className="iconNotifications" icon={faXmark} onClick={handleDelete} />
                        <FontAwesomeIcon className="iconNotifications" icon={faHeart} onClick={handleLick} />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="main">
            <HeaderConnected />
        <div className="notificationContainer">
            {notifications.length === 0 ? (
                <div className="p msg">Vous n'avez actuellement aucune notification.</div>
            ) : (
                notification
            )}
        </div>
        {showModal && (
            <Modal onClose={closeModal} />
        )}
    </div>
);
}

export default Likes;