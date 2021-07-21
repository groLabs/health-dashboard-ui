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



const Dashboard = () => {
    const dispatch = useDispatch();
    const URL = 'http://localhost:3001/database/gro_stats';

    React.useEffect(() => {
        fetchGroStats();
    }, []);

    const fetchGroStats = async () => {
        await axios.get(URL, {
            params: { network: 'ropsten' },
        }).then(res => {
            console.log('data!', res.data);
            // dispatch(setTvl(res.data.tvl));
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
            }))
        }).catch(err => {
            console.log('Error in Dashboard.tsx -> fetchGroStats(): ', err);
        });
    };

    return (
        <div>
            <Header />
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
