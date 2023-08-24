import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const inputName = React.useRef()
    const inputLink = React.useRef()

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({ name: inputName.current.value, link: inputLink.current.value });
    }

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={inputName}
                type="text"
                className="popup__input popup__input_type_title"
                name="name"
                id="title"
                placeholder="Название"
                minLength={2}
                maxLength={30}
                required=""
            />
            <span className="popup__error" id="title-error" />
            <input
                ref={inputLink}
                type="url"
                className="popup__input popup__input_type_link"
                name="link"
                id="link"
                placeholder="Ссылка на картинку"
                required=""
            />
            <span className="popup__error" id="link-error" />
        </PopupWithForm>
    )
}