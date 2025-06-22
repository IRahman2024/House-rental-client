import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const OwnerReview = () => {
    const { user } = useContext(AuthContext);
    const [reviews, setReviews] = useState();
    console.log(reviews);

    useEffect(() => {
        axios.get(`http://localhost:5000/reviews-by-email?email=${user?.email}`)
            .then(res => setReviews(res.data))
    }, [user])

    return (
        <div className="m-6">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>HouseName</th>
                            <th>User Name</th>
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
                                    <td>{review?.firstName} {review?.lastName}</td>
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

export default OwnerReview;