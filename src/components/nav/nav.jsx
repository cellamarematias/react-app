import { useSelector } from 'react-redux';
import styles from './nav.module.css';


const Nav = () => {
    const user = useSelector((state) => state.userLogged);
    return (
        <div className={styles.nav}>
            {user.user.authenticated ? (
                <ul className={styles.navList}>
                    {/* <li><a href="/">Home</a></li> */}
                    <li><a href="/tasks">Tareas</a></li>
                    <li><a href="/expenses">Gastos</a></li>
                </ul>
            ) : ( '' )}
        </div>
    )}

export default Nav;