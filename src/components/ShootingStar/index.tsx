import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const ShootingStar = ({ startX, startY, delay }) => {
  const shootingStar = {
    start: {
      width: 0,
      opacity: 1,
      rotateZ: 40,
      x: startX,
      y: startY,
    },
    shoot: {
      width: '150px',
      opacity: 0,
      x: startX + 900,
      y: startY + 400,
    },
  };

  return (
    <StyledShootingStar
      variants={shootingStar}
      initial="start"
      animate="shoot"
      transition={{ duration: 3, delay, repeat: Infinity }}
    ></StyledShootingStar>
  );
};

const StyledShootingStar = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 1px;
  background: white;
  z-index: -30;
`;

export default ShootingStar;
