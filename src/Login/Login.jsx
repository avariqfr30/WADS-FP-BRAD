import "./Login.css";
// import illustration from "../assets/illustration.png";
import { useState, useEffect } from "react";
// import warning from "../assets/warning.png";

import {
    auth,
    db,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
  } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    
    const [NewUser, setNewUser] = useState(true);

    const [username, setusername] = useState("");
    const [email, setemail] = useState(null); 
    const [password, setpassword] = useState("");
    const [user, loading, errorAuthState] = useAuthState(auth);

    const [error, seterror] = useState(false);
    const [errorMsg, seterrorMsg] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        seterror(false);

        if(NewUser) {
            registerWithEmailAndPassword(username, email, password)
                .then(() => {
                    localStorage.setItem("username", username);
                })
                .catch((error) => {
                    seterror(true)
                    const errorMessage = error.message;
                    seterrorMsg(errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                seterror(true)
                const errorMessage = error.message;
                seterrorMsg(errorMessage);
            });
        }
    };

    // useEffect(() => {
    //     if (loading) {
    //         return;
    //     }
    // })
    return (
        <div className="login-page">
            <header>
                <span>
                    
                </span>
            </header>
            
            {/* <img src={illustration} alt="" /> */}

            <h2 className="title">
                Welcome to BRAD Admin Dashboard!
            </h2>

            <form onSubmit={submit}>
                {NewUser && (
                    <div className="username">
                        <input
                            onChange={(e) => setusername(String(e.target.value))}
                            type="username"
                            id="username"
                            required
                        />
                        <label  htmlFor="username">username</label>
                    </div>
                )}

                <div className="email">
                    <input
                        onChange={(e) => setemail(String(e.target.value))}
                        type="email"
                        id="email"
                        required
                    />
                    <label  htmlFor="email">email</label>
                </div>

                <div className="password">
                    <input
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        id="password"
                        required
                    />
                    <label  htmlFor="password">password</label>
                </div>

                {/* {error && <img src={illustration} alt=""
                className="status" />} */}
                
                {error && <span className="error">Process Failed</span>}

                {error && <span className="error">{errorMsg}</span>}

                <button type="submit">{NewUser ? "Sign Up" : "Log In"}
                </button>

                {NewUser ? (
                    <span className="user-stat">
                        Already have an account? <b onClick={() => {
                            setNewUser(false)
                            seterror(false)
                            console.log("not yippie");
                        }}>Log In</b>
                    </span>
                ) : (
                    <span className="user-stat">
                        Don't have an account? <b onClick={() => {
                            setNewUser(true)
                            seterror(true)
                            console.log("yippie");
                        }}>Sign Up</b>
                    </span>
                )}
            </form>
        </div>
    );
};

export default Login;

