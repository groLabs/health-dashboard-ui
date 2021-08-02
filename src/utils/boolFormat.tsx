import styles from '../components/dashboard/Dashboard.module.css';

const boolFormat = (value: boolean) => {
    return (value)
        ? <span className={styles.green}>true</span>
        : <span className={styles.red}>false</span>;
}

export default boolFormat;
