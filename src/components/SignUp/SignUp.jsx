import { NavLink } from "react-router-dom";
import MyForm from "../../Shared/Forms/Form";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);

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
        { value: 'Renter', label: 'Rent A home' },
        { value: 'Owner', label: 'Host a home' }
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

        // const uploadData = new FormData();

        // data.profilePic.forEach(image => uploadData.append('file', image));
        // uploadData.append('upload_preset', 'profile_preset');
        // uploadData.append('cloud_name', 'dwhcnlq8y');

        // const url = import.meta.env.VITE_CLOUDINARY_URL;

        // const upload = await fetch(url, {
        //     method: 'POST',
        //     body: uploadData
        // }).then(res => res.json())
        //     .then(data => photo = data.url)

        // console.log(upload); // shows the response

        // // console.log(data);

        // console.log(userName, first, last, email, pass, role, photo);
        console.log(email, pass);

        createUser(email, pass)
            .then(result => {
                console.log('clicked');
                console.log(result);


                updateUserProfile(userName, photo)
                    .then(result => console.log(result))
                    .catch(error => console.error('Error updating user profile: ', error));

            })
            .catch(error => console.error('Error creating user profile: ', error));

    }

    return (
        <div>
            <MyForm fields={fields} btnName={btnName} handler={handleData} formName={formName} reDirection={reDirection}
                dropDown={dropDown}
            />
        </div>
    );
};

export default SignUp;