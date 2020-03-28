import { useState } from "react"
import React from "react"
import MooBox from "./MooBox"

const Login = () => {
    const [isLogin, setIsLogin] = useState(false)

    return <div className="login">
        <MooBox>
            <div className="login-inner">
                <div className="toggle-wrapper">
                    <div className={`toggle ${isLogin ? "" : "active"}`} onClick={() => setIsLogin(false)}>
                        Sign up
            </div>
                    <div className="spacer" ></div>
                    <div className={`toggle ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
                        Log in
            </div>
                </div>
                <div className="input-wrapper">
                    <input placeholder="@username" className="moo-input "></input>
                </div>
                <div className="login-padding" />

                <div className="input-wrapper">
                    <input placeholder="password" type="password" className="moo-input "></input>
                </div>
                {!isLogin ? <>
                    <div className="login-padding" />

                    <div className="input-wrapper">
                        <input placeholder="confirm password" type="password" className="moo-input "></input>
                    </div>
                </> : <></>}
                <div className="login-padding" />
                <input type="button" value="Join Twudder" className="login-button"></input>

            </div>
        </MooBox>
    </div>

}
export default Login;