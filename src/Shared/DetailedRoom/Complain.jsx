import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';

const Complain = ({ id: houseID, url, houseName, owner }) => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState();

    useEffect(() => {
        if (!user?.email) return;
        console.log('hit');

        axios.get(`http://localhost:5000/getId?email=${user.email}`)
            .then(res => setUserData(res.data))
        // fetchReviews();
    }, [user?.email]);

    const handleComplain = () => {
        if (!userData) {
            console.error("User data is not available yet!");
            return;
        }

        const complain = document.getElementById('complain').value;
        // console.log(userData);
        const firstName = userData?.firstName;
        const lastName = userData?.lastName;
        const userId = userData?._id;
        const houseId = houseID;
        const image = userData?.profilePic;
        const userEmail = user?.email;
        const ownerEmail = owner?.email;
        console.log(firstName, lastName, userId, houseId, image, complain, houseName, url, ownerEmail, userEmail);


        axios.post('http://localhost:5000/addComplain', { complain, firstName, lastName, image, userId, houseId, houseName, url })
            .then(res => {
                alert('Complain Submitted Successfully!');
                document.querySelector('.textarea').value = '';
                // fetchReviews();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="grid grid-cols-1 gap-4">
            <div>
            </div>
            <textarea id='complain' type="text" placeholder="Write your feedback or complain..." className="textarea textarea-info"></textarea>
            <button
                onClick={() => handleComplain()}
                className="btn btn-info btn-xs">Submit</button>
        </div>
    );
};

export default Complain;