import styles from "./bill.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import Moment from 'moment';


const BillsListItem = ( {data, i, func}) => {
    return (
        <div className={styles.listContainer}>
                {data ? ([data].map((item) => {
                    return (
                        <div key={item._id} className={styles.listItem}>
                            <span className={styles.odd} >{item.userId.fullName}</span>|
                            <span className={styles.even} >{Moment(item.date).format('DD-MM')}</span>|
                            <span className={styles.odd} >${item.amount}</span>|
                            <span className={styles.even} >{item.name}</span>
                            <BsFillPencilFill onClick={() => func(item)} className={styles.deleteIcon} />
                        </div>
                    )
                } )) : 'Empty List'}
            </div>
    );
}
export default BillsListItem;



// return `${item.userId.fullName} - ${new Date(item.date).toISOString().substr(0, 10) } - $${item.amount} - ${item.name} -`,
// <BsTrash onClick={() => handeldelete(item)} />