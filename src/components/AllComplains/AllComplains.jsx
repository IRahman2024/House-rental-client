import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lineSpinner } from 'ldrs';
const AllComplains = () => {
    const [complains, setComplains] = useState();
    const [loader, setLoader] = useState(false);
    lineSpinner.register();

    useEffect(() => {
        setLoader(true);
        axios.get('http://localhost:5000/allComplains')
            .then((res) => setComplains(res.data))
            .finally(() => setLoader(false))
    }, [])

    console.log(complains);

    if (loader) {
        return (
            <div className="fixed z-20 flex h-full w-3/4 items-center justify-center bg-white opacity-55">
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