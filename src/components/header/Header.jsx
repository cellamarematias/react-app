import styles from './header.module.css';
import { BsFillPersonFill } from "react-icons/bs";
import firebaseApp from "helper";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from "redux/auth/thunks";

const Header = () => {
  const user = useSelector((state) => state.userLogged);
  console.log(user.user);
  let navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      // sessionStorage.removeItem("token");
      // sessionStorage.removeItem("displayName");
      dispatch(setAuth(null, null));
      navigate("/login");
    }).catch((error) => {
      // An error happened.
      console.log("signed out");
    });
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
        case '/bills':
          pathName = 'Bills';
          break;
        default:
          pathName = '';
          break;
      }

    return (
        <div className={styles.header}>
        <h1 className={styles.title}>{pathName}</h1>
        <img src="" alt="" />
        <div className={styles.userSection}>
            <BsFillPersonFill className={styles.icon} />
            <div className={styles.flex}>
                <span className={styles.user}>{user.user.displayName ? user.user.displayName : 'Anonnymous'}</span>
                <span className={styles.logout} onClick={user.user.authenticated ? '' : logout}>{user.user.authenticated ? 'Logout' : 'Login'}</span>
            </div>
        </div>
        </div>
    )}

export default Header;