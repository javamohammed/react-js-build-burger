import React from 'react'
import { connect } from 'react-redux';

import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionsBurgerOrder from '../../store/actions/index';
import Button from '../../components/UI/Button/Button'
import { checkValidating } from '../../shared/validation';
import './ContactData.css'
class ContactData extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            contactForm : {
                name:{
                    elementType: 'input',
                    elementConfig : {
                        type:"text",
                        placeholder: 'Your name'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    value:''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: "email",
                        placeholder: 'Your E-Mail'
                    },
                    validation: {
                       required: true
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: 'Your Country'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: 'Your Street'
                    },
                    validation: {
                       required: true
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                postalCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: "text",
                        placeholder: 'Zip Code'
                    },
                    validation: {
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false,
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            { value: "Fasttest",displayValue: "Fasttest"},
                            { value: "Cheapest", displayValue: "Cheapest" }
                        ]
                    },
                    validation:{},
                    value: 'Fasttest',
                    valid: true,

            }
        },
        fromIsValid: false,
    }
    }
    inputChangeHandler = (event, inputIdentifier) => {
        //console.log(inputIdentifier, event.target.value)
        const updateFormContact =  {...this.state.contactForm}
        const updatedElement = {...updateFormContact[inputIdentifier]}
        updatedElement.value = event.target.value
        updatedElement.valid = checkValidating(event.target.value, updatedElement.validation)
        updatedElement.touched = true
        updateFormContact[inputIdentifier] = updatedElement
        let fromIsValid = true
        for (let input in updateFormContact) {
                fromIsValid = updateFormContact[input].valid && fromIsValid
        }
        //console.log(updatedElement)
        this.setState({
            contactForm : updateFormContact,
            fromIsValid: fromIsValid
        })
    }
    orderHandler = (event) => {
        event.preventDefault()
        const formContact = {}
        for (const ElemntIdentifier in this.state.contactForm) {
            formContact[ElemntIdentifier] = this.state.contactForm[ElemntIdentifier].value
        }
        //console.log("orderData===>", formContact)
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formContact,
            userId: this.props.userId
        }
        this.props.onBurgerOrder(order, this.props.token)

    }

    render(){
        const formElementsArray = []
        for (const key in this.state.contactForm) {
                formElementsArray.push({id:key, config: this.state.contactForm[key]})
        }
       // console.log("formElementsArray ==> ",formElementsArray)
        let   form = (<form onSubmit={this.orderHandler.bind(this)}>
                        {formElementsArray.map(formElement => {
                            //console.log(formElement.config.validation)
                            return <Input
                                        key={formElement.id}
                                        elementType={formElement.config.elementType}
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        valid = {!formElement.config.valid}
                                        shouldValidation = {formElement.config.validation}
                                        touched = {formElement.config.touched}
                                        changed={(event)=>{this.inputChangeHandler(event,formElement.id)}}/>
                        })}
                    <Button nameClass='Button' btnType='Success' disabled={!this.state.fromIsValid}>Order Now</Button>
                    </form>)
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
        <div className='ContactData'>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
        )
    }
}
const mapStateToProps = (state) => {
return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
 }
}
const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData,token)=> {dispatch(actionsBurgerOrder.purchaseBurger(orderData,token))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))