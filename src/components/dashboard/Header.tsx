import React from "react";
import moment from 'moment';
import styles from './Header.module.css';
import { useTypedSelector } from '../../store/reducers/reducer';

// TODO: fixed header, incl. refresh button
const Header = () => {
    const config = useTypedSelector(state => state.groStats.config);

    return (
        <div className={styles.container}>
            <div className={styles.header}> Health Monitoring Dashboard MVP </div>
            <div className={styles.container_horizontal}>
                <div className={styles.subheader}> Last Date: {(config) ? moment.utc(config.current_date).format('DD/MM/YYYY HH:mm:ss') : ''}</div>
                <div className={styles.subheader}> Last Timestamp: {config.current_timestamp}</div>
                <div className={styles.subheader}> Network: {config.network_id}</div>
                <div className={styles.subheader}> Refresh </div>
            </div>
        </div>
    )
}

export default Header;
