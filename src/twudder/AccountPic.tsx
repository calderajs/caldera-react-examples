import React, { useState } from "react";


const AccountPic = ({ color, text }: { color: string, text: string }) =>
    <div className="account-pic" style={{ background: color }}>{text}</div>
export default AccountPic