import React from "react";
import moment from 'moment';
import styles from './Header.module.css';
import getNetworkId from '../../utils/getNetworkId';
import { useTypedSelector } from '../../store/reducers/reducer';

interface Props {
    onRefreshClick(): void,
}
const Header = (props: Props) => {
    const config = useTypedSelector(state => state.groStats.config);

    return (
        <div className={styles.container}>
            <div className={styles.header}> Health Monitoring Dashboard MVP </div>
            <div className={styles.container_horizontal}>
                <div className={styles.subheader}>
                    Last Date: {(config.current_date) ? moment.utc(config.current_date).format('DD/MM/YYYY HH:mm:ss') : ''}
                </div>
                <div className={styles.subheader}>
                    Last Timestamp: {config.current_timestamp}
                </div>
                <div className={styles.subheader}>
                    Network: {getNetworkId(config.network_id)}
                </div>
                <div className={styles.subheader}>
                    <button
                        onClick={() => props.onRefreshClick()}
                    > Refresh
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;
