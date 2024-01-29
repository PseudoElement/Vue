export interface OpenOceanGetTokenListResponse {
    code: number;
    data: OpenOceanToken[];
}

export interface OpenOceanToken {
    name: string;
    address: string;
    decimals: number;
    symbol: string;
    icon: string;
    code: string;
}
