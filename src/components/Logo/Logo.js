import React from 'react'
import LogoBurger from '../../assets/images/burger-logo.png'
import './Logo.css'
const Toolbar = (props) => {
    return(
        <div className='Logo'>
                <img src={LogoBurger} alt="MyBurger" />
        </div>
        )
}
export default Toolbar