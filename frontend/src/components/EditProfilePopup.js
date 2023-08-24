import React from "react";
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState } from "react";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState({})
  const [description, setDescription] = useState({})

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: name, proffesion: description });
  }

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser,isOpen]);

  return (
    <PopupWithForm
      name='edit-profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="username"
        id="name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        value={name ? name : ''}
        onChange={handleChangeName}
      />
      <span className="popup__error" id="name-error" />
      <input
        type="text"
        className="popup__input popup__input_type_about"
        name="proffesion"
        id="proffesion"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        value={description ? description : ''}
        onChange={handleChangeDescription}
      />
      <span className="popup__error" id="proffesion-error" />
    </PopupWithForm>
  );
}


