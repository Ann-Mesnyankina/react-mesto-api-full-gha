import { Link } from "react-router-dom"

function Header({ name, userEmail }) {

    function onLoggedOut() {
        localStorage.removeItem('jwt')
    }

    return (
        <header className="header ">
            <div className="header__logo" />
            <div className="header__auth-menu">
                {name === 'login' || name === 'signup' ?
                    (<Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className="header__link">{name === 'login' ? 'Регистрация' : 'Войти'}</Link>
                    ) : (
                        <>
                            <p className="header__email">{userEmail}</p>
                            <Link className="header__link-out" to={'/sign-in'} onClick={onLoggedOut}>Выйти</Link>

                        </>)
                }
            </div>
        </header>
    )
}
export default Header