import styles from './card.module.css';


const Card = ( {data, i, callback}) => {

    return (
        <div className={styles.card}>
            <h5>{data ? ([data].map((task) => {
        return `#${i} ${task.title}`;
    } )) : 'New Task'} </h5>
            <div className={styles.cardContent}>
                <p>{data ? ([data].map((task) => {
        return task.description;
    } )) : ''}</p>
                <div>
                    <button className={styles.carButton} onClick={callback}>...</button>
                </div>
            </div>
        </div>
    )}

export default Card;