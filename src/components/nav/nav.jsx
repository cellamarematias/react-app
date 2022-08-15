import styles from './nav.module.css';

const Nav = () => {

    return (
        <div className={styles.nav}>
            <ul className={styles.navList}>
                {/* <li><a href="/">Home</a></li> */}
                <li><a href="/tasks">Tasks</a></li>
                <li><a href="/expenses">Expenses</a></li>
            </ul>
        </div>
    )}

export default Nav;