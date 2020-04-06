import { Head, renderCalderaApp, useLocation, useSharedState } from "caldera";
import React, { useState } from "react";
import { MooAccount } from "./Account";
import Login from "./Login";
import { Moo, MooType } from "./Moo";
import NavBar from "./NavBar";
import NewMoo from "./NewMoo";
import style from "./style";
import { moosResource, setupDatabase } from "./twudderResources";

const Feed = ({
  account,
  filter,
}: {
  account: MooAccount | null;
  filter: string;
}) => {
  const [moos, addNewMoo] = useSharedState(moosResource);
  const searchParams = new URLSearchParams(filter.slice(1));

  const filterMoos = ({ account, tags, mentions }: MooType) => {
    if (filter === "") return true;
    const searchMention = searchParams.get("mention");
    const searchTag = searchParams.get("tags");

    if (searchMention !== null)
      return (
        account.username === searchParams.get("mention") ||
        mentions.includes(searchMention)
      );
    if (searchTag !== null) return tags.includes(searchTag);
    return false;
  };

  return (
    <div className="feed-outer">
      <div className="feed-inner">
        {account && (
          <NewMoo addNewMoo={addNewMoo} account={account} moos={moos} />
        )}
        {Array.from(moos)
          .reverse()
          .filter(filterMoos)
          .map((m) => (
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
    <div id="twudder-app" onClick={() => setShowLoginMenu(false)}>
      <Head>
        <title>Twudder</title>
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

(async () => {
  await setupDatabase();
  await renderCalderaApp(<App />, {
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
  });
})();
