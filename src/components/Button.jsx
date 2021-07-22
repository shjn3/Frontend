import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = (props) => {
    return (
        
        <a href={props.link} className={props.className}>
            <span>{props.children}</span>
            <FontAwesomeIcon className="icon"icon="chevron-right" />
        </a>
        

    )
}

export default Button
