
import React from "react"

// class Action will pass new option to parent <IndecisionApp />
// Rec: handleAddOption from <IndecisionApp />
const Action = (props) => {
    return (
        <div>
            <button 
                onClick={props.handleRandomPick}
                disabled={!props.hasOptions}       /* disabled button if there are no options */
                className="big-button"
            >
            What should I do?
            </button>
        </div>
    )
}

export default Action;

