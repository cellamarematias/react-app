import styles from './header.module.css';
import { BsFillPersonFill } from "react-icons/bs";

const Header = () => {

    return (
        <div className={styles.header}>
        <h1 className={styles.title}>Tasks</h1>
        <img src="" alt="" />
        <div className={styles.userSection}>
            <BsFillPersonFill className={styles.icon} />
            <div className={styles.flex}>
                <span className={styles.user}>Matias Cellamare</span>
                <span className={styles.logout}>Logout</span>
            </div>
        </div>
        </div>
    )}

export default Header;