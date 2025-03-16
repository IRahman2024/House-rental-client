import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const MyReviews = () => {
    const [userData, setUserData] = useState();
    const [reviews, setReviews] = useState();

    const { user } = useContext(AuthContext);
    // console.log(userData?._id);

    useEffect(() => {
        axios.get(`http://localhost:3000/getId?email=${user?.email}`)
            .then(res => setUserData(res.data))
            .then(() => {
                axios.get(`http://localhost:3000/userReviews/${userData?._id}`)
                    .then(res => setReviews(res.data));
                axios.get
            })
    }, [user?.email, userData?._id]);

    // console.log(reviews);

    if(reviews?.length === 0){
        return <div className="m-5 text-3xl font-bold">No Review Found.</div>
    }


    return (
        <div className="m-6">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>HouseName</th>
                            <th>Review</th>
                            <th>Rating</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reviews?.map((review, idx) => (
                                <tr className="w-full" key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{review?.houseName}</td>
                                    <td className="w-1/2">{review?.text}</td>
                                    <td><div className="flex gap-x-1">
                                        {(review?.rating + 1) > 0 && (
                                            <> {/* Use a fragment instead of a div, or nothing at all*/}
                                                {Array.from({ length: review.rating }, (_, index) => (
                                                    <img
                                                        key={index}
                                                        className="size-6"
                                                        src="/star icon.png"
                                                        alt="star"
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </div></td>
                                    <td className="flex items-center">
                                        <Link to={`http://localhost:5173${review?.URL}`} className="btn btn-sm btn-success">Visit</Link>
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

export default MyReviews;