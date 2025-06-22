import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const OwnerBookings = () => {
    const { user } = useContext(AuthContext);
    // const [datas, setDatas] = useState();
    const [reservations, setReservations] = useState();
    const [refetch, setRefetch] = useState(false);

    function convertDateString(dateString) {
        if (!dateString) return "Invalid Date";

        const [year, month, day] = dateString.split(', ').map(Number);
        const date = new Date(year, month, day); // Fix month indexing

        if (isNaN(date.getTime())) {
            console.error("Invalid Date:", dateString);
            return "Invalid Date";
        }

        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/deleteReservation/${id}`)
            .then(() => {
                alert("Reservation deleted successfully!");
                setRefetch(!refetch); // Toggle refetch state to trigger useEffect
            })
            .catch(err => console.error("Error deleting reservation:", err));
    };

    useEffect(() => {
        if (!user?.email) return; // Ensure email exists before fetching

        axios.get(`http://localhost:5000/getReservedDates-house/${user?.email}`)
            .then(res => {
                // setDatas(res.data);
                const convertedDatas = res.data.map(data => ({
                    ...data,
                    from: convertDateString(data.from),
                    to: convertDateString(data.to),
                }));
                setReservations(convertedDatas);
            })
            .catch(err => console.error("Error fetching data:", err));
    }, [user?.email, refetch]);

    console.log(reservations);


    return (
        <div className="m-4 w-full">
            <p>Your Bookings</p>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 w-full mt-4">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>HouseName</th>
                            <th>From</th>
                            <th>To</th>
                            <th>URL</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservations?.map((reservation, idx) => (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{reservation?.houseName}</td>
                                    <td>{reservation?.from}</td>
                                    <td>{reservation?.to}</td>
                                    <td>
                                        <Link
                                            to={`http://localhost:5173${reservation?.url}`}
                                            className="btn btn-sm btn-success"
                                        >
                                            Visit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(reservation?._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Cancel Reservation
                                        </button>
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

export default OwnerBookings;