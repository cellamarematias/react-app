import React from "react";
import styles from './login.module.css';
import { updateProfile, getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import firebaseApp from "helper";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useDispatch } from 'react-redux';
import { createUser } from "redux/auth/thunks";

const Signup = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        fullName: Joi.string().min(3).required(),
        password: Joi.string().required().min(8)
        });
    const {
        register,
        handleSubmit,
        formState: { errors }
        } = useForm({
        mode: 'onSubmit',
        resolver: joiResolver(schema)
        });


    const registerWithEmail = (data) => {
        let email = data.email;
        let password = data.password;
        let fullName = data.fullName;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            dispatch(createUser(user.uid, fullName, email));
        })
        .then (() => {
            updateProfile(auth.currentUser, {
                displayName: fullName
            }).then(() => {
                navigate('/login');
            }).catch((error) => {
                console.log(error);
            }
            );
        }).catch((error) => {
            const errorCode = error.code;
            if(errorCode === 'auth/email-already-in-use') {
                alert('Email already in use');
            }
        });
    }

return (
    <div className={styles.loginContainer}>
    <h1>SignUp!</h1>
    <form className={styles.loginForm} onSubmit={handleSubmit(registerWithEmail)}>
        <input type="text" name="fullName" id="fullName" placeholder="fullName" {...register("fullName")} />
        {errors.fullName && <p className={styles.errorLogin}>This field is required</p>}
        <input type="text" name="email" id="email" placeholder="email" {...register("email")} />
        {errors.email && <p className={styles.errorLogin}>This field is required</p>}
        <input type="password" name="password" id="password" placeholder="password" {...register("password")} />
        {errors.password && <p className={styles.errorLogin}>This field is required</p>}
        <button type="submit" className={styles.loginButton}>Register</button>
    </form>
    </div>
);
}

export default Signup;