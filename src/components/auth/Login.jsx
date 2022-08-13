import React from "react";
import styles from './login.module.css';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import firebaseApp from "helper";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useDispatch } from 'react-redux';
import { setAuth } from "redux/auth/thunks";
import { getUser, createUser } from "redux/auth/thunks";

const Login = () => {
    const dispatch = useDispatch();
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().required().min(8)
        });
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
        } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(schema)
        });


    const loginWithEmail = (data) => {
        const auth = getAuth();
        let email = data.email;
        let password = data.password;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const displayName = user.displayName;
            const email = user.email;
            const token = user.refreshToken;
            const uid = user.uid;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('displayName', displayName);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('uid', user.uid);
            // console.log(token);
            dispatch(setAuth(displayName, email, token, uid));
            navigate('/tasks');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode === 'auth/wrong-password') {
                alert('Wrong email or password');
            }
            if (errorCode === 'auth/user-not-found') {
                alert('User not found');
            }
        });
    }

    const loginWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const displayName = user.displayName;
            const email = user.email;
            const uid = user.uid;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('displayName', displayName);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('uid', user.uid);
            dispatch(setAuth(displayName, email, token, uid));
            navigate('/tasks');
        })
        .then(() => {
          const uid = auth.currentUser.uid;
          const email = auth.currentUser.email;
          const displayName = auth.currentUser.displayName;
          dispatch(getUser(uid, displayName, email));
        })
        .then(() => {
            navigate('/tasks');
        })
        .catch((error) => {
          // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
          // The email of the user's account used.
            const email = error.customData.email;
          // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }

return (
    <div className={styles.loginContainer}>
    <h1>Login</h1>
    <form className={styles.loginForm} onSubmit={handleSubmit(loginWithEmail)}>
        <input type="text" name="email" id="email" placeholder="email" {...register("email")} />
        {errors.email && <p className={styles.errorLogin}>This field is required</p>}
        <input type="password" name="password" id="password" placeholder="password" {...register("password")} />
        {errors.password && <p className={styles.errorLogin}>This field is required</p>}
        <button type="submit" className={styles.loginButton}>Login</button>
    </form>
    <button type="submit" className={styles.loginButton} onClick={loginWithGoogle}>Google</button>

    <h5>Signup</h5>
    </div>
);
}

export default Login;