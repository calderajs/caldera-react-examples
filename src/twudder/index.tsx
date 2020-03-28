import React, { useState } from "react";
import { renderCalderaApp, useLocation, Head, useSharedState } from "caldera";
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
          <AccountPic username={moo.account.username} name={moo.account.name} />
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

const Feed = ({
  account,
  filter
}: {
  account: MooAccount | null;
  filter: string;
}) => {
  const [moos, setMoos] = useSharedState(moosResource);
  const params = new URLSearchParams(filter.slice(1));

  const filterMoos = ({ account, text, tags }: MooType) => {
    if (filter === "") return true;
    if (params.has("mention"))
      return account.username === params.get("mention");
    const paramTag = params.get("tags");
    if (paramTag !== null) return tags.includes("#" + paramTag);
    return false;
  };

  return (
    <div className="feed-outer">
      <div className="feed-inner">
        {account ? (
          <NewMoo setMoos={setMoos} account={account} moos={moos} />
        ) : null}
        {moos.filter(filterMoos).map(m => (
          <Moo moo={m} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [account, setAccount] = useState<MooAccount | null>(null);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const location = useLocation();

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
      <Feed account={account} filter={location.search} />
    </div>
  );
};

renderCalderaApp(<App />);
