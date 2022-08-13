import styles from "./bill.module.css";

const BillsListItem = ( {data, i, callback}) => {
    return (
        <div className={styles.listContainer}>
            <div className={styles.listItem}>
                <h4>{data ? ([data].map((item) => {
                    return `${new Date(item.date).toISOString().substr(0, 10) } - $${item.amount} - ${item.user.fullName} - ${item.description}`
                } )) : 'Empty List'} </h4>
            </div>
        </div>
    );
}
export default BillsListItem;