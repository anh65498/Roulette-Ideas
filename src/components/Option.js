import React from "react"

const Option = (props) => {
    return (
        <div className="option">
            <p className="option__text">{props.optionIndex}. {props.optionString}</p>
            {/* Since handleDeleteOneOption takes an argument, can't use the below syntax to call it*/}
            {/* <button onClick={props.handleDeleteOneOption}>Remove</button> */} 
            {/* Need to pass an in-line arrow function to onClick. When button is click, that event is populated with argument `event` */}
            <button
                className="button button--link"
                onClick={(e) => {
                    props.handleDeleteOneOption(props.optionString);
                }}
            >
                Remove
            </button>
  
        </div>
    )
} 

export default Option;