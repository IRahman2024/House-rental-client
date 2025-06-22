import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { lineSpinner } from 'ldrs';
lineSpinner.register();

const ManageListing = () => {
    const [loader, setLoader] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [owners, setOwners] = useState();
    const [house, setHouse] = useState();
    lineSpinner.register();


    useEffect(() => {
        setLoader(true);
        axios.get(`http://localhost:5000/allHouse`)
            .then(res => {
                setHouse(res.data);
                setLoader(false);
            })

    }, [refresh])

    // console.log(house);
    // console.log(owners);

    const approval = (id) => {
        // console.log(id);
        axios.put(`http://localhost:5000/updateStatus?id=${id}`, {'status': 'approved'})
        .then(res => {
            console.log(res)
            setRefresh(!refresh);
        })
    }

    const denial = (id) => {
        console.log(id);
        setLoader(true);
        axios.put(`http://localhost:5000/updateStatus?id=${id}`, {'status': 'pending'})
        .then(res => {
            console.log(res)
            setRefresh(!refresh);
        })
    }


    return (
        <div>
            <div>
                {
                    (loader) && <div className="fixed z-20 flex h-full w-3/4 items-center justify-center bg-white opacity-55">
                        <l-line-spinner
                            size="121"
                            stroke="6"
                            speed="1"
                            color="black"
                        ></l-line-spinner>
                    </div>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Owner Info</th>
                            <th>House Information</th>
                            <th>Rent</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            house?.map((house, idx) => (
                                <tr key={idx}>
                                    <th>
                                        <label>
                                            {idx+1}
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={house?.user?.profilePic}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{house?.user?.userName}</div>
                                                <div className="text-sm opacity-50">{house?.user?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    {house?.houseName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{house?.location}</span>
                                    </td>
                                    <td>{house?.rent} taka/month</td>
                                    <td>{house?.houseType}</td>
                                    <th>
                                        {
                                            house?.status == 'pending' ? <button 
                                            onClick={() => approval(house._id)}
                                            className="btn btn-xs btn-warning">Pending</button> : <button
                                            onClick={() => denial(house._id)} className="btn btn-xs btn-success">Approved</button>
                                        }
                                    </th>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Owner Info</th>
                            <th>House Information</th>
                            <th>Rent</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ManageListing;