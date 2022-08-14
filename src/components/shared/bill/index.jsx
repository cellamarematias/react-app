import styles from "./bill.module.css";
import { BsTrash } from "react-icons/bs";

const BillsListItem = ( {data, i, func}) => {
    return (
        <div className={styles.listContainer}>
            <div className={styles.listItem}>
                {data ? ([data].map((item) => {
                    return (
                        <div key={item._id} className={styles.listItem}>
                            {item.userId.fullName} - {new Date(item.date).toISOString().substr(0, 10) } - ${item.amount} - {item.name}
                            <BsTrash onClick={() => func(item)} className={styles.deleteIcon} />
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