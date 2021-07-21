import React from "react";
import axios from "axios";
import Header from "./Header";
import Tvl from "./Tvl";
import Apy from "./Apy";
import System from "./System";
import Vaults from "./Vaults";
import Strategies from "./Strategies";
import Reserves from "./Reserves";
import ExposureStables from "./ExposureStables";
import ExposureProtocols from "./ExposureProtocols";
import { useDispatch } from 'react-redux';
import { setAllGroStats } from '../../store/action/dashboard';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme: Theme) =>
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
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const URL = 'http://localhost:3001/database/gro_stats';

    React.useEffect(() => {
        fetchGroStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchGroStats = async () => {
        setIsLoading(true);
        dispatch(setAllGroStats({
            tvl: {},
            apy1: {},
            apy2: {},
            lifeguard: {},
            system: {},
            vaults: [],
            reserves: [],
            strategies: [],
            exposureStables: [],
            exposureProtocols: [],
            config: {},
        }));
        await axios.get(URL, {
            params: { network: 'ropsten' },
        }).then(res => {
            console.log('data successfully retrieved from API', res.data);
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
            }));
        }).catch(err => {
            console.log('Error in Dashboard.tsx -> fetchGroStats(): ', err);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div>

            <Header onRefreshClick={() => fetchGroStats()} />
            {(isLoading)
                ? <span className={classes.root}>
                    <CircularProgress />
                </span>
                : ''}

            <Tvl />
            <Apy />
            <System />
            <Vaults />
            <Reserves />
            <Strategies />
            <ExposureStables />
            <ExposureProtocols />

        </div>
    )
}

export default Dashboard;
