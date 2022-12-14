import styles from './header.module.css';
// eslint-disable-next-line no-unused-vars
import firebaseApp from "helper";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from "redux/auth/thunks";

const Header = () => {
  const user = useSelector((state) => state.userLogged);
  let navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth).then(() => {
      navigate("/login");

      dispatch(setAuth(null, null, null, null));
      sessionStorage.clear();
    }).catch((error) => {
      console.log(error);
    });
  }

  const redirectLogin = () => {
    navigate("/login");
  }

onAuthStateChanged(auth, (user) => {
  if (user) {
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
        pathName = 'Tareas';
        break;
      case '/expenses':
        pathName = 'Gastos';
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
        <div className={styles.flexUser}>
            <span className={styles.user}>{user.user.displayName ? user.user.displayName : 'Anonnymous'}</span>
            <button className={styles.logout} onClick={user.user.email ? logout : redirectLogin }>{user.user.email ? 'Cerrar sesión' : 'Login' }</button>
        </div>
    </div>
    </div>
)}

export default Header;