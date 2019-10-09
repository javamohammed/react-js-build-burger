import React from 'react'
import './NavigationItem.css'
import {NavLink} from 'react-router-dom'
const NavigationItem = (props) => {
    return(
        <li className='NavigationItem'><NavLink to={props.Link} exact={props.exact} activeClassName='active'>{props.children}</NavLink></li>
    )
}
export default NavigationItem