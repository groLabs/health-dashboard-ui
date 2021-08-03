import React from "react";
import axios from "axios";
import moment from "moment";
import Header from "./Header";
import Tvl from "./Tvl";
import Apy from "./Apy";
import System from "./System";
import Vaults from "./Vaults";
import Strategies from "./Strategies";
import PriceCheck from './PriceCheck';
import Reserves from "./Reserves";
import ExposureStables from "./ExposureStables";
import ExposureProtocols from "./ExposureProtocols";
import getNetworkId from '../../utils/getNetworkId';
import { APP_STATS_BOT_URL, APP_STATS_BOT_PORT, APP_NETWORK_ID } from '../../constants';
import { useDispatch } from 'react-redux';
import { setAllGroStats, removeAllGroStats } from '../../store/action/groStats';
import { setPriceCheck, removePriceCheck } from '../../store/action/priceCheck';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Dashboard.module.css';
require('dotenv').config();

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            // Improve scrollable dialog support.
            zIndex: 100,
            position: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: 0,
            bottom: 0,
            top: 0,
            left: 0,
        },
    }),
);

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isError, setIsError] = React.useState<String>('');

    const URL = `${APP_STATS_BOT_URL}:${APP_STATS_BOT_PORT}/database/gro_stats`;
    const URL_PRICE_CHECK = `${APP_STATS_BOT_URL}:${APP_STATS_BOT_PORT}/database/price_checkXX`;
    const networkId = APP_NETWORK_ID || 0;

    React.useEffect(() => {
        fetchAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAPI = async () => {
        setIsLoading(true);
        setIsError('');
        dispatch(removeAllGroStats());
        dispatch(removePriceCheck());
        if (networkId === 0) {
            setIsError(`Error reading blockchain network (id:${networkId}) => .env entry might be missing`);
            setIsLoading(false);
        } else {
            await Promise.all([
                axios.get(URL, {
                    params: { network: getNetworkId(networkId) },
                }).then(res => {
                    dispatch(setAllGroStats({
                        tvl: res.data.tvl,
                        apy1: res.data.apy1,
                        apy2: res.data.apy2,
                        lifeguard: res.data.lifeguard,
                        system: res.data.system,
                        vaults: res.data.vaults,
                        reserves: res.data.reserves,
                        strategies: res.data.strategies,
                        exposureStables: res.data.exposureStables,
                        exposureProtocols: res.data.exposureProtocols,
                        config: res.data.config,
                        loadDate: moment.utc(),
                    }));
                }).catch(err => {
                    console.log('Error in Dashboard.tsx -> fetchAPI(): ', err);
                    setIsError(`Error fetching gro stats from DB: ${err}`);
                })
                ,
                axios.get(URL_PRICE_CHECK, {
                    params: { network: getNetworkId(networkId) },
                }).then(res => {
console.log('res PRICE check:', res)
                    dispatch(setPriceCheck({
                        global: res.data.global,
                        detail: res.data.detail,
                    }));
                }).catch(err => {
                    console.log('Error in Dashboard.tsx -> fetchAPI(): ', err);
                    setIsError(`Error fetching price check from DB: ${err}`);
                })
            ]);
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Header onRefreshClick={() => fetchAPI()} />
            {(isError !== '')
                ? <span className={styles.container + ' ' + styles.error}>
                    {isError}
                </span>
                : ''
            }
            {(isLoading)
                ? <div className={classes.root}>
                    <CircularProgress />
                </div>
                : ''}
            <Tvl />
            <Apy />
            <System />
            <Vaults />
            <Reserves />
            <Strategies />
            <PriceCheck />
            <ExposureStables />
            <ExposureProtocols />

        </div>
    )
}

export default Dashboard;
