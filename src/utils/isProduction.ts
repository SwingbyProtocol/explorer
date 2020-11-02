export const isProduction = (): boolean => {
  if (typeof window !== 'undefined') {
    const defaultNetwork = 'testnet';
    const network = localStorage.getItem('network') || defaultNetwork;
    return network === 'mainnet';
  }
};
