import React from 'react'

import Burger from '../../Burger/Burger.js'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'
const CheckoutSummary = (props) => {
    return(
        <div className='CheckoutSummary'>
            <h1>We hope tastes well</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button  nameClass='Button' btnType='Danger' clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button  nameClass='Button' btnType='Success' clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
        )
}
export default CheckoutSummary