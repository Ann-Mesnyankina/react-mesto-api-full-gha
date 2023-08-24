function ImagePopup({ card, onClose }) {
    return (
        <section className={`popup popup_open-image ${card ? 'popup_opened' : ''}`} id="images">
            <div className="popup__container-image" >
                <button
                    className="popup__close-button"
                    id="close-imagecontainer"
                    type="button"
                    onClick={onClose}
                />
                <figure className="popup__figure-content">
                    <img src={card?.link} alt={`Шаблон картинки ${card?.name}`} className="popup__image-card" />
                    <figcaption className="popup__caption">{card?.name}</figcaption>
                </figure>
            </div>
        </section>
    )
}
export default ImagePopup