import React, { useState } from "react";
import randomColor from "randomcolor";

const AccountPic = ({ username, name }: { username: string; name: string }) => (
  <div
    className="account-pic"
    style={{ background: randomColor({ seed: username }) }}
  >
    {name[0].toUpperCase()}
  </div>
);
export default AccountPic;
