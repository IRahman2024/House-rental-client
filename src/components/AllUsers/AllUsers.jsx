import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllUsers = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        axios.get('http://localhost:3000/allUsers')
            .then(res => setUsers(res.data))
    }, [])

    console.log(users);


    return (
        <div className='grid justify-center m-4 w-full text-center'>
            <p className="text-3xl font-semibold">All User List</p>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, idx) => (
                                <tr className="w-full" key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <img
                                            className='size-20 rounded-xl'
                                            src={user?.profilePic} alt="" />
                                    </td>
                                    <td>{user?.firstName} {user?.lastName}</td>
                                    <td>{user?.userName}</td>
                                    <td>
                                        {
                                            user?.role == 'admin' && <div className="badge badge-info">{user?.role}</div>
                                        }
                                        {
                                            user?.role == 'Owner' && <div className="badge badge-warning">{user?.role}</div>
                                        }
                                        {
                                            user?.role == 'Renter' && <div className="badge badge-success">{user?.role}</div>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;