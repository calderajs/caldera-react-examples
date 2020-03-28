import React, { useState } from "react";
import AccountPic from "./AccountPic"

const NavBar = ({ account, setAccount, setShowLoginMenu, showLoginMenu }:
    {
        account: Account | null,
        setAccount: React.Dispatch<React.SetStateAction<Account | null>>
        setShowLoginMenu: React.Dispatch<React.SetStateAction<boolean>>
        showLoginMenu: boolean
    }) => {
    return <div className="nav-outer">
        <div className="nav-title">🐄 = ❤️ ≠ 🍔</div>
        <div className="input-wrapper">
            <input placeholder="Type a @user or #tag, and press enter" className="moo-input search"></input>
        </div>
        <div className="nav-account-outer">
            {account ?
                <div className="account">
                    <AccountPic color="red" text="R" />
                    <div className="account-name-wrapper">
                        <div className="account-name">Rahul GS</div>
                        <div className="account-id">@cho</div>
                    </div>
                </div>
                : <input type="button" value="Login" onClick={() => setShowLoginMenu(!showLoginMenu)} />
            }
        </div>
    </div >
}

export default NavBar;