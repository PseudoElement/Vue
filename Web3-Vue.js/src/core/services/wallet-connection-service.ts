export class WallectConnectionService {
    public static async connectWallet(onLogin: (address: string | null) => void): Promise<void> {
        if (window === undefined || window.ethereum === undefined) {
            throw new Error('Install Metamask extension in browser, then retry to connect!');
        }

        const accounts = (await window.ethereum.request({
            method: 'eth_requestAccounts'
        })) as string[];

        console.log('ACCOUNTS', accounts);

        onLogin(accounts?.[0] || null);
    }
}
