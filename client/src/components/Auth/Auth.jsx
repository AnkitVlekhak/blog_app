import React from "react";
import "./Auth.css";
// import Logo from "../../img/logo.png";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    // const loading = false;
    const navigate = useNavigate();
    const [isSignUp, setisSignUp] = useState(false);
    const [data, setData] = useState({ firstname: "", lastname: "", username: "", email: "", password: "", confirmpass: "" });
    const [confirm, setConfirm] = useState(true);
    const handleChange = (e) => {
        var { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const resetForm = () => {
        setConfirm(true)
        setData({ firstname: "", lastname: "", username: "", email: "", password: "", confirmpass: "" });
    }
    const handleSignIn = (e) => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential)
                const user = userCredential.user;
                dispatch({ type: "AUTH_SUCCESS", data: { token: user.accessToken, user: { displayName: user.displayName, email: user.email } } })
                navigate('/')
            })
            .catch((error) => {
                dispatch({ type: "AUTH_FAILED" })
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
    const handleRegister = (e) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: `${data.firstname} ${data.lastname}`
                }).then(() => {
                    const user = auth.currentUser;
                    dispatch({ type: "AUTH_SUCCESS", data: { token: user.accessToken, user: { displayName: user.displayName, email: user.email } } })
                }).catch((error) => {
                    alert(error.message);
                });
                navigate('/')

            })
            .catch((error) => {
                dispatch({ type: "AUTH_FAILED" })
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (isSignUp) {
            if (data.password !== data.confirmpass) {
                setConfirm(false);
            }
            else {
                dispatch({ type: "AUTH_START" })
                handleRegister();
                // dispatch(signUp(data))
            }
        }
        else {
            dispatch({ type: "AUTH_START" })
            handleSignIn();
            // dispatch(logIn(data))
        }
    }

    return (
        <div className="Auth">
            <div className="a-left">
                {/* <img src={Logo} alt="" /> */}
                <div className="Webname">
                    <h1>Bloggers</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    {/* <form className="infoForm authForm"> */}
                    <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

                    {isSignUp && (
                        <>
                            <div>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="infoInput"
                                    name="firstname"
                                    value={data.firstname}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="infoInput"
                                    name="lastname"
                                    value={data.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="infoInput"
                                    name="username"
                                    placeholder="Username"
                                    value={data.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <input
                            type="email"
                            className="infoInput"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                        />
                        {isSignUp && (
                            <input
                                type="password"
                                className="infoInput"
                                name="confirmpass"
                                placeholder="Confirm Password"
                                value={data.confirmpass}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <span style={{ display: confirm ? "none" : "block", fontSize: "12px", color: "red", alignSelf: "flex-end", marginRight: "5px" }}>
                        * Confirm Password is not same *
                    </span>
                    <div>
                        <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setisSignUp((prev) => { resetForm(); return !prev; }) }}>{isSignUp ? "Already have an account? Login!" : "Don't have an account? Sign up"}</span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading}>{loading ? "Loading..." : isSignUp ? "SignUp" : "LogIn"}</button>
                </form>
            </div>

        </div>
    );
};
export default Auth;
