import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [loader, setLoader] = useState(true);
    // console.log(user);


    const googleProvider = new GoogleAuthProvider();

    const signInUser = (email, pass) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, pass)
            .catch((error) => {
                console.error("Error signing in:", error.message);
                throw error; // Re-throw the error for the caller to handle
            });
    }
    const createUser = (email, pass) => {
        setLoader(true);
        console.log(email, pass);

        return createUserWithEmailAndPassword(auth, email, pass)
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
            .catch((error) => {
                console.error("Error signing in:", error.message);
                throw error; // Re-throw the error for the caller to handle
            });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
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