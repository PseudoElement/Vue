import type { WalletType } from '../../constants/wallets';

export interface WalletState {
    address: string | null;
    type: WalletType | null;
    chainId: number | null;
    isConnected: boolean;
}
