import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Header from './Header.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedMainElement from './ProtectedMainElement.js';
import Register from './Register.js';
import Login from './Login.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isDeleteCard, setDeletecard] = useState({})
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isAchieve, setIsAchieve] = useState(false)


  const transfer = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getInitialCards(), api.getInfoUser()])
        .then(([infoCard, infoUser]) => {
          setCurrentUser(infoUser.data)
          setCards(infoCard.data)
        })
        .catch((error => console.error(`Не получилось загрузить данные ${error}`)))
    }
  }, [isLoggedIn])

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      auth.getUserToken(token)
        .then((res) => {
          setLoggedIn(true)
          setUserEmail(res.data.email)          
          transfer('/')
        })
        .catch((error => console.error(`Не получилось авторизоваться повторно ${error}`)))
    } else {
      setLoggedIn(false)
    }
  }, [transfer])

  function handleCardLike(card) {
    const isLiked = card.likes.some((element) => element === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
      })

      .catch((error => console.error(`Не получилось изменить лайк ${error}`)))
  }

  function handleDeleteClick(cardId) {
    setDeleteCardPopupOpen(true)
    setDeletecard(cardId)
  }

  function handleCardDelete(e) {
    e.preventDefault()
    api.deleteCards(isDeleteCard)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== isDeleteCard
        }))
        closeAllPopups()
      })
      .catch((error => console.error(`Не получилось удалить карточку ${error}`)))
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleUpdateUser(data) {
    api.replaceUserData(data)
      .then(res => {
        setCurrentUser(res.data)
        closeAllPopups()

      })
      .catch((error => console.error(`Не получилоcь загрузить данные пользователя ${error}`)))
  }

  function handleUpdateAvatar(data) {
    api.replaceAvatar(data)
      .then(res => {
        setCurrentUser(res.data)
        closeAllPopups()
      })
      .catch((error => console.error(`Не получилоcь загрузить аватар ${error}`)))
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((error => console.error(`Не получилоcь загрузить аватар ${error}`)))
  }

  function handleRegister(data) {
    auth.registration(data)
      .then(() => {
        setInfoTooltipOpen(true)
        setIsAchieve(true)
        transfer('/sign-in')
      })
      .catch((error) => {
        setInfoTooltipOpen(true)
        setIsAchieve(false)
        console.error(`Не получилоcь зарегистрироваться ${error}`)
      })
  }

  function handleAuthorize(data) {
    auth.authorization(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true)
        transfer('/')
      })
      .catch((error) => {
        setInfoTooltipOpen(true)
        setIsAchieve(false)
        console.error(`Не получилоcь авторизоваться ${error}`)
      })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard(null)
    setDeleteCardPopupOpen(false)
    setInfoTooltipOpen(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page-container">
        <Routes>
          <Route path='/' element={<ProtectedRoute
            cards={cards}
            element={ProtectedMainElement}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onDelete={handleDeleteClick}
            onCardLike={handleCardLike}
            userEmail={userEmail}
            onLoggedIn={isLoggedIn} />
          }>
          </Route>
          <Route path='/sign-up' element={
            <>
              <Header name='signup' />
              <Register name='signup' onRegister={handleRegister} />
            </>
          } />
          <Route path='/sign-in' element={
            <>
              <Header name='login' />
              <Login name='login' onLoggedIn={handleAuthorize} />
            </>
          } />
        </Routes>
        <Footer />
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          name='delete-card'
          title='Вы уверены?'
          buttonText='Да'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          name='info-tool'
          isOpen={isInfoTooltipOpen}
          isAchieve={isAchieve}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
