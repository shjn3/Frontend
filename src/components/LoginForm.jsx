import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'

import Button from './Button'
import Menu from './menu'
const LoginForm = () => {
    
        const [user,setUser] = useState("")
        const [pass,setPass] = useState("")
        
        const [focusUser,setfocusUser] = useState(false);
        const [focusPass,setfocusPass] = useState(false);
        const [showMenu,setShowMenu] = useState(false);
        
        const ChangeFocusUser = () =>{
            setfocusUser(!focusUser)
        }
        const ChangeFocusPass = () =>{
            setfocusPass(!focusPass)
        }
    
        const ChangeUser= e =>{
            setUser(e.target.value);
        }
        const ChangePass = e=>{
            setPass(e.target.value)
        }
        const menuShow = ()=>{
            setShowMenu(!showMenu);
        }
        return (
            <>
            <div className="formSecondary__iconMenu" onClick={menuShow}>
                <span>|||</span>
            </div>
            <Menu items="Register" link="/register" functionShow={menuShow} showState={showMenu}/>
            <div className="register">
            <form className="register__form">
                <h1 className="register__form__header">Sign up to experience the most efficient way of communication</h1>
                <div className="register__form__input">
                    <div className="register__form__input__items">
                        <div className="register__form__input__items__icon">
                            <FontAwesomeIcon className="lb_icon" icon="user-astronaut"/>
                        </div>
                        <div className={ focusUser === true
                            ?"register__form__input__items__label focus"
                            :"register__form__input__items__label"}>
                            <label className={user.length > 0 ?"lb active":"lb"}>
                                
                                <span className="lb__des">choose a username</span>
                                <input className="lb__input" type="text" name="username"
                                value={user}
                                onChange={ChangeUser}
                                onFocus={ChangeFocusUser}
                                onBlur={ChangeFocusUser}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="register__form__input__items">
                        <div className="register__form__input__items__icon">
                            <FontAwesomeIcon className="lb_icon" icon="unlock"/>
                        </div>
                        <div className={ focusPass===true
                            ?"register__form__input__items__label focus"
                            :"register__form__input__items__label"}>
                            <label className={pass.length > 0 ?"lb active":"lb"}>
                                
                                <span className="lb__des">choose a password</span>
                                <input className="lb__input" type="password" name="password"
                                value={pass}
                                onChange={ChangePass}
                                onFocus={ChangeFocusPass}
                                onBlur={ChangeFocusPass}
                                />
                            </label>
                        </div>
                    </div>
                </div>
    
                <div className="register__form__btn">
                    <Button link="/abc" className="btn register__form__btn__register">Login</Button>
                    <Link className="register__form__btn__login" to="/register">I don't already have an account</Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default LoginForm
