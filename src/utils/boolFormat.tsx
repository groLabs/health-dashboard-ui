import styles from '../components/dashboard/Dashboard.module.css';

const boolFormat = (value: boolean) => {
    if (value) {
        return (value)
        ? <span className={styles.green}>true</span>
        : <span className={styles.red}>false</span>;
    } else {
        return '';
    }
}

export default boolFormat;
