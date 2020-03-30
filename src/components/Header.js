import React from "react"

const Header = (props) => { 
    return (
        <div className="header">      {/* apply SCSS styling to header in styles/components/_header */}
            <div className="container">     {/* a nested div to center */}
                <h1 className="header__title">{props.title}</h1>    {/* review props.title from <IndecisionApp /> */}     
                {props.subtitle && <h2 className="header__subtitle">{props.subtitile}</h2>}
            </div>
        </div>
    ) 
}

Header.defaultProps = {
    title: "Todo List Roulette",
    subtitile: "Can't prioritize? Let us help."
}

export default Header;
