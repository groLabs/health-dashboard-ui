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



const Dashboard = () => {
    const URL = 'http://localhost:3001/database/gro_stats';

    React.useEffect(() => {
        fetchGroStats();
    }, []);

    const fetchGroStats = async () => {
        await axios.get(URL, {
            params: { network: 'ropsten' },
        }).then(res => {
            console.log('data!', res.data);
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
