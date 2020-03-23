import React, { useState } from 'react';
import { renderCalderaApp, useLocation, useHistory, Head } from 'caldera';

const App = () => {
    const location = useLocation();
    const history = useHistory();
    const [path, setPath] = useState('');

    return (
        <div>
            <Head>
                <title>{location.pathname}</title>
            </Head>
            <h1>
                {location.pathname} + {location.search}
            </h1>
            <div>New path: /{path}</div>

            <input
                type="text"
                value={path}
                onChange={e => setPath(e.target.value)}
            />
            <div>
                <button onClick={() => history.push(`/${path}`)}>
                    Push New Path
                </button>
                <button onClick={() => history.replace(`/${path}`)}>
                    Replace New Path
                </button>
            </div>
            <div>
                <button onClick={() => history.goBack()}>Go Back</button>
                <button onClick={() => history.goForward()}>Go Forward</button>
            </div>
        </div>
    );
};

renderCalderaApp(<App />);
