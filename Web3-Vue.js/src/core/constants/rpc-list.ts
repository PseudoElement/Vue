import { BLOCKCHAIN_NAMES, BlockchainName } from './blockchain-names';

export const RPC_LIST: Record<BlockchainName, string> = {
    [BLOCKCHAIN_NAMES.ETHEREUM]: 'https://ethereum.api.watchdata.io/node/jsonrpc?api_key=0048b7ee-ca3b-438e-83ca-9790458b40ad',
    [BLOCKCHAIN_NAMES.BNB]: 'https://bsc.api.watchdata.io/node/jsonrpc?api_key=b9784aa4-f5f4-48d7-8e99-3bc8fe67e355',
    [BLOCKCHAIN_NAMES.POLYGON]: 'https://polygon.api.watchdata.io/node/jsonrpc?api_key=883d1c77-22fa-4a10-8e0c-6657479410a1',
    [BLOCKCHAIN_NAMES.AVALANCHE]: 'https://avalanche.drpc.org',
    [BLOCKCHAIN_NAMES.ARBITRUM]: 'https://arbitrum.drpc.org',
    [BLOCKCHAIN_NAMES.LINEA]: 'https://linea.decubate.com',
    [BLOCKCHAIN_NAMES.OPTIMISM]: 'https://rpc.tornadoeth.cash/optimism',
    [BLOCKCHAIN_NAMES.SCROLL]: 'https://1rpc.io/scroll',
    [BLOCKCHAIN_NAMES.SEPOLIA]: 'https://eth-sepolia.g.alchemy.com/v2/demo'
};
