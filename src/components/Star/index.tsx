import React from 'react';

import { StyledStar } from './styled';

export const Star = ({ scale, xPos, yPos, delay }) => (
  <StyledStar
    initial={{ scale, x: xPos, y: yPos, opacity: 1 }}
    animate={{ opacity: [1, 0.6, 1, 0.6] }}
    transition={{ duration: 6, delay, repeat: Infinity }}
  ></StyledStar>
);
