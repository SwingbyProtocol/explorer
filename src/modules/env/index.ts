export const isProduction = (): boolean => {
  if (typeof window !== 'undefined') {
    const defaultNetwork = 'testnet';
    const network = localStorage.getItem('network') || defaultNetwork;
    return network === 'mainnet';
  }
};

export const swapUrl = process.env.NEXT_PUBLIC_SWAP_URL || 'https://widget-seven.vercel.app/';
