import React from 'react'
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle'
import './Toolbar.css'
const Toolbar = (props) => {
    return(
        <header className='Toolbar'>
            <SideDrawerToggle showSideDrawer = {props.clicked}/>
           <div style={{height:'80%'}}>
                <Logo/>
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
        )
}
export default Toolbar