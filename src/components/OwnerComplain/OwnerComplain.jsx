import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const OwnerComplain = () => {
    const [complain, setComplain] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3000/complains-by-email?email=${user?.email}`)
            .then(res => setComplain(res.data))
            .catch(err => console.error("Error fetching complaints:", err)); // Added error handling
    }, [user?.email]);

    console.log(complain);


    return (
        <div className="m-4 w-full">
            <p className="text-3xl font-bold">Complains</p>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>House Name</th>
                            <th>User Name</th>
                            <th>Complain</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            complain?.map((complain, idx) => (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{complain?.houseName}</td>
                                    <td>{complain?.firstName} {complain?.lastName}</td>
                                    <td>{complain?.complain}</td>
                                    <td className="flex items-center">
                                        <Link
                                        to={`http://localhost:5173${complain?.url}`}
                                        className="btn btn-success btn-sm"
                                        >Details</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div> {/* This closing div was missing */}
        </div>
    );
};

export default OwnerComplain;
