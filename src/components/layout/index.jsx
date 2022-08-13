// import styles from './layout.module.css';
import Task from 'components/tasks';
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