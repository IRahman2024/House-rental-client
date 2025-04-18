import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllComplains = () => {
    const [complains, setComplains] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/allComplains')
            .then((res) => setComplains(res.data));
    }, [])

    console.log(complains);
    

    return (
        <div className="m-4 w-full">
            <p className="text-3xl font-bold">All Complains Bellow</p>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>HouseName</th>
                            <th>User Name</th>
                            <th>User Image</th>
                            <th>Complain</th>
                            <th>User Email</th>
                            <th>Owner Email</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            complains?.map((complain, idx) => (
                                <tr className="w-full" key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{complain?.houseName}</td>
                                    <td>{complain?.firstName} {complain?.lastName}</td>
                                    <td>
                                        <img 
                                        className="size-20 rounded-xl"
                                        src={complain?.image} alt="" />
                                    </td>
                                    <td>{complain?.complain}</td>
                                    <td>{complain?.userEmail}</td>
                                    <td>{complain?.ownerEmail}</td>
                                    <td className="flex items-center">
                                        <Link to={`http://localhost:5173${complain?.url}`} className="btn btn-sm btn-success">Visit</Link>
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

export default AllComplains;