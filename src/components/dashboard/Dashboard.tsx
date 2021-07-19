import React from "react";
import Header from "./Header";
import Tvl from "./Tvl";
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <Tvl />
        </div>
    )
}

export default Dashboard;
