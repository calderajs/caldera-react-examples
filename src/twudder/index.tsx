import React, { useState } from "react";
import { renderCalderaApp, useLocation, useHistory, Head } from "caldera";
import style from "./style";
import NavBar from "./NavBar";
import AccountPic from "./AccountPic";

const MooBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="moo-box">{children}</div>;
};

const NewMoo = () => {
  const [value, setValue] = useState("");

  return (
    <MooBox>
      <div className="new-moo-wrapper">
        <div className="new-moo-input-wrapper">
          <AccountPic color="green" text="R" />
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Type your moo here..."
            className="moo-input moo-textarea"
            rows={5}
            maxLength={140}
          ></textarea>
        </div>
        <div className="new-moo-submit-wrapper">
          <span className="new-moo-char-count"> {value.length}/140 </span>
          <input
            type="button"
            className="moo-submit"
            value="Moo"
            {...(value.length >= 140 && { disabled: true })}
          ></input>
        </div>
      </div>
    </MooBox>
  );
};

const Moo = () => {
  return (
    <MooBox>
      <div className="moo">
        <div className="account">
          <AccountPic color="red" text="R" />
          <div className="account-name-wrapper">
            <div className="account-name">Rahul GS</div>
            <div className="account-id">@cho</div>
          </div>
        </div>
      </div>
    </MooBox>
  );
};

const Feed = () => {
  return (
    <div className="feed-outer">
      <div className="feed-inner">
        <NewMoo />
        <Moo />
      </div>
    </div>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(false)

  return <div className="login">
    <MooBox>
      <div className="login-inner">
        <div className="toggle-wrapper">
          <div className={`toggle ${isLogin ? "" : "active"}`} onClick={() => setIsLogin(false)}>
            Sign up
          </div>
          <div className="spacer" ></div>
          <div className={`toggle ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
            Log in
          </div>
        </div>
        <div className="input-wrapper">
          <input placeholder="@username" className="moo-input "></input>
        </div>
        <div className="login-padding" />

        <div className="input-wrapper">
          <input placeholder="password" type="password" className="moo-input "></input>
        </div>
        {!isLogin ? <>
          <div className="login-padding" />

          <div className="input-wrapper">
            <input placeholder="confirm password" type="password" className="moo-input "></input>
          </div>
        </> : <></>}
        <div className="login-padding" />
        <input type="button" value="Join Twudder" className="login-button"></input>

      </div>
    </MooBox>
  </div>

}

const App = () => {
  return (
    <>
      <Head>
        <title>{`hi`}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <style>{style}</style>
      </Head>
      <NavBar />
      <Login />
      <Feed />
    </>
  );
};

renderCalderaApp(<App />);
