import styles from './tasks.module.css';
import Card from '../shared/tasks-cards/card'

const Task = () => {

    return (
        <div>
            <button className={styles.addButton}>add</button>
            <div className={styles.tasksContainer}>
                <div className={styles.column}>
                    <div className={styles.taskCard1}>
                        <h4>pending</h4>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>
                        <Card></Card>

                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.taskCard2}>
                        <h4>in progress</h4>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.taskCard3}>
                        <h4>in review</h4>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.taskCard4}>
                        <h4>done</h4>
                    </div>
                </div>
            </div>
        </div>
    )}

export default Task;