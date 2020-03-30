import React, { useState } from "react";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";
import { MooType } from "./Moo";
import { MooAccount } from "./Account";

const NewMoo = ({
  setMoos,
  moos,
  account
}: {
  setMoos: (val: MooType[]) => void;
  moos: MooType[];
  account: MooAccount;
}) => {
  const [value, setValue] = useState("");

  return (
    <MooBox>
      <div className="new-moo-wrapper">
        <form
          onSubmit={e => {
            e.preventDefault();
            setMoos([
              {
                account,
                text: value,
                tags: value
                  .split(" ")
                  .filter(w => w[0] === "#" && w.length > 1)
                  .map(w => w.replace(/\W/g, "")),
                mentions: value
                  .split(" ")
                  .filter(w => w[0] === "@" && w.length > 1)
                  .map(w => w.replace(/\W/g, ""))
              },
              ...moos
            ]);
            setValue("");
          }}
        >
          <div className="new-moo-input-wrapper">
            <AccountPic username={account.username} name={account.name} />
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
            <button
              type="submit"
              className="moo-submit"
              {...(value.length >= 140 && { disabled: true })}
            >
              Moo
            </button>
          </div>
        </form>
      </div>
    </MooBox>
  );
};

export default NewMoo;
