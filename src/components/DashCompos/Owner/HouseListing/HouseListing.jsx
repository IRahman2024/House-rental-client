import axios from "axios";
import MyForm from "../../../../Shared/Forms/Form";
import { useCallback, useContext, useEffect, useState } from "react";
import { lineSpinner } from 'ldrs';
import { AuthContext } from "../../../../providers/AuthProvider";

const HouseListing = () => {
    const { user, loader: userLoader } = useContext(AuthContext);
    lineSpinner.register();
    const [loader, setLoader] = useState(false);
    const [house, setHouse] = useState([]);
    const [userData, setUserData] = useState([]);

    // console.log(userData?._id);

    // for fetching user info to store it on house data
    useEffect(() => {
        const fetchUsers = async () => {
            const users = await axios.get(`http://localhost:3000/getId?email=${user?.email}`);
            setUserData(users.data);
        }
        fetchUsers();        
    }, [user?.email]);
    // console.log(house);
    // console.log(house[0]?.houseImages[0]);
    

    const formName = 'Add A House';
    const btnName = 'Submit';

    const fields = [
        { name: 'houseName', label: 'House Name', type: 'text' },
        { name: 'rent', label: 'Rent', type: 'number' },
        { name: 'location', label: 'Location', type: 'text' },
        { name: 'description', label: 'Description', type: 'textBox' },
        { name: 'size', label: 'Total Space(Sq. Ft.)', type: 'number' },
        { name: 'bedrooms', label: 'Bedrooms', type: 'number' },
        { name: 'bathRooms', label: 'Bathrooms', type: 'number' },
        { name: 'toilets', label: 'Washrooms', type: 'number' },
        { name: 'ac', label: 'Air Conditioner', type: 'text' },
        { name: 'swimmingPool', label: 'Swimming Pool', type: 'text' },
        { name: 'windows', label: 'Windows', type: 'number' },
        { name: 'garage', label: 'Garage', type: 'text' },
        { name: 'security', label: 'Security', type: 'text' },
        { name: 'garden', label: 'Garden', type: 'text' },
        { name: 'houseImages', label: 'Images', type: 'image' },
        // { name: 'images', label: 'Image', type: 'image' },
    ];

    const dropDown = [
        { name: 'houseType', label: 'House Type' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'suite', label: 'Suite' },
        { value: 'duplex', label: 'Duplex' }
    ]

    const fetchHouses = useCallback(async () => {
        try {
            const house = await axios.get(`http://localhost:3000/houseOfOwner?email=${user?.email}`);
            console.log(user.email);
            
            // const house = await axios.get('http://localhost:3000/allHouse');
            setHouse(house.data);
        } catch (err) {
            console.error('Error fetching houses:', err);
        }
    }, [user?.email]);

    const handleData = useCallback(async (data) => {

        const waitForUserEmail = async () => {
            while (!user || !user.email) {
                await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500ms
            }
        };

        try {
            await waitForUserEmail();

            data.status = 'pending';
            data.ownerId = userData._id;
            data.email = user.email;
            // data.houseFront = user.email;

            // console.log(data.houseImages.length);
            setLoader(true);

            const imgURLS = [];

            // adding images to cloudinary one by one
            for (let i = 0; i < data.houseImages.length; i++) {
                const uploadData = new FormData();
                uploadData.append('file', data.houseImages[i]);
                uploadData.append('upload_preset', 'House_preset');
                uploadData.append('cloud_name', 'dwhcnlq8y');

                const url = import.meta.env.VITE_CLOUDINARY_URL;

                const upload = await fetch(url, {
                    method: 'POST',
                    body: uploadData
                }).then(res => res.json())
                    .then(data => {
                        return data.url;
                    })

                imgURLS.push(upload);
            }
            data.houseImages = imgURLS;
            data.email = user?.email;
            data.houseFront = imgURLS[0];
            // console.log(userData._id);
            // console.log(imgURLS);
            // console.log(imgURLS[0]);


            // console.log(data);

            axios.post('http://localhost:3000/addHouse', data)
                .then(res => {
                    if (res.data.acknowledged){
                        alert('House Added Successfully!');
                        fetchHouses();
                    }
                    else
                        alert('Failed to add house');
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert('An error occurred while adding the house');
                });
            setLoader(false);
        }
        catch (error) {
            console.error('Error in handleData:', error);
            alert('An error occurred. Please try again.'); // Optional: Show an alert to the user
            setLoader(false);
        }
    }, [fetchHouses, user, userData._id]);

    useEffect(() => {
        axios.get(`http://localhost:3000/houseOfOwner?email=${user?.email}`)
            .then(res => {
                setHouse(res.data);
            })
        // console.log(house);
    }, [fetchHouses, user?.email])

    // console.log(house);


    return (
        <div className="md:m-4 w-full">
            {
                (loader || userLoader) && <div className="fixed z-20 flex h-full w-3/4 items-center justify-center bg-white opacity-55">
                    <l-line-spinner
                        size="121"
                        stroke="6"
                        speed="1"
                        color="black"
                    ></l-line-spinner>
                </div>
            }
            <div className="z-10 flex gap-x-2">
                <div className="w-1/2">
                    <MyForm fields={fields} btnName={btnName} handler={handleData} formName={formName} dropDown={dropDown}
                    />
                </div>
                <div className="w-1/2">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>House Name</th>
                                <th>Rent</th>
                                <th>Address</th>
                                <th>Type</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        {
                            house.map((house, idx) =>
                                <tbody key={idx}>
                                    <tr className="bg-base-200">
                                        <th>{idx + 1}</th>
                                        <td>{house?.houseName}</td>
                                        <td>{house?.rent}</td>
                                        <td>{house?.location}</td>
                                        <td>{house?.houseType}</td>
                                        <td>{ house?.status == 'pending' ? <div className="badge badge-warning">Pending</div> : <div className="badge badge-success">Approved</div>
                                            
                                            }</td>
                                    </tr>
                                </tbody>
                            )
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HouseListing;