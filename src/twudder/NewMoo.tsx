import React, { useState } from "react";
import AccountPic from "./AccountPic";
import MooBox from "./MooBox";
import { MooType } from "./Moo";
import { MooAccount } from "./Account";

const NewMoo = ({
  addNewMoo,
  account,
}: {
  addNewMoo: (val: Omit<MooType, "id">) => Promise<void>;
  account: MooAccount;
}) => {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <MooBox>
      <div className="new-moo-wrapper">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (value.trim() !== "") {
              setValue("");
              setSubmitting(true);
              await addNewMoo({
                account,
                body: value,
                tags: value
                  .split(" ")
                  .filter((w) => w[0] === "#" && w.length > 1)
                  .map((w) => w.replace(/\W/g, "")),
                mentions: value
                  .split(" ")
                  .filter((w) => w[0] === "@" && w.length > 1)
                  .map((w) => w.replace(/\W/g, "")),
              });
              setSubmitting(false);
            }
          }}
        >
          <div className="new-moo-input-wrapper">
            <AccountPic username={account.username} name={account.name} />
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
              {...((value.length >= 140 || submitting) && { disabled: true })}
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
