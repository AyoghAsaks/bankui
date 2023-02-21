//rafce + Enter
import React from 'react'
import "../App";

const NavBar = () => {
  return (
    <div className='NavBar' style={{ backgroundColor: "blue", height: "80px", width: "110%" }}>
        <div className='nav-item-1'>
            <span className='nav-logo' style={{ fontWeight: 700, fontSize: "20px", margin: "15px 15px 15px 0", color: "#ffffff", textDecoration: "none" }}>
                Bank App
            </span>
        </div>

        <div className='nav-items' style={{ fontSize: "20px", margin: "15px", color: "#ffffff", textDecoration: "none"}}>
            <a href='/' style={{ margin: "15px", color: "#ffffff", textDecoration: "none" }}>Home</a>
            <a href='/login' style={{ margin: "15px", color: "#ffffff", textDecoration: "none"}}>Login</a>
            <a href='/registration' style={{ margin: "15px", color: "#ffffff", textDecoration: "none"}}>Registration</a>
            <a href='/dashboard/:userId' style={{ margin: "15px", color: "#ffffff", textDecoration: "none"}}>Dashboard</a>
            <a href='/transactiondetails' style={{ margin: "15px", color: "#ffffff", textDecoration: "none"}}>Transaction Details</a>
            <a href='/transfer' styles={{ margin: "15px", color: "#ffffff", textDecoration: "none"}}>Transfer</a>
        </div>
    </div>
  );
} 

export default NavBar;