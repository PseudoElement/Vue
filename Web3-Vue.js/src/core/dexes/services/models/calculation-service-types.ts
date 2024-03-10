import { AbstractOnChainTrade } from "../../abstract/abstract-dex-trade";

export interface ResolvedTrade{
    isActive: boolean;
    trade: AbstractOnChainTrade;
}