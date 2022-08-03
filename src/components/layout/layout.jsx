import styles from './layout.module.css';
import Header from '../header/Header';
import Nav from '../nav/nav';
import Task from '../tasks/tasks';

const Layout = () => {

    return (
        <div>
        <Header></Header>
        <Nav></Nav>
        <Task></Task>
        </div>
    )}

export default Layout;