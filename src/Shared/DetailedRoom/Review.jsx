import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import './styles.css'

const Review = ({ id: houseID, url, houseName }) => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [reviews, setReviews] = useState();
    const [rating, setRating] = useState(2);
    const ratingValues = [1, 2, 3, 4, 5];

    const fetchReviews = useCallback(() => {
        // console.log('hit');

        axios.get(`http://localhost:3000/reviews/${houseID}`)
            .then(res => setReviews(res.data))
    }, [houseID])

    useEffect(() => {
        if (!user?.email) return;
        console.log('hit');

        axios.get(`http://localhost:3000/getId?email=${user.email}`)
            .then(res => setUserData(res.data))
        fetchReviews();
    }, [user?.email]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    // console.log(houseName);
    // console.log(url);

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };


    const handleReview = useCallback(() => {

        if (!userData) {
            console.error("User data is not available yet!");
            return;
        }

        const text = document.querySelector('.textarea').value;
        // console.log(userData);
        const firstName = userData?.firstName;
        const lastName = userData?.lastName;
        const userId = userData?._id;
        const houseId = houseID;
        const image = userData?.profilePic;
        console.log(firstName, lastName, userId, houseId, image, rating, text, houseName, url);


        axios.post('http://localhost:3000/review', { text, firstName, lastName, image, userId, houseId, rating })
            .then(res => {
                // console.log(res.data);
                document.querySelector('.textarea').value = '';
                fetchReviews();
            })
            .catch(err => console.log(err));
    }, [userData, houseID, rating, fetchReviews]);

    return (
        <div className="gap-4 mb-4">
            {userData &&
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <div className="rating">
                            {ratingValues.map((value) => (
                                <input
                                    key={value}
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    aria-label={`${value} star`}
                                    value={value}
                                    checked={rating === value}
                                    onChange={handleRatingChange}
                                />
                            ))}
                        </div>
                        <p>Selected Rating: {rating} stars</p>
                    </div>
                    <textarea type="text" placeholder="Write a review.." className="textarea textarea-info"></textarea>
                    <button
                        onClick={() => handleReview()}
                        className="btn btn-info btn-xs">Submit</button>
                </div>}
            {/* reviews */}
            <div>
                <h1 className="text-2xl font-bold">Reviews</h1>
                <div className="grid md:grid-cols-2 gap-3">
                    {reviews?.map((review, idx) => (
                        <div
                            key={idx}
                            className="card card-border bg-base-100 w-80 border-2 border-gray-300">
                            <div className="card-body">
                                <div>
                                    <div className="avatar">
                                        <div className="w-24 rounded-xl">
                                            <img src={review?.image} />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="card-title">{review?.firstName} {review?.lastName}</h2>
                                    {/* rating */}
                                    <div className="flex gap-x-1">
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
                                    </div>
                                    <p>{review?.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Review;