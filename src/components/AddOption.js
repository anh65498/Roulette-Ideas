import React from "react"


export default class AddOption extends React.Component {
    state = {
        errorMessage : undefined
    }

    // If I change handleAddOption from a function to a property, I don't have to use bind() in constructor
    handleAddOption = (event) => {
        event.preventDefault()                                          // prevent full page refresh 
        const newOption = event.target.elements.option.value.trim()       // value user type in 
        const error = this.props.prehandleAddOption(newOption)
        
        
        this.setState(() => ({  
            errorMessage : error 
        }))
        
        // if user's input has no error, clear the input
        if (!error){
            event.target.elements.option.value = '';    // empty out the <input>
        } else {

        }
         
        
    } 
    

    render(){
        return (
            <div>
                {this.state.errorMessage && <p className="add-option-error">{this.state.errorMessage}</p> }
                <form 
                    onSubmit={this.handleAddOption} 
                    className="add-option"
                >
                    <input type="text" name="option" className="add-option__input"></input>
                    <button className="button">Add Option</button>
                </form> 
            </div>
        )
    }
}