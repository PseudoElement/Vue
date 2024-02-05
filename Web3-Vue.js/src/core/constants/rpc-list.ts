import { BLOCKCHAIN_NAMES, BlockchainName } from './blockchain-names';

export const WEB3_PROVIDER_NODE = 'https://ethereum.api.watchdata.io/node/jsonrpc?api_key=0048b7ee-ca3b-438e-83ca-9790458b40ad';

export const RPC_LIST: Record<BlockchainName, string> = {
    [BLOCKCHAIN_NAMES.ETHEREUM]: 'https://ethereum.api.watchdata.io/node/jsonrpc?api_key=0048b7ee-ca3b-438e-83ca-9790458b40ad',
    [BLOCKCHAIN_NAMES.BNB]: 'https://bsc.api.watchdata.io/node/jsonrpc?api_key=b9784aa4-f5f4-48d7-8e99-3bc8fe67e355',
    [BLOCKCHAIN_NAMES.POLYGON]: 'https://polygon.api.watchdata.io/node/jsonrpc?api_key=883d1c77-22fa-4a10-8e0c-6657479410a1',
    [BLOCKCHAIN_NAMES.AVALANCHE]: 'https://rpc.ankr.com/avalanche/cdb5678d9797006c10fa86c3ea17d7f3f1ead96554d393fa427112462e891eca',
    [BLOCKCHAIN_NAMES.ARBITRUM]: 'https://rpc.ankr.com/fantom/cdb5678d9797006c10fa86c3ea17d7f3f1ead96554d393fa427112462e891eca',
    [BLOCKCHAIN_NAMES.LINEA]: 'https://rpc.ankr.com/linea/cdb5678d9797006c10fa86c3ea17d7f3f1ead96554d393fa427112462e891eca',
    [BLOCKCHAIN_NAMES.OPTIMISM]: 'https://rpc.ankr.com/optimism/cdb5678d9797006c10fa86c3ea17d7f3f1ead96554d393fa427112462e891eca',
    [BLOCKCHAIN_NAMES.SCROLL]: 'https://rpc.ankr.com/scroll/cdb5678d9797006c10fa86c3ea17d7f3f1ead96554d393fa427112462e891eca'
};
