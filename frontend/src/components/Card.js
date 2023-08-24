import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onDelete, onCardLike, likeId}) {
  const currentUser = React.useContext(CurrentUserContext)
  
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = isOwn ? 'element__remove-button' : 'element__remove-button_hidden';

  const isLiked = card.likes.some((element) => element === currentUser._id); 
  const cardLikeButtonClassName = `element__like-button ${isLiked ? 'element__like-button_active' : null}`;
  
  return (
    <li className="element__item" >
      <button className={cardDeleteButtonClassName} onClick={() => onDelete(card._id)} />
      <img src={card.link} alt={`шаблон картинки ${card.name}`} className="element__image" onClick={() => onCardClick({ name: card.name, link: card.link })} />
      <div className="element__container">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-conteiner">
          <button className={cardLikeButtonClassName} type="button"  onClick={() => onCardLike(card)} />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}
export default Card