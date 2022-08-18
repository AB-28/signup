import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

function Admin() {

    const [isApproved, setIsApproved] = useState(false);
    const [users, setUsers] = useState([]);

    const [userObj, setUserObj] = useState([]);
    useEffect(() => {
        let existingUsers = JSON.parse(localStorage.getItem("users"));
        setUserObj(existingUsers);
    }, []);

    function handleApprove(email) {

        let existingUsers = JSON.parse(localStorage.getItem("users"));
        existingUsers.map(x => {
            if (x.email === email) {
                return x.isApproved = true;
            }
        });
        setUserObj(existingUsers);
        localStorage.setItem('users', JSON.stringify(existingUsers));
    }
    function handleReject(email) {
        let existingUsers = JSON.parse(localStorage.getItem("users"));
        existingUsers.map(x => {
            if (x.email === email) {
                return x.isApproved = false;
            }
        });
        setUserObj(existingUsers);
        localStorage.setItem('users', JSON.stringify(existingUsers));
    }

    return (
        <div>
            <h1>Welcome Admin!</h1>
            <br />
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th> Email</th>
                        <th> Phone</th>
                        <th> Action</th>
                    </tr>
                </thead>
                <tbody>

                    {userObj.map(user => {
                        if (user.role === 'user') {
                            return (
                                <tr>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        {user.phone}
                                    </td>
                                    <td>
                                        {user.isApproved
                                            ? <button className="btn btn-secondary" onClick={() => handleReject(user.email)}> Reject  </button> //onclick function send email, and set isApprove to be true. change in local storage, by set item. use map for set item. 
                                            : <button className="btn btn-secondary" onClick={() => handleApprove(user.email)}> Approve </button>
                                        }
                                    </td>
                                </tr>

                            )
                        }
                    })}
                </tbody>
            </Table>
        </div>
    );
}
export default Admin;