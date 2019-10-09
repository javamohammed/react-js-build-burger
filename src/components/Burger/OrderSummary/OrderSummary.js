import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'
class OrderSummary extends React.Component{

    componentDidUpdate(){
       // console.log('[OrderSummary] Updated')
    }
    render(){
        const ingredientsSummary =  Object.keys(this.props.ingredients).map( igkey =>{
        return (
                <li key={igkey}>
                    <span style={{textTransform:'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}
                </li>)
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
            {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <Button nameClass='Button' btnType='Danger' clicked={this.props.canceledPurchase}>CANCEL</Button>
            <Button nameClass='Button' btnType='Success' clicked={this.props.continuedPurchase}>CONTINUE</Button>
        </Aux>
    )
    }
}
export default OrderSummary