import React from "react";
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
