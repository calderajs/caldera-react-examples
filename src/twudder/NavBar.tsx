import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "caldera";
import AccountPic from "./AccountPic";
import { MooAccount } from "./Account";
import classNames from "classnames";

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
  const location = useLocation();
  const [query, setQuery] = useState("");
  const validQuery = query[0] === "@" || query[0] === "#";

  useEffect(() => {
    if (query.length === 0 && location.pathname !== "/") {
      history.push("/");
    } else if (query.length > 1 && validQuery) {
      const params = new URLSearchParams();
      if (query[0] === "@") {
        params.append("mention", query.slice(1));
      } else if (query[0] === "#") {
        params.append("tags", query.slice(1));
      }

      const timeoutTask = setTimeout(
        () => history.push(`/search?${params.toString()}`),
        300
      );
      return () => clearTimeout(timeoutTask);
    }
  }, [query, validQuery, history, location.pathname]);

  return (
    <div className="nav-outer">
      <div
        className="nav-title"
        onClick={() => {
          setQuery("");
          history.push("");
        }}
      >
        🐄 = ❤️ ≠ 🍔
      </div>
      <div
        className={classNames(
          "input-wrapper",
          query && !validQuery && "invalid",
          query.length > 1 && validQuery && "active"
        )}
      >
        <input
          placeholder="Type a @user or #tag, and press enter"
          className="moo-input search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
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
            <AccountPic username={account.username} name={account.name} />
            <div className="account-name-wrapper">
              <div className="account-name">{account.name}</div>
              <div className="account-id">{`@${account.username}`}</div>
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
