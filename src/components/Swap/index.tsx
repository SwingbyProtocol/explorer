import { swapUrl } from '../../modules/env';

import { StyledSwap } from './styled';

export const Swap = () => {
  return <StyledSwap as="iframe" title="Swap" src={swapUrl} />;
};
