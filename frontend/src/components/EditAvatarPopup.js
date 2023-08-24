import React from "react";
import PopupWithForm from "./PopupWithForm"


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputAvatar = React.useRef()
    
    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({avatar: inputAvatar.current.value});
    }
    
    return (
        <PopupWithForm
            name='add-avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input
                ref={inputAvatar}
                type="url"
                className="popup__input popup__input_type_link"
                name="avatar"
                id="avatar"
                placeholder="Ссылка на картинку"
                required=""
            />
            <span className="popup__error" id="avatar-error" />
        </PopupWithForm>
    )
}