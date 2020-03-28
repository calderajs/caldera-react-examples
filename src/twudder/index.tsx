import React, { useState } from "react";
import { renderCalderaApp, useLocation, useHistory, Head } from "caldera";
import style from "./style";
import NavBar from "./NavBar";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";


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


const App = () => {
  const [login, setLogin] = useState(null);
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
      <Feed />
    </>
  );
};

renderCalderaApp(<App />);
