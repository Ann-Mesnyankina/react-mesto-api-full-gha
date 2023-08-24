import React from 'react';
import PageLogin from './PageLogin';


export default function Register({onRegister}){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleSubmit(evt) {
        evt.preventDefault();
       onRegister({email:email,password:password})
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }
    return ( 
        <main className="content">    
        <PageLogin
            name='signup'
            title='Регистрация'
            buttonText='Зарегистрироваться'
            onSubmit={handleSubmit}
        >
            <input
                type="email"
                className="login__input login__input_type_email"
                name="email"
                id="email"
                placeholder="Email"
                minLength={2}
                maxLength={40}
                value={email}
                onChange={handleChangeEmail}
            />
            <span className="login__error" id="email-error" />
            <input
                type="password"
                className="login__input login__input_type_password"
                name="password"
                id="password"
                placeholder="Пароль"
                minLength={2}
                maxLength={200}
                value={password}
                onChange={handleChangePassword}
            />
            <span className="login__error" id="password-error" />
        </PageLogin> 
        </main>         
    )
}
