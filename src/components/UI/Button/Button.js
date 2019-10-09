import React from 'react'
import './Button.css'
const Button = (props) => {
    const classes = props.nameClass +' '+props.btnType
    //console.log("classes =>", classes)
    return <button className = {classes} onClick={props.clicked} disabled={props.disabled}>{props.children}</button>
}
export default Button