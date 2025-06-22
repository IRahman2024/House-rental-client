import { NavLink } from "react-router-dom";
import MyForm from "../../Shared/Forms/Form";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const [loader, setLoader] = useState(false);

    const fields = [
        { name: 'userName', label: 'User Name', type: 'text' },
        { name: 'firstName', label: 'First Name', type: 'text' },
        { name: 'lastName', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'text' },
        { name: 'profilePic', label: 'Image', type: 'image' },
    ];

    const dropDown = [
        { name: 'role', label: 'I want to' },
        { value: 'renter', label: 'Rent A home' },
        { value: 'owner', label: 'Host a home' }
    ]

    const formName = 'SignUp Now!';
    const btnName = 'SignUp';
    const reDirection = (
        <p className='mt-2 text-sm font-semibold'>Already have an account? <NavLink
            className='hover:text-blue-400 cursor'
            to='/login'>Login</NavLink></p>
    );

    const handleData = async (data) => {

        const userName = data.userName
        const first = data.firstName
        const last = data.lastName
        const email = data.email
        const pass = data.password
        const role = data.role
        let photo;

        setLoader(true);

        const uploadData = new FormData();

        data.profilePic.forEach(image => uploadData.append('file', image));
        uploadData.append('upload_preset', 'profile_preset');
        uploadData.append('cloud_name', 'dwhcnlq8y');

        const url = import.meta.env.VITE_CLOUDINARY_URL;

        const upload = await fetch(url, {
            method: 'POST',
            body: uploadData
        }).then(res => res.json())
            .then(data => photo = data.url)

        // console.log(upload); // shows the response

        // // console.log(data);

        // console.log(userName, first, last, email, pass, role, photo);
        // console.log(email, pass, photo);

        createUser(email, pass)
            .then(result => {
                console.log('clicked');
                console.log(result);

                const info = {
                    userName: userName,
                    firstName: first,
                    lastName: last,
                    email: email,
                    role: role,
                    profilePic: photo
                }

                axios.post('http://localhost:5000/addUser', info)
                .then(res => console.log(res))

                updateUserProfile(userName, photo)
                    .then(result => console.log(result))
                    .catch(error => console.error('Error updating user profile: ', error));

            })
            .catch(error => console.error('Error creating user profile: ', error));
            setLoader(false);
    }

    return (
        <div>
            {
                loader && <div className="fixed z-20 flex size-full items-center justify-center bg-white opacity-55">
                    <l-line-spinner
                        size="121"
                        stroke="6"
                        speed="1"
                        color="black"
                    ></l-line-spinner>
                </div>
            }
            <MyForm fields={fields} btnName={btnName} handler={handleData} formName={formName} reDirection={reDirection}
                dropDown={dropDown}
            />
        </div>
    );
};

export default SignUp;