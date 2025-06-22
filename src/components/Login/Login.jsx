import MyForm from '../../Shared/Forms/Form';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { lineSpinner } from 'ldrs';

const Login = () => {
    const [loader, setLoader] = useState(false);
    const [userList, setUserList] = useState([]);
    lineSpinner.register();
    
    const location = useLocation();
    const navigate = useNavigate();


    const { googleSignIn, user, signInUser, loader: userLoader } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:5000/allUsersEmail')
            .then(res => {
                // console.log(res.data);
                setUserList(res.data);
            })
    })

    // console.log(userList);

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
    // console.log(location);
    

    const handleGoogleAuth = () => {
        setLoader(true);
        googleSignIn()
            .then(result => {
                // console.log(result.user);
                
                if(!userList.includes(result.user.email)){
                    const data = {
                        userName: result.user.displayName,
                        email: result.user.email,
                        profilePic: (result.user?.photoURL || null),
                    }
                    axios.post('http://localhost:5000/addUser', data)
                    .then(res => {
                        // console.log(res);
                        setLoader(false);
                        navigate(location?.state ? location.state : '/');
                    })
                }
                setLoader(false);
                console.log(location?.state);
                
                navigate(location?.state ? location.state : '/');
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

        // console.log(email, pass);
        signInUser(email, pass)
            .then(res => console.log(res))
            .then(() => navigate(location?.state ? location.state : '/'))

        // const userInfo = { email, pass };
        // axios.post('http://localhost:5000/user', userInfo)
        // .then(res => {
        //     console.log(res.data);
        // })        
    }

    return (
        <div className='size-full'>
            <div>
                {
                    (loader || userLoader) && <div className="flex size-full items-center justify-center bg-blue-300 opacity-65 fixed z-20">
                        <l-line-spinner
                            size="181"
                            stroke="10"
                            speed="1"
                            color="black"
                        ></l-line-spinner>
                    </div>
                }
            </div>
            <div className='z-10'>
                <MyForm fields={fields} btnName={btnName} handler={handleData} formName={formName} reDirection={reDirection}
                    signInMethod={signInMethod}
                />
            </div>
        </div>
    );
};

export default Login;