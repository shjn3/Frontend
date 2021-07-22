import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const Menu = ({items,functionShow,showState,link}) => {

    const body=showState===true
    ? <>
    <div className="menu">
    </div>
    <div className="menu__form">
            <div className="menu__form__iconClose" onClick={functionShow}>
                <FontAwesomeIcon className="menu__form__iconClose__times"icon="times"/>
            </div>
            <Link className="menu__form__login" to={link}>{items}</Link>
    </div>
    </>
    :<></>

    return (
        <>
          {body}
        </>
    )
}

export default Menu
