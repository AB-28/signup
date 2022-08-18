import React, { useState, useRef } from "react";
import { Form, Alert } from "react-bootstrap";
import Login from "./Login";
import bcrypt from 'bcryptjs';

function Registration() {

    const passRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(true);
    const [phFlag, setPhFlag] = useState(false);

    const [role, setRole] = useState("");
    const [isApproved, setIsApproved] = useState(false);

    const [msg, setMsg] = useState("");

    function handleFormSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password || !phone || !address) {
            setFlag(true);
            setMsg("Please fill in every field");
            return false;
        }


        if (!localStorage.getItem("users")) {
            const pass = passRef.current.value;
            const hashedPassword = bcrypt.hashSync(pass, 10);
            const userObj = {
                name: name,
                email: email,
                hashedPassword: hashedPassword,
                phone: phone,
                address: address,
                isApproved: true,
                role: 'admin'
            }
            let arr = [];
            arr.push(userObj);

            localStorage.setItem('users', JSON.stringify(arr));

        }
        else {
            let existingUsers = JSON.parse(localStorage.getItem("users"));

            if (existingUsers.filter(x => x.email === email).length) {
                setFlag(true);
                setMsg("A user with this email ID already exists");
                return false;
            }
            else {
                setFlag(false);

                const pass = passRef.current.value;
                const hashedPassword = bcrypt.hashSync(pass, 10);
                const userObj = {
                    name: name,
                    email: email,
                    hashedPassword: hashedPassword,
                    phone: phone,
                    address: address,
                    isApproved: isApproved,
                    role: 'user'
                }

                if (existingUsers == null) existingUsers = [];
                existingUsers.push(userObj);
                if (userObj.phone.length !== 10) {
                    setPhFlag("Enter valid phone number. ");
                    return false;
                }
                setRole('user');
                setIsApproved(false);
                localStorage.setItem('users', JSON.stringify(existingUsers));

                console.log("Saved in Local Storage", { name, email, hashedPassword, phone, address });

                setLogin(!login);
            }
        }
    }


    function handleClick() {
        setLogin(!login);
    }

    return (
        <>

            <div>

                {login ? (
                    <Form onSubmit={handleFormSubmit}>
                        <h1>Register</h1>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Full Name"
                                name="name"
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                ref={passRef}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Phone No.</label>
                            <input
                                type="Phone"
                                className="form-control"
                                placeholder="Enter contact no"
                                name="phone"
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="Address"
                                className="form-control"
                                placeholder="Enter address"
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <br />

                        <button type="submit" className="btn btn-dark btn-lg btn-block">
                            Register
                        </button>
                        <br />

                        <p onClick={handleClick} className="forgot-password text-right">
                            Already registered{" "}log in?

                        </p>
                        <br />

                        {flag && (
                            <Alert color="primary" variant="danger">
                                {msg}
                            </Alert>
                        )}
                        {phFlag && (
                            <Alert color="primary" variant="danger">
                                {phFlag}
                            </Alert>
                        )}
                    </Form>
                ) : (
                    <Login />
                )}
            </div>

        </>
    );
}

export default Registration;