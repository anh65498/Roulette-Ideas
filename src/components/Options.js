import React from "react"
import Option from "./Option"

const Options = (props) => {
    return (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">
                    Your Options
                </h3>
                <button
                    onClick={props.handleRemoveAllOptions}
                    className="button button--link"
                >
                    Remove All
                </button>
            </div> 
            {console.log(props.options)}      
            {props.options.length === 0 && <p className="widget__message">Please add an activity to get started!</p>}
            {
                props.options.map((opt, index) => (
                    <Option key={opt} 
                            optionString={opt}
                            optionIndex={index + 1}
                            handleDeleteOneOption={props.handleDeleteOneOption} 
                    />
                    ))
            }
        </div>
    )
}

  
export default Options;