import styles from './card.module.css';

const Card = () => {

    return (
        <div className={styles.card}>
            <h5>Title</h5>
            <div className={styles.cardContent}>
                <spam>Lorem ipsum dolor sit amet consectetur adipisicing elit...</spam>
                <div>
                    <button className={styles.carButton}>...</button>
                </div>
            </div>
        </div>
    )}

export default Card;