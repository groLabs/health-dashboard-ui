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
    const loadDate = useTypedSelector(state => state.groStats.loadDate);

    const [timeAgoLoadDate, setTimeAgoLoadDate] = React.useState('');
    const [timeAgoDateDate, setTimeAgoDateDate] = React.useState('');

    React.useEffect(() => {
        const intervalID = setInterval(() => {
            setTimeAgoDateDate(moment.utc(config.current_date).fromNow());
            setTimeAgoLoadDate(moment.utc(loadDate).fromNow());
        }, 1000);
        return () => clearInterval(intervalID);
    }, [config.current_date, loadDate]);

    return (
        <div className={styles.container}>
            <div className={styles.header}> Health Monitoring Dashboard MVP </div>
            <div className={styles.container_horizontal}>
                <div className={styles.subheader}>
                    Load Date: {(loadDate)
                        ? <span> 
                            <span> {moment.utc(loadDate).format('DD/MM/YYYY HH:mm:ss')} </span>
                            <span className={styles.timeAgo}> ({timeAgoLoadDate}) </span>
                        </span>
                        : ''
                        }
                </div>
                <div className={styles.subheader}>
                    Data Date: {(config.current_date)
                        ? <span> 
                            <span> {moment.utc(config.current_date).format('DD/MM/YYYY HH:mm:ss')} </span>
                            <span className={styles.timeAgo}> ({timeAgoDateDate}) </span>
                        </span>
                        : ''
                        }
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
