import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onEditAvatar, onAddCard, onCardClick, onDelete, onCardLike, cards }) {

    const currentUser = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <>
                <>
                    <section className="profile">
                        <div className="profile__item">
                            <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
                                <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
                            </button>
                            <div className="profile__info">
                                <div className="profile__title-item">
                                    <h1 className="profile__title">{currentUser.name}</h1>
                                    <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                                </div>
                                <p className="profile__subtitle">{currentUser.about}</p>
                            </div>
                        </div>
                        <button className="profile__add-button" type="button" onClick={onAddCard} />
                    </section>
                    <section className="elements">
                        <ul className="element">
                            {cards.map(card => {
                                return <Card key={card._id} card={card} onCardClick={onCardClick} onDelete={onDelete} onCardLike={onCardLike} />
                            })}
                        </ul>
                    </section>
                </>
            </>
        </main>

    )
}
export default Main