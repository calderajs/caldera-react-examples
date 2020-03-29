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
    const search = new URLSearchParams(location.search);
    const mention = search.get("mention");
    const tags = search.get("tags");

    if (mention) {
      setQuery("@" + mention);
    } else if (tags) {
      setQuery("#" + tags);
    } else {
      setQuery("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

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

      const url = `/search?${params.toString()}`;

      if (location.pathname + location.search !== url) {
        const timeoutTask = setTimeout(() => history.push(url), 300);
        return () => clearTimeout(timeoutTask);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, validQuery]);

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
          placeholder="Type a @user or #tag"
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
