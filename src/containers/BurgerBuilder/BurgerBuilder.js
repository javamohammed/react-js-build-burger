import React from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            purchasing: false,
            loading: false,
        }

        this.props.onInitIngredients()
    }
    purchasingHandler(){
        if(this.props.isAuth){
            this.setState({
                purchasing: true
            })
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/authenticate')
        }
    }
    purchasingCanceledHandler(){
        this.setState({
            purchasing:false
        })
    }
    purchasingContinuedHandler() {
            this.props.onPurchaseInit()
            this.props.history.push({pathname: '/checkout'})
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((s, el) =>{
            return s + el
        },0)
        return sum > 0
    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        }
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] === 0
        }
        let orderSummary = null
        let BurgerComp = this.props.error ? <p>ingredients can be loaded...</p>: <Spinner/>
            if(this.props.ings){
                BurgerComp = (
                    <React.Fragment>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientsAdded={this.props.onIngredientAdd}
                            ingredientsRemoved={this.props.onIngredientRemove}
                            ordered={this.purchasingHandler.bind(this)}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            price={this.props.Tprice}
                            isAuth={this.props.isAuth}
                        />
                    </React.Fragment>)

                orderSummary = <OrderSummary ingredients={this.props.ings}
                    canceledPurchase={this.purchasingCanceledHandler.bind(this)}
                    continuedPurchase={this.purchasingContinuedHandler.bind(this)}
                    price={this.props.Tprice}
                />
            }
            /*
        if (this.state.loading) {
            orderSummary = <Spinner />
        }*/
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} closeModal={this.purchasingCanceledHandler.bind(this)}>
                        {orderSummary}
                </Modal>
                {BurgerComp}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        Tprice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd :(ingName)=>{dispatch(actions.addIngredients(ingName))},
        onIngredientRemove :(ingName)=>{dispatch(actions.removeIngredients(ingName))},
        onInitIngredients :()=>{dispatch(actions.iniSetIngredients())},
        onPurchaseInit :()=>{dispatch(actions.purchaseInit())},
        onSetAuthRedirectPath: (path) => {dispatch(actions.setAuthRedirectPath(path))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))