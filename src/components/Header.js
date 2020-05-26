import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <h2 className="headerText">{props.text}</h2>
    </header>
  );
};

export default Header;
