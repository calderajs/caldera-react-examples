import { useHistory } from "caldera";
import React, { useMemo } from "react";
import { MooAccount } from "./Account";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";

export interface MooType {
  account: MooAccount;
  body: string;
  tags: string[];
  mentions: string[];
}

export const Moo = ({ moo }: { moo: MooType }) => {
  const history = useHistory();
  const tagClick = (tag: string, word: string) => () =>
    history.push(`/search?${tag}=${word}`);

  const tokenizedMooText = useMemo(() => {
    const initial: (string | JSX.Element)[] = [""];
    return moo.body.split(" ").reduce((acc, w) => {
      if (
        (w[0] === "@" || w[0] === "#") &&
        w.length > 1 &&
        w.slice(1).startsWith(w.replace(/\W/g, ""))
      ) {
        const index = w.replace(/\W/g, "").length + 1;
        acc.push(
          <span
            key={acc.length}
            onClick={tagClick(
              w[0] === "@" ? "mention" : "tags",
              w.replace(/\W/g, "")
            )}
            style={{ color: "#54C1FF", cursor: "pointer" }}
          >
            {w.slice(0, index)}
          </span>,
          `${w.slice(index)} `
        );
      } else acc[acc.length - 1] = acc[acc.length - 1] + w + " ";
      return acc;
    }, initial);
  }, [moo.body]);

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
        <div className="moo-content">{tokenizedMooText}</div>
      </div>
    </MooBox>
  );
};
