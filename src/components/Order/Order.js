import React from 'react'

import './Order.css'
const Order = (props) => {
    const Ingredients =  []
    for (const ingredientName in props.ingredients) {
        Ingredients.push({name: ingredientName, amount: props.ingredients[ingredientName]})
    }
    const outputIngredients = Ingredients.map( ing => {
        return <span key={ing.name} style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px', border:'1px solid #cccc',
            padding: '5px'
            }}>{ing.name} ({ing.amount})</span>
    })
    return(
        <div className='Order'>
            <p>Ingredients: {outputIngredients}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
        </div>
        )
}
export default Order