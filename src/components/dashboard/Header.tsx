import React from "react";
import styles from './Header.module.css';

// TODO: fixed header, incl. refresh button
const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}> Health Monitoring Dashboard MVP </div>
            <div className={styles.container_horizontal}>
                <div className={styles.subheader}> Last Date: </div>
                <div className={styles.subheader}> Last Timestamp: </div>
                <div className={styles.subheader}> Network: </div>
                <div className={styles.subheader}> Refresh </div>
            </div>
        </div>
    )
}

export default Header;
