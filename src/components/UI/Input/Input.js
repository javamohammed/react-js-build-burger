import React from 'react'
import './Input.css'
const Input = (props) => {
    let inputElement;
    let classes = 'InputElement '
    let validationError = null;
    if (props.valid && props.shouldValidation && props.touched) {
        classes = classes + ' Invalid'
        validationError = <p className='ValidationError'>Please enter a valid value!</p>;
    }
    switch (props.elementType) {
        case 'input':
            inputElement = <input className={classes} {...props.elementConfig} onChange={props.changed}  value={props.value}/>
            break;
        case 'textarea':
            inputElement = <textarea className={classes} {...props.elementConfig} onChange={props.changed}  value={props.value}/>
            break;
         case 'select':
            inputElement = (
                    <select className={classes} onChange={props.changed}  value={props.value}>
                        {props.elementConfig.options.map(option => {
                            return <option key={option.value} value={option.value}>{option.displayValue}</option>
                        })}
                    </select>)
            break;
        default:
            inputElement = <input className={classes} {...props.elementConfig} onChange={props.changed}  value={props.value} />
            break;
    }
    return (
        <div className="Input">
            <label className='Label'>{props.label}</label>
            {inputElement}
            {validationError}
        </div>)
}
export default Input