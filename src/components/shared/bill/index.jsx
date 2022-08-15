import styles from "./bill.module.css";
import { BsFillPencilFill } from "react-icons/bs";
import Moment from 'moment';


const BillsListItem = ( {data, i, func}) => {
    return (
        <div className={styles.listContainer}>
            <div className={styles.listItem}>
                {data ? ([data].map((item) => {
                    return (
                        <div key={item._id} className={styles.listItem}>
                            <span className={styles.odd} >{item.userId.fullName}</span>| {Moment(item.date).format('DD-MM-YYYY')}|
                            <span className={styles.odd} >${item.amount}</span> |{item.name}|
                            <BsFillPencilFill onClick={() => func(item)} className={styles.deleteIcon} />
                        </div>
                    )

                } )) : 'Empty List'}
            </div>
        </div>
    );
}
export default BillsListItem;



// return `${item.userId.fullName} - ${new Date(item.date).toISOString().substr(0, 10) } - $${item.amount} - ${item.name} -`,
// <BsTrash onClick={() => handeldelete(item)} />