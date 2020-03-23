import React, { useState } from 'react';
import { renderCalderaApp, useLocation, useHistory, Head } from 'caldera';
import style from "./style";
import NavBar from "./NavBar";

const App = () => {
    const location = useLocation();
    const history = useHistory();
    const [path, setPath] = useState('');

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
        </>

    );
};

renderCalderaApp(<App />);
