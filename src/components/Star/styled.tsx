import styled from 'styled-components';
import { motion } from 'framer-motion';
import { rem } from 'polished';

const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};
const randomSize = getRandomArbitrary(4, 7);

export const StyledStar = styled(motion.div)`
  position: absolute;
  top: 0;
  height: ${({ theme }) => rem(randomSize)};
  width: ${({ theme }) => rem(randomSize)};
  border-radius: 50%;
  background: white;
  z-index: -10;
`;
