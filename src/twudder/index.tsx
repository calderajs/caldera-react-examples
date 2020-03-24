import React, { useState } from 'react';
import { renderCalderaApp, useLocation, useHistory, Head } from 'caldera';
import style from "./style";
import NavBar from "./NavBar";
import AccountPic from './AccountPic';


const MooBox = ({ children }: { children: React.ReactNode }) => {
    return <div className="moo-box">
        {children}
    </div>
}
const NewMoo = () => {
    return <MooBox>
        <div className="new-moo-wrapper">
            <div className="new-moo-input-wrapper">
                <AccountPic color="green" text="R" />
                <textarea placeholder="Type your moo here..." className="moo-input"></textarea>
            </div>
            <div className="new-moo-submit-wrapper">
                <span className="new-moo-char-count"> 0/140 </span>
                <input type="button" className="moo-submit" value="Moo"></input>
            </div>
        </div>


    </MooBox >
}
const Feed = () => {
    return <div className="feed-outer">
        <div className="feed-inner">
            <NewMoo />
        </div>
    </div>
}

const App = () => {

    return (
        <>
            <Head>
                <title>{`hi`}</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap"
                    rel="stylesheet"
                />
                <style>{style}</style>
            </Head>
            <NavBar />
            <Feed />

        </>

    );
};

renderCalderaApp(<App />);
