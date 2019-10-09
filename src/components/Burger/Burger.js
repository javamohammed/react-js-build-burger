import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import  './Burger.css'
const Layout = (props) =>{ 
    let transformedIngredient = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_,i) => {
            return <BurgerIngredient key={igkey + i} type={igkey} />
        })
    }).reduce((arr, el)=>{
        return arr.concat(el)
    },[])
    //console.log('transformedIngredient', transformedIngredient)
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please adding ingredients</p>
    }
    return (
    <div className='Burger'>
        <BurgerIngredient type="bread-top" />
        {transformedIngredient}
        <BurgerIngredient type="bread-bottom" />
    </div>
    )
}
export default Layout