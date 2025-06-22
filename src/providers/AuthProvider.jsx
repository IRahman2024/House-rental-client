import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [role, setRole] = useState();
    const [loader, setLoader] = useState(true);
    // console.log(user);

    const checkRole = async (email) => {
        const data = await axios.get(`http://localhost:5000/getRole?email=${email}`);
        // console.log(data.data);
        setRole(data.data);
    }


    const googleProvider = new GoogleAuthProvider();

    const signInUser = (email, pass) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, pass)
            .then(()=>{
                checkRole(email);
                console.log(role);
            })
            .catch((error) => {
                console.error("Error signing in:", error.message);
                if(error.message === 'Firebase: Error (auth/invalid-credential).'){
                    alert('Invalid Credentials');
                    setLoader(false);
                }
                throw error; // Re-throw the error for the caller to handle
            });
    }
    const createUser = (email, pass) => {
        setLoader(true);
        console.log(email, pass);

        return createUserWithEmailAndPassword(auth, email, pass)
            .then((res)=>{
                checkRole(email);
                return res;
            })
            .catch((error) => {
                console.error("Error Creating User:", error.message);
                throw error; // Re-throw the error for the caller to handle
            });
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
        .then((res)=>{
            checkRole(res.user.email);
            return res;
        })
            .catch((error) => {
                console.error("Error signing in:", error.message);
                throw error; // Re-throw the error for the caller to handle
            });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if(currentUser?.email)
                checkRole(currentUser.email);
            setLoader(false);
        })

        return () => {
            unSubscribe();
            setLoader(false);
        }
    }, [user?.email]);

    const authInfo = {
        user,
        loader,
        role,
        createUser,
        updateUserProfile,
        signInUser,
        logOut,
        googleSignIn,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;