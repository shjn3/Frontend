import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import Button from '../components/Button'

const auth = ({authRoute}) => {
    let body
    body =(
    <>     
    {authRoute === 'register' && <RegisterForm/>}
    {authRoute === 'login' && <LoginForm/>}
    </>)
    return (
        <div className="container">
            <div className="formPrimary">
                <div className="formPrimary__container">
                <p className="formPrimary__container__title">SOCUM</p>
                    <h1 className="formPrimary__container__header">One to rule them all - we connect your social media</h1>
                    <Button link="/abc" className="formPrimary__container__btn btn"
                     icon="faChevronRight">Learn more</Button>

                    <div className="formPrimary__container__nav">
                        <a className="formPrimary__container__nav__imprint"
                        href="/abc">imprint</a>
                        <a className="formPrimary__container__nav__use"
                        href="/abc">terms of use</a>
                        <a className="formPrimary__container__nav__dribble"
                        href="/abc">Dribble</a>
                    </div>
                </div>
                <div className="formPrimary__image"></div>
            </div>

            <div className="formSecondary">
                {body}
            </div>
        </div>
    )
}

export default auth
