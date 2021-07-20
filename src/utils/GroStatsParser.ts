// import { format } from "path";


const GroStatsParser = (data: any, kpi: string, displayName: string, format: string) => {
    return {
        'kpi': displayName,
        ...(data['vault_name']) && { 'vault_name': data['vault_name'] },
        ...(data['strategy_name']) && { 'strategy_name': data['strategy_name'] },
        ...(data['reserve_name']) && { 'reserve_name': data['reserve_name'] },
        ...(data['name']) && { 'name': data['name'] },
        'now': data[kpi],
        '_5m': data[kpi + '_5m'],
        '_5m_dif': data[kpi + '_5m_dif'],
        '_1h': data[kpi + '_1h'],
        '_1h_dif': data[kpi + '_1h_dif'],
        '_1d': data[kpi + '_1d'],
        '_1d_dif': data[kpi + '_1d_dif'],
        '_1w': data[kpi + '_1w'],
        '_1w_dif': data[kpi + '_1w_dif'],
        'format': format,
    }
}

export default GroStatsParser;
