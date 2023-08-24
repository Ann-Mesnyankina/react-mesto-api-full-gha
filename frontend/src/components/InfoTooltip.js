function InfoTooltip({ name, isOpen, onClose, isAchieve }) {
    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'} `} >
            <div className="popup__container">
                <div className={`popup__image-registration ${!isAchieve ? 'popup__image-error' : ''}`} />
                <h2 className="popup__title popup__title_type_tooltip">{!isAchieve ? 'Что-то пошло не так! Попробуйте еще раз.' : 'Вы успешно зарегестрировались!'}</h2>
                <button className="popup__close-button" type="button" onClick={onClose} />
            </div>
        </section>
    )
}
export default InfoTooltip