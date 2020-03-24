import React, { useState } from "react";
import AccountPic from "./AccountPic"

const NavBar = () => {
    return <div className="nav-outer">
        <div className="nav-title">🐄 = ❤️ ≠ 🍔</div>
        <div className="nav-search-wrapper">
            <input placeholder="Type a @user or #tag, and press enter" className="moo-input"></input>
        </div>
        <div className="nav-account-outer">
            <div className="account">
                <AccountPic color="red" text="R" />
                <div className="account-name-wrapper">
                    <div className="account-name">Rahul GS</div>
                    <div className="account-id">@cho</div>
                </div>
            </div>
        </div>
    </div >
}

export default NavBar;