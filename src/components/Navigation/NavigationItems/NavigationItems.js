import React from 'react'
import './NavigationItems.css'
import NavigationItem from '../NavigationItem/NavigationItem'
const NavigationItems = (props) => {
    //console.log('NavigationItems ::: ',props)
    return (
        <ul className='NavigationItems'>
            <NavigationItem Link="/" exact active={true}>Burger Builder</NavigationItem>
            {props.isAuth
                ? <NavigationItem Link="/orders" active={false}>Orders</NavigationItem>
                : ''
            }
            {props.isAuth
                 ? <NavigationItem Link="/logout" active={false}>Logout</NavigationItem>
                 : <NavigationItem Link="/authenticate" active={false}>Authenticate</NavigationItem>
            }
        </ul>
    )
}
export default NavigationItems