import type { WalletType } from '../../constants/wallets';

export interface WalletState {
    address: string | null;
    type: WalletType;
}
