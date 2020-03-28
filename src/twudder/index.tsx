import React, { useState } from "react";
import {
  renderCalderaApp,
  useLocation,
  useHistory,
  Head,
  makeSharedResource
} from "caldera";
import style from "./style";
import NavBar from "./NavBar";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";
import Login from "./Login";
import NewMoo from "./NewMoo";
import { MooAccount } from "./Account";

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
  const [account, setAccount] = useState<MooAccount | null>(null);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  return (
    <>
      <Head>
        <title>{`Twudder`}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <style>{style}</style>
      </Head>
      <NavBar
        account={account}
        setAccount={setAccount}
        setShowLoginMenu={setShowLoginMenu}
        showLoginMenu={showLoginMenu}
      />
      {showLoginMenu ? (
        <Login setShowLoginMenu={setShowLoginMenu} setAccount={setAccount} />
      ) : (
        <></>
      )}

      <Feed />
    </>
  );
};

renderCalderaApp(<App />);
