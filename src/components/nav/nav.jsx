import styles from './nav.module.css';

const Nav = () => {

    return (
        <div className={styles.nav}>
            <ul className={styles.navList}>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </div>
    )}

export default Nav;