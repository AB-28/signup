import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import Home from "./Home";
import bcrypt from 'bcryptjs';
//import bcrypt from 'bcrypt';


function Login() {

    const [emaillog, setEmaillog] = useState("");
    const [passwordlog, setPasswordlog] = useState("");

    const [flag, setFlag] = useState(false);

    const [home, setHome] = useState(true);
    const [msg, setMsg] = useState("");

    function handleLogin(e) {
        e.preventDefault();

        const getUsers = JSON.parse(localStorage.getItem('users'));
        //If email or password field is empty 
        if (!emaillog || !passwordlog) {
            setFlag(true);
            setMsg("Enter all details. ")
            console.log("EMPTY");
        }
        //checj if entered email & password exists in local storage
        else {
            const user = getUsers.filter((val) => {
                return val.email === emaillog
            })[0];

            //compare the password
            bcrypt.compare(passwordlog, user.hashedPassword, function (err, isMatch) {
                if (err) {
                    throw err;
                }
                else if (!isMatch || emaillog !== user.email) {
                    setFlag(true);
                    setMsg("Incorrect email ID or password");
                    console.log("Doesn't match");
                }
                else if (user.isApproved === false) {
                    setFlag(true);
                    setMsg("Waiting for approval from admin. ")
                    console.log("This email ID is not approved by admin. ");
                }
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
                        <br />
                        <br />

                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Login
                        </button>

                        {flag && (
                            <Alert color="primary" variant="warning">
                                {msg}
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