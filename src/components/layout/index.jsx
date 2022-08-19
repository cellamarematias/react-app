// import styles from './layout.module.css';
import Header from '../header/Header';
import Nav from '../nav/nav';

const Layout = ({ children }) => {

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
          // eslint-disable-next-line no-unused-vars
          pathName = '';
          break;
      }

    return (
        <div>
        <Header></Header>
        <Nav></Nav>
        {children}
        </div>
    )}

export default Layout;