import React, { useState } from "react";
import {
  renderCalderaApp,
  useLocation,
  useHistory,
  Head,
  makeSharedResource,
  useSharedState
} from "caldera";
import style from "./style";
import NavBar from "./NavBar";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";
import Login from "./Login";
import NewMoo from "./NewMoo";
import { MooAccount } from "./Account";
import { MooType, moosResource } from "./Moo";

const Moo = ({ moo }: { moo: MooType }) => {
  return (
    <MooBox>
      <div className="moo">
        <div className="account">
          <AccountPic color="red" text="R" />
          <div className="account-name-wrapper">
            <div className="account-name">{moo.account.name}</div>
            <div className="account-id">{`@${moo.account.username}`}</div>
          </div>
        </div>
        <div className="moo-content">{moo.text}</div>
      </div>
    </MooBox>
  );
};

const Feed = ({ account }: { account: MooAccount | null }) => {
  const [moos, setMoos] = useSharedState(moosResource);
  return (
    <div className="feed-outer">
      <div className="feed-inner">
        {account ? (
          <NewMoo setMoos={setMoos} account={account} moos={moos} />
        ) : null}

        {moos.reverse().map(m => (
          <Moo moo={m} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [account, setAccount] = useState<MooAccount | null>(null);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  return (
    <div onClick={() => setShowLoginMenu(false)}>
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
      <Feed account={account} />
    </div>
  );
};

renderCalderaApp(<App />);
