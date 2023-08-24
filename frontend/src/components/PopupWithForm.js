function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'} `} >
            <div className="popup__container">
                <h2 className={`popup__title ${name === 'delete-card' ? 'popup__title_type_delete' : ''}`}>{title}</h2>
                <form className="popup__profile-form" noValidate="" name={name} onSubmit={onSubmit} >
                    {children}
                    <button className="popup__save-button" type="submit">{buttonText}</button>
                </form>
                <button className="popup__close-button" type="button" onClick={onClose} />
            </div>
        </section>
    )
}
export default PopupWithForm