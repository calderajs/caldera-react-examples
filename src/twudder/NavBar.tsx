import React, { useState } from "react";
import AccountPic from "./AccountPic";
import { MooAccount } from "./Account";

const NavBar = ({
  account,
  setAccount,
  setShowLoginMenu,
  showLoginMenu
}: {
  account: MooAccount | null;
  setAccount: React.Dispatch<React.SetStateAction<MooAccount | null>>;
  setShowLoginMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showLoginMenu: boolean;
}) => {
  return (
    <div className="nav-outer">
      <div className="nav-title">🐄 = ❤️ ≠ 🍔</div>
      <div className="input-wrapper">
        <input
          placeholder="Type a @user or #tag, and press enter"
          className="moo-input search"
        ></input>
      </div>
      <div className="nav-account-outer">
        {account ? (
          <div
            className="account"
            onClick={() => {
              console.log("logout");
              setAccount(null);
            }}
          >
            <AccountPic color="red" text={account.name[0].toUpperCase()} />
            <div className="account-name-wrapper">
              <div className="account-name">{account.name}</div>
              <div className="account-id">{"@" + account.username}</div>
            </div>
          </div>
        ) : (
          <input
            type="button"
            value="Login"
            onClick={e => {
              e.stopPropagation();
              setShowLoginMenu(!showLoginMenu);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NavBar;
