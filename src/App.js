import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import AddOption from "./components/AddOption"
import Options from "./components/Options"
import Header from "./components/Header"
import Action from "./components/Action"
import OptionModal from "./components/OptionModal"


/****************************************************************************/
//                      With Components (Individual UI piece that can be reused)
// To pass data from 1 component to another: `props`, write your own key={data}, like HTML attribute  
// Component state: allows component to manage and/or change according to data
/* Props vs State: 
    + Props comes from parent Component, flows in 1 direction from parent Component to child Component 
    + Child Props object changes when parent's Component props changes
    + Props can't be changed by child component 

    - State is defined in a component itself
    - State can be changed by the (child) component itself
*/
// Stateless Functional Component: a function

export default class IndecisionApp extends React.Component {
  state = {
    options : [],
    selectedOption : undefined,
  }

  subtitle = "None, will be replaced by Header's defeault props"

  // When the page refresh, load options from local storage
  componentDidMount(){
      try {       // for some reason stored data is invalid/badly formatted
          let string = localStorage.getItem("options");
          let optionsFromLocalStorage = JSON.parse(string)
          
          if (optionsFromLocalStorage) {      // since the first time page is rendered, no options in local storage 
              this.setState(() => ({ 
                  options: optionsFromLocalStorage
              }))
          }
      } catch(error){
          // Do nothing here, the options array is set to be an empty array in the constructor
      }
  }

  // When user input a new option, save that new option to the Browser's local storage (not Cache)
  componentDidUpdate(prevProps, prevState){
      // if the size of the options array change (prevent saving when new option is a duplicate)
      if (prevState.options.length != this.state.options.length)
          localStorage.setItem("options", JSON.stringify(this.state.options));
  }
  
  // pass down to Action to randomly pick an options and alert it 
  handleRandomPick = () => {
      this.setState({
        selectedOption: this.state.options[Math.floor(Math.random() * this.state.options.length)]
      })
  }

  // clear selectedOption state when the button in <OptionModal /> is clicked
  handleRemoveSelectedOption = () => {
      this.setState({
          selectedOption : undefined
      })
  }

  // check newOption validity and return error or update options State object with newOption
  prehandleAddOption = (newOption) => {

      // console.log(newOption)
      if (this.state.options.indexOf(newOption) > -1){
          return "This option already exists"
      } else if (!newOption){
          return "Enter valid value to add item"
      }
      this.setState((prevState) => ({
              options : prevState.options.concat([newOption])         
              // options : options.push(newOption)                
              // Using .push() modifies the array in memory
              // In order for React to detect if any changes were actually made, 
              // it'd have to loop over each array and see if there any differences => inefficient
              // Instead, React checks if the reference (i.e. memory locations) of the arrays are the same.
              // Since the .concat() method creates a new array in memory, it's trivial to detect if changes were made 
              // since it's a different reference we can just assume that it's different.
          }))
  }

  // delete individual option from prop options array
  handleDeleteOneOption = (optionToRemove) => {
      this.setState((prevState) => ({
          // filter apply the (in-line function) argument to each element in the array and return a new array
          // if the in-line function returns true, that element is included in the return array
          // Use this so React can just compare array address -> see address change -> render instead of going over elements by elements
          options: prevState.options.filter((option) => option !== optionToRemove)
      }))
  }

  // since child Component class can't change parent's State object, 
  // pass a parent's function to the child Component class 
  handleRemoveAllOptions = () => {
      this.setState(() => ({ 
          options : [] 
      }))

      /* Normal syntax: 
          this.setState(() => {
              return { 
                  options : [] 
              }
          }))
          this.setState returns an object, 
          so wrapping the arrow function's body in () turns it into an object
      */
  }

  render(){
      return (
      <div>
          <Header title={this.title} subtitle={this.subtitle} />         {/* pass title from <IndecisionApp /> to <Header /> */}
          <div className="container">
            <Action 
                hasOptions={this.state.options.length > 0} 
                handleRandomPick={this.handleRandomPick}
            />
            <div className="widget">
                <Options     
                    options={this.state.options}      
                    handleRemoveAllOptions={this.handleRemoveAllOptions}
                    handleDeleteOneOption={this.handleDeleteOneOption}       
                />   {/* to change the array of parent component <IndecisionApp />, pass the function to change that array from parent component */}
                <AddOption 
                    prehandleAddOption={this.prehandleAddOption}
                />
            </div>
          </div>
          <OptionModal 
            selectedOption={this.state.selectedOption} 
            handleRemoveSelectedOption={this.handleRemoveSelectedOption} 
          />
      </div>
      )
  }
}










