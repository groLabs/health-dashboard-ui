export interface IDefault {
    key: string;
    kpi: string;
    name: string;
    now: number; 
    _5m: number; 
    _5m_dif: number; 
    _1h: number; 
    _1h_dif: number; 
    _1d: number; 
    _1d_dif: number; 
    _1w: number; 
    _1w_dif: number; 
    format: string;
}

export interface IExposure {
    key: string;
    kpi: string;
    name: string;
    now: number; 
    _5m: number; 
    _5m_dif: number; 
    _1h: number; 
    _1h_dif: number; 
    _1d: number; 
    _1d_dif: number; 
    _1w: number; 
    _1w_dif: number; 
    format: string;
}

export interface IReserve {
    key: string;
    kpi: string;
    vault_name: string;
    reserve_name: string,
    now: number; 
    _5m: number; 
    _5m_dif: number; 
    _1h: number; 
    _1h_dif: number; 
    _1d: number; 
    _1d_dif: number; 
    _1w: number; 
    _1w_dif: number; 
    format: string;
}

export interface IStrategy {
    key: string;
    kpi: string; 
    vault_name: string;
    strategy_name: string;
    now: number;
    _5m: number;
    _5m_dif: number;
    _1h: number;
    _1h_dif: number;
    _1d: number;
    _1d_dif: number;
    _1w: number;
    _1w_dif: number;
    format: string; 
}

export interface IVault {
    key: string;
    kpi: string; 
    vault_name: string;
    now: number;
    _5m: number;
    _5m_dif: number;
    _1h: number;
    _1h_dif: number;
    _1d: number;
    _1d_dif: number;
    _1w: number;
    _1w_dif: number;
    format: string;  
}

export interface IGroStats {
    tvl: {
        
    }
}
