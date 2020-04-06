import { useState } from "react";
import { useSharedState } from "caldera";
import React from "react";
import MooBox from "./MooBox";
import { MooAccount } from "./Account";
import { resources } from "./twudderResources";

const Login = ({
  setShowLoginMenu,
  setAccount,
}: {
  setShowLoginMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setAccount: React.Dispatch<React.SetStateAction<MooAccount | null>>;
}) => {
  const [accounts, addNewAccount] = useSharedState(resources.accounts);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const onSubmitLoginForm = () => {
    if (isLogin) {
      if (username === "" || password === "") {
        return;
      }
      const attempt = accounts.get(username);
      if (attempt) {
        setAccount(attempt);
        setShowLoginMenu(false);
      }
    } else {
      if (
        username === "" ||
        password === "" ||
        confPassword === "" ||
        name === "" ||
        confPassword !== password ||
        accounts.has(username)
      ) {
        return;
      }

      setUsername("");
      setName("");
      setPassword("");
      setConfPassword("");
      setShowLoginMenu(false);
      const newAccount = {
        username: username.trim(),
        password,
        name: name.trim(),
      };
      addNewAccount(new Map([[username, newAccount]]));
      setAccount(newAccount);
    }
  };

  return (
    <div className="login" onClick={(e) => e.stopPropagation()}>
      <MooBox>
        <div className="login-inner">
          <div className="toggle-wrapper">
            <div
              className={`toggle ${isLogin ? "" : "active"}`}
              onClick={() => setIsLogin(false)}
            >
              Sign up
            </div>
            <div className="spacer"></div>
            <div
              className={`toggle ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Log in
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitLoginForm();
            }}
          >
            {!isLogin ? (
              <>
                <div className="input-wrapper">
                  <input
                    placeholder="name"
                    className="moo-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="login-padding" />
              </>
            ) : (
              <></>
            )}

            <div className="input-wrapper">
              <input
                placeholder="@username"
                className="moo-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-padding" />
            <div className="input-wrapper">
              <input
                placeholder="password"
                type="password"
                className="moo-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin ? (
              <>
                <div className="login-padding" />
                <div className="input-wrapper">
                  <input
                    placeholder="confirm password"
                    type="password"
                    className="moo-input"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="login-padding" />
            <button type="submit" className="login-button">
              {isLogin ? "Rejoin the Udderverse" : "Join the Udderverse"}
            </button>
          </form>
        </div>
      </MooBox>
    </div>
  );
};
export default Login;
