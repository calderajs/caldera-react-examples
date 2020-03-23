import React, { useState } from "react";

const NavBar = () => {

    return <div className="nav-outer">
        <div className="nav-title">🐄 = ❤️ ≠ 🍔</div>
        <div className="nav-search-wrapper">
            <input placeholder="Type a @user or #tag, and press enter" className="nav-search"></input>
        </div>
        <div className="nav-account">Rahul</div>
    </div >
}

export default NavBar;