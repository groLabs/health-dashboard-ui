import React from "react";
import axios from "axios";
import moment from "moment";
import Header from "./Header";
import Tvl from "./Tvl";
import TvlAvax from "./TvlAvax";
import Apy from "./Apy";
import System from "./System";
import LifeguardStables from "./LifeguardStables";
import Vaults from "./Vaults";
import VaultsAvax from "./VaultsAvax";
import Strategies from "./Strategies";
import StrategiesAvax from "./StrategiesAvax";
import PriceCheck from './PriceCheck';
import Reserves from "./Reserves";
import ReservesAvax from "./ReservesAvax";
import ExposureStables from "./ExposureStables";
import ExposureProtocols from "./ExposureProtocols";
import getNetworkId from '../../utils/getNetworkId';
import {
    APP_STATS_BOT_URL,
    APP_STATS_BOT_PORT,
    APP_NETWORK_ID,
    EMPTY_OBJECT,
    EMPTY_ARRAY
} from '../../constants';
import { useDispatch } from 'react-redux';
import { setAllGroStats, removeAllGroStats } from '../../store/action/groStats';
import { setPriceCheck, removePriceCheck } from '../../store/action/priceCheck';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Dashboard.module.css';
import avaxIcon from '../../assets/avalanche.png';
import ethIcon from '../../assets/ethereum.png';
require('dotenv').config();

const useStyles = makeStyles(() =>
    createStyles({
        root: {
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

    // const URL = `${APP_STATS_BOT_URL}:${APP_STATS_BOT_PORT}/database/gro_stats`;
    const URL = `${APP_STATS_BOT_URL}:${APP_STATS_BOT_PORT}/database/gro_stats_mc`;
    const URL_PRICE_CHECK = `${APP_STATS_BOT_URL}:${APP_STATS_BOT_PORT}/database/price_check`;
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
                        tvl: res.data.tvl
                            ? res.data.tvl
                            : EMPTY_OBJECT,
                        tvl_avax: res.data.tvl_avax
                            ? res.data.tvl_avax
                            : EMPTY_OBJECT,
                        apy1: res.data.apy1
                            ? res.data.apy1
                            : EMPTY_OBJECT,
                        apy2: res.data.apy2
                            ? res.data.apy2
                            : EMPTY_OBJECT,
                        lifeguard: res.data.lifeguard
                            ? res.data.lifeguard
                            : EMPTY_OBJECT,
                        lifeguardStables: res.data.lifeguardStables
                            ? res.data.lifeguardStables
                            : EMPTY_ARRAY,
                        system: res.data.system
                            ? res.data.system
                            : EMPTY_OBJECT,
                        vaults: res.data.vaults
                            ? res.data.vaults
                            : EMPTY_ARRAY,
                        vaults_avax: res.data.vaults_avax
                            ? res.data.vaults_avax
                            : EMPTY_ARRAY,
                        reserves: res.data.reserves
                            ? res.data.reserves
                            : EMPTY_ARRAY,
                        reserves_avax: res.data.reserves_avax
                            ? res.data.reserves_avax
                            : EMPTY_ARRAY,
                        strategies: res.data.strategies
                            ? res.data.strategies
                            : EMPTY_ARRAY,
                        strategies_avax: res.data.strategies_avax
                            ? res.data.strategies_avax
                            : EMPTY_ARRAY,
                        exposureStables: res.data.exposureStables
                            ? res.data.exposureStables
                            : EMPTY_ARRAY,
                        exposureProtocols: res.data.exposureProtocols
                            ? res.data.exposureProtocols
                            : EMPTY_ARRAY,
                        config: res.data.config
                            ? res.data.config
                            : EMPTY_OBJECT,
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
            <div className={styles.text_image}>
                <div> <img src={ethIcon} alt='eth' className={styles.icons} /> </div>
                <div className={styles.title_section}> Ethereum </div>
            </div>
            <Tvl />
            <Apy />
            <System />
            <LifeguardStables />
            <Vaults />
            <Reserves />
            <Strategies />
            <PriceCheck />
            <ExposureStables />
            <ExposureProtocols />
            <div className={styles.text_image}>
                <div> <img src={avaxIcon} alt='avax' className={styles.icons} /> </div>
                <div className={styles.title_section}> Avalanche </div>
            </div>
            <TvlAvax />
            <VaultsAvax />
            <ReservesAvax />
            <StrategiesAvax />
        </div>
    )
}

export default Dashboard;
