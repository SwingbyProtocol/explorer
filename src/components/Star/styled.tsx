import styled from 'styled-components';
import { motion } from 'framer-motion';
import { rem } from 'polished';

export const StyledStar = styled(motion.div)`
  position: absolute;
  top: 0;
  height: ${rem(5)};
  width: ${rem(5)};
  border-radius: 50%;
  background: white;
  z-index: -10;
`;
