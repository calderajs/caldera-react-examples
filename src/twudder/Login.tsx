import { useState } from "react";
import React from "react";
import MooBox from "./MooBox";
import { accounts, MooAccount } from "./Account";

const Login = ({
  setShowLoginMenu,
  setAccount
}: {
  setShowLoginMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setAccount: React.Dispatch<React.SetStateAction<MooAccount | null>>;
}) => {
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
        confPassword !== password
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
        name: name.trim()
      };
      accounts.set(username, newAccount);
      setAccount(newAccount);
    }
  };

  return (
    <div className="login" onClick={e => e.stopPropagation()}>
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
          <form onSubmit={onSubmitLoginForm}>
            {!isLogin ? (
              <>
                <div className="input-wrapper">
                  <input
                    placeholder="name"
                    className="moo-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
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
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="login-padding" />
            <div className="input-wrapper">
              <input
                placeholder="password"
                type="password"
                className="moo-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
                    onChange={e => setConfPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            <div className="login-padding" />
            <input
              type="submit"
              value={isLogin ? "Login" : "Join Twudder"}
              className="login-button"
            ></input>
          </form>
        </div>
      </MooBox>
    </div>
  );
};
export default Login;
