import React, { useState } from "react";
import { useHistory } from "caldera";
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
  const history = useHistory();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const params = new URLSearchParams();
    if (query[0] === "@") params.append("mention", query.slice(1));
    else if (query[0] === "#") params.append("tags", query.slice(1));
    else return;
    history.push("/search" + "?" + params.toString());
  };

  return (
    <div className="nav-outer">
      <div className="nav-title" onClick={() => history.push("")}>
        🐄 = ❤️ ≠ 🍔
      </div>
      <div className="input-wrapper">
        <input
          placeholder="Type a @user or #tag, and press enter"
          className="moo-input search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleSearch}
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
