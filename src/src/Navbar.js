  
import React from "react";

const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-light mb-5" style={{backgroundColor: "#16a0f8"}}>
      <a className="navbar-brand" href="#">
        <img src="https://media.discordapp.net/attachments/849691164293726209/857368068699062332/image0.jpg?width=469&height=469" alt="logo" widht="100" height="90"></img>
      </a>
      <p className="navbar-brand my-auto">DreamCoin Exchange</p>
      
      
      <ul className="navbar-nav">
        <li className="nav-item text-white"><p>Account: </p>{account}</li>
      </ul>
    </nav>
  );
};

export default Navbar;