import React from 'react';
import { Link } from 'react-router-dom'

export default function PageLogin({ name, buttonText, onSubmit, children,title }) {
    return (
       
        <div className="login login__auth-page" >
            <h2 className="login__title">{title}</h2>
            <form className="login__form" noValidate="" name={name} onSubmit={onSubmit} >
                {children}
                <button className="login__submit-button" type="submit">{buttonText}</button>
            </form>
            {
                name === 'signup' && <p className="login__link">Уже зарегестрированы?<Link to={'/sign-in'} className="login__link-subtitle">Войти</Link></p>
            }
        </div>
        
    )
}