import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls = [
        {label :'Salad', type: 'salad'},
        {label :'Meat', type: 'meat'},
        {label :'Bacon', type: 'bacon'},
        {label :'Cheese', type: 'cheese'},
    ]
const BuildControls = (props) => {
    return (
        <div className="BuildControls">
            <p><strong>Current price: {props.price.toFixed(2)}</strong></p>
            {controls.map(control => {
                return <BuildControl
                                key={control.label}
                                label={control.label}
                                added = {() => props.ingredientsAdded(control.type)}
                                removed = {() => props.ingredientsRemoved(control.type)}
                                disabled = {props.disabled[control.type]}
                                />
            })}
            <button className='OrderButton' onClick={props.ordered} disabled={!props.purchasable}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )
}
export default BuildControls