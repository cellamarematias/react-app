import styles from './header.module.css';
import { BsFillPersonFill } from "react-icons/bs";
import firebaseApp from "helper";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from "redux/auth/thunks";
import { useEffect } from 'react';

const Header = () => {
  const user = useSelector((state) => state.userLogged);
  let navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth).then(() => {
      console.log("Signed out");
      navigate("/login");
      // Sign-out successful.
      // sessionStorage.removeItem("token");
      // sessionStorage.removeItem("displayName");
      dispatch(setAuth(null, null, null, null));
      sessionStorage.clear();
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  const redirectLogin = () => {
    console.log("Redirect to login");
    navigate("/login");
  }

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("signed in");
    sessionStorage.setItem("displayName", auth.currentUser.displayName);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

    const path = window.location.pathname;
    let pathName = '';
    switch (path) {
        case '/':
          pathName = 'Home';
          break;
        case '/tasks':
          pathName = 'Tasks';
          break;
        case '/expenses':
          pathName = 'Expenses';
          break;
        default:
          pathName = '';
          break;
      }

    return (
        <div className={styles.header}>
        <h1 className={styles.pathName}>{pathName}</h1>
        <img src="" alt="" />
        <div className={styles.userSection}>
            <BsFillPersonFill className={styles.icon} />
            <div className={styles.flexUser}>
                <span className={styles.user}>{user.user.displayName ? user.user.displayName : 'Anonnymous'}</span>
                <button className={styles.logout} onClick={user.user.email ? logout : redirectLogin }>{user.user.email ? 'Logout' : 'Login' }</button>
            </div>
        </div>
        </div>
    )}

export default Header;