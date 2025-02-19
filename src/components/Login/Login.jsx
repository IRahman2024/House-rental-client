import MyForm from '../../Shared/Forms/Form';
import { Navigate, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';

const Login = () => {

    const { googleSignIn, user, signInUser } = useContext(AuthContext);
    // console.log(user);

    // const [user, setUser] = useState(null);

    const fields = [
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
        // { name: 'images', label: 'Image', type: 'image' },
    ];

    const formName = 'Login Now!';
    const btnName = 'Login';
    const reDirection = (
        <>
            <p className='mt-2 text-sm font-semibold'>New Here? <NavLink
                className='hover:text-blue-400 cursor'
                to='/signup'>SignUp</NavLink></p>
        </>
    )

    // const googleProvider = new GoogleAuthProvider();
    const handleGoogleAuth = () => {
        googleSignIn()
            .then(result => {
                // console.log(result.user);

            })
        // console.log(user);

        // signInWithPopup(auth, googleProvider)
        //     .then(result => {
        //         const loggedInUser = result.user;
        //         // console.log(loggedInUser);
        //         // alert('google login successfull');
        //         // setUser(loggedInUser);
        //         // toast("Login successful!");
        //         // setTimeout(() => {
        //         //     // setLogin(true);
        //         //     Navigate(location?.state ? location.state : '/');
        //         // }, 1500)
        //     })
        //     .catch(error => {
        //         console.log('error: ', error.message)
        //         // toast.error('Wrong credentials try again');
        //     })
    }

    const signInMethod = (
        <div className="flex gap-2">
            <h1 className="text-base">Login with:</h1>
            <button onClick={handleGoogleAuth}><img className="w-5" src="./google.svg" alt="" /></button>
            {/* <button onClick={handleGitHubAuth}><img className="w-5" src="./github.svg" alt="" /></button> */}
        </div>
    )

    const handleData = async (data) => {
        // console.log(data);

        const email = data.email;
        const pass = data.password;

        console.log(email, pass);
        signInUser(email, pass)
            .then(res => console.log(res))

        // const userInfo = { email, pass };
        // axios.post('http://localhost:3000/user', userInfo)
        // .then(res => {
        //     console.log(res.data);
        // })        
    }

    return (
        <div>
            <MyForm fields={fields} btnName={btnName} handler={handleData} formName={formName} reDirection={reDirection}
                signInMethod={signInMethod}
            />
        </div>
    );
};

export default Login;