import React from "react";

const MooBox = ({ children }: { children: React.ReactNode }) => {
    return <div className="moo-box">{children}</div>;
};

export default MooBox;