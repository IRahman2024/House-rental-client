import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { lineSpinner } from 'ldrs';


const AllUsers = () => {
    const [users, setUsers] = useState();
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingUserId, setLoadingUserId] = useState(null);

    lineSpinner.register();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/allUsers')
            .then(res => setUsers(res.data))
            .finally(() => {
                setLoading(false);
            })
    }, [refresh])

    console.log(users);



    // Handle role change function
    const handleRoleChange = (userId, newRole) => {
        setLoadingUserId(userId);
        setRefresh(!refresh);
        axios.patch(`http://localhost:5000/updateRole/${userId}`, { role: newRole })
            .then(res => {
                if (res.data.success) {
                    setUsers(prev =>
                        prev.map(u =>
                            u._id === userId ? { ...u, role: newRole } : u
                        )
                    );
                }
            })
            .finally(() => setRefresh(!refresh));
    };

    if (loading) {
        return (
            <div className="fixed z-20 flex h-full w-full items-center justify-center bg-white opacity-55">
                <l-line-spinner
                    size="121"
                    stroke="6"
                    speed="1"
                    color="black"
                ></l-line-spinner>
            </div>
        )
    }

    return (
        <div className='grid justify-center m-4 w-full text-center'>
            <p className="text-3xl font-semibold">All User List</p>
            <div className="overflow-x-auto rounded-box border border-yellow-400  bg-base-100 mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>Role</th>
                            <th>Change Role</th>
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
                                            user?.role === 'admin' && <div className="badge badge-info">{user?.role}</div>
                                        }
                                        {
                                            user?.role === 'owner' && <div className="badge badge-warning">{user?.role}</div>
                                        }
                                        {
                                            user?.role === 'renter' && <div className="badge badge-success">{user?.role}</div>
                                        }
                                    </td>
                                    <td>
                                        <div>
                                            <select
                                                className="select select-bordered"
                                                value={user.role}
                                                onChange={e => handleRoleChange(user._id, e.target.value)}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="owner">Owner</option>
                                                <option value="renter">Renter</option>
                                            </select>
                                        </div>
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