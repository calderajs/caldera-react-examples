import React, { useState } from "react";

const NavBar = () => {

    return <div className="nav-outer">
        <div className="nav-title">🐄 = ❤️ ≠ 🍔</div>
        <div className="nav-search-wrapper">
            <input placeholder="Type a @user or #tag, and press enter" className="nav-search"></input>
        </div>
        <div className="nav-account">
            <div className="nav-account-pic" style={{ background: "green" }}><div>R</div></div>
            <div className="nav-account-name-wrapper">
                <div className="nav-account-name">Rahul GS</div>
                <div className="nav-account-id">@cho</div>
            </div>
        </div>
    </div >
}

export default NavBar;