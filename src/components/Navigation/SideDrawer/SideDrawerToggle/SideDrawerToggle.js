import React from 'react'
import './SideDrawerToggle.css'
const SideDrawerToggle = (props) => {
    return(
        <div className = 'DrawerToggle' onClick={props.showSideDrawer} >
            <div></div>
            <div></div>
            <div></div>
        </div>
        )
}
export default SideDrawerToggle