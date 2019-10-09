import React from 'react'
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'
import './SideDrawer.css'
const SideDrawer = (props) => {
    let attachedClasses = 'SideDrawer  Close'
    if (props.open) {
        attachedClasses = 'SideDrawer  Open'
    }
   // console.log(props.open, attachedClasses)
    return(
        <Aux>
            <Backdrop clicked={props.closed} show={props.open} />
            <div className = {attachedClasses} onClick={props.closed}>
                <div style={{height:'11%', marginBottom:'32px'}}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Aux>
        )
}
export default SideDrawer