// import styles from './layout.module.css';
import Header from '../header/Header';
import Nav from '../nav/nav';

const Layout = ({ children }) => {

    return (
        <div>
        <Header></Header>
        <Nav></Nav>
        {children}
        </div>
    )}

export default Layout;