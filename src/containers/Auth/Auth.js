import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import { checkValidating } from '../../shared/validation';
import './Auth.css'
class Auth extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            controlsForm : {
                 email: {
                     elementType: 'input',
                     elementConfig: {
                         type: "email",
                         placeholder: 'Your E-Mail'
                     },
                     validation: {
                         required: true,
                         isEmail: true
                     },
                     valid: false,
                     touched: false,
                     value: ''
                 },
                password:{
                    elementType: 'input',
                    elementConfig : {
                        type: "password",
                        placeholder: 'Password'
                    },
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false,
                    value:''
                }
    },
    isSignUp:false
    }
}

    inputChangeHandler = (event, controlName) => {
        //console.log(inputIdentifier, event.target.value)
        const updatedControlsForm = {
            ...this.state.controlsForm,
        [controlName]: {
            ...this.state.controlsForm[controlName],
            value: event.target.value,
            valid: checkValidating(event.target.value, this.state.controlsForm[controlName].validation),
            touched: true
        }
        }
        this.setState({
            controlsForm: updatedControlsForm,
        })
    }
    authHandler = (event) => {
        event.preventDefault()
        this.props.onAuthenticate(this.state.controlsForm.email.value, this.state.controlsForm.password.value, this.state.isSignUp)
    }
    switchToHandler(){
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }
    componentDidMount(){
        if( !this.props.building && this.props.authRedirectPath === '/checkout'){
            this.props.onSetAuthRedirectPath()
        }
    }
    render(){
        const formElementsArray = []
        for (const key in this.state.controlsForm) {
                formElementsArray.push({id:key, config: this.state.controlsForm[key]})
        }
       // console.log("formElementsArray ==> ",formElementsArray)
        let   form = (<form onSubmit={this.authHandler.bind(this)}>
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
                    <Button nameClass='Button' btnType='Success' >Submit</Button>
                    </form>
                    )
        if(this.props.loading){
            return <Spinner/>
        }
        let error = ''
        if(this.props.error){
            error = this.props.error
        }
        if(this.props.isAuth){
            return <Redirect to={this.props.authRedirectPath}/>
        }
        return(
                <div className='AuthData'>
                    <p>{error}</p>
                    {form}
                    <Button clicked={this.switchToHandler.bind(this)} nameClass='Button' btnType='Danger' >SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}</Button>
                </div>
        )
    }
}

const  mapStateToProps = (state) => {
return {
    loading : state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
 }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate : (email, password,isSignUp) => {

            dispatch(actions.auth(email, password, isSignUp))
        },
        onSetAuthRedirectPath: () => {

            dispatch(actions.setAuthRedirectPath('/'))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)