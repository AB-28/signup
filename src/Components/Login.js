import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Home from "./Home";
import bcrypt from 'bcryptjs';


function Login() {

    const [emaillog, setEmaillog] = useState("");
    const [passwordlog, setPasswordlog] = useState("");

    const [flag, setFlag] = useState(false);

    const [home, setHome] = useState(true);

    function handleLogin(e) {
        e.preventDefault();

        console.log(JSON.parse(localStorage.getItem('user')));
        const getEmail = JSON.parse(localStorage.getItem('user')).email;

        const getHashedPassword = JSON.parse(localStorage.getItem('user')).hashedPassword;
        const getIsApproved = JSON.parse(localStorage.getItem('user')).isApproved;
        if (!emaillog || !passwordlog) {
            setFlag(true);
            console.log("EMPTY");
        } else {
            bcrypt.compare(passwordlog, getHashedPassword, function (err, isMatch) {
                if (err) {
                    throw err;
                }
                else if (!isMatch || emaillog !== getEmail) {
                    setFlag(true);
                    console.log("Doesn't match");
                }
                // else if (getIsApproved === false) {
                //     setFlag(true);
                //     console.log("This email ID is not approved by admin. ");
                // }
                else {
                    setHome(!home);
                    setFlag(false);
                    console.log("match");
                }

            });
        }

    }
    // isApproved login pr show krna hai. 

    return (
        <>

            <div>
                {home ? (
                    <form onSubmit={handleLogin}>
                        <h3>LogIn</h3>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(event) => setEmaillog(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => setPasswordlog(event.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Login
                        </button>

                        {flag && (
                            <Alert color="primary" variant="warning">
                                Fill correct information.
                            </Alert>
                        )}
                    </form>
                ) : (
                    <Home />
                )}
            </div>

        </>
    );
}

export default Login;