import React from 'react';
import moment from 'moment';
import styles from './Header.module.css';
import getNetworkId from '../../utils/getNetworkId';
import { useTypedSelector } from '../../store/reducers/reducer';

interface Props {
    onRefreshClick(): void,
}
const Header = (props: Props) => {
    const groStats = useTypedSelector(state => state.groStats.config);
    const priceCheck = useTypedSelector(state => state.priceCheck.global);
    const loadDate = useTypedSelector(state => state.groStats.loadDate);

    const [timeAgoLoadDate, setTimeAgoLoadDate] = React.useState('');
    const [timeAgoDateDate, setTimeAgoDateDate] = React.useState('');
    const [timeAgoDateDatePriceCheck, setTimeAgoDateDatePriceCheck] = React.useState('');

    const isDataNotUpdated = (last: moment.Moment) => {
        try {
            const now = moment.utc(loadDate);
            const duration = moment.duration(now.diff(last));
            const diff = duration.asMinutes();
            return (diff >= 30) ? true : false;
        } catch(err) {
            console.log(`Error at Header->isDataNotUpdated(): ${err}`);
            return false;
        }

    }

    React.useEffect(() => {
        const intervalID = setInterval(() => {
            setTimeAgoLoadDate(moment.utc(loadDate).fromNow());
            if (groStats)
                setTimeAgoDateDate(moment.utc(groStats.current_date).fromNow());
            if (priceCheck)
                setTimeAgoDateDatePriceCheck(moment.utc(priceCheck.block_date).fromNow());
        }, 1000);
        return () => clearInterval(intervalID);
    }, [groStats, loadDate, priceCheck]);

    return (
        <div className={styles.container}>
            <div className={styles.header}> Health Monitoring Dashboard MVP </div>
            <div className={styles.container_horizontal}>
                <div className={styles.subheader}>
                    <div> Page refresh </div>
                    <div>
                        {(loadDate)
                            ? <span> UTC:
                                <span> {moment.utc(loadDate).format('DD/MM/YYYY HH:mm:ss')}</span>
                                <span className={styles.timeAgo}> ({timeAgoLoadDate}) </span>
                                <div>
                                    Unix: {moment.utc(loadDate).unix()}
                                </div>
                            </span>
                            : ''
                        }
                    </div>
                </div>
                <div className={styles.subheader}>
                    <div> Gro Stats </div>
                    <div>
                        {(groStats && groStats.current_date)
                            ? <span> UTC:
                                <span className={(isDataNotUpdated(groStats.current_date) ? styles.red : '')}> {moment.utc(groStats.current_date).format('DD/MM/YYYY HH:mm:ss')} </span>
                                <span className={styles.timeAgo}> ({timeAgoDateDate}) </span>
                                <div>
                                    Unix: {groStats.current_timestamp}
                                </div>
                            </span>
                            : ''
                        }
                    </div>
                </div>
                <div className={styles.subheader}>
                    <div> Price Check </div>
                    <div>
                        {(priceCheck && priceCheck.block_date)
                            ? <span> UTC:
                                <span> {moment.utc(priceCheck.block_date).format('DD/MM/YYYY HH:mm:ss')}</span>
                                <span className={styles.timeAgo}> ({timeAgoDateDatePriceCheck}) </span>
                                <div>
                                    Unix: {moment.utc(priceCheck.block_date).unix()}
                                </div>
                            </span>
                            : ''
                        }
                    </div>
                </div>
                <div className={styles.subheader}>
                    Network: {getNetworkId(groStats.network_id)}
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
