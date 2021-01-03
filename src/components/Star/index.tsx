import React, { useEffect, useState } from 'react';

import { StyledStar } from './styled';

interface Props {
  scale: number;
  xPos: number;
  yPos: number;
  delay: number;
}

export const Star = (props: Props) => {
  const { scale, xPos, yPos, delay } = props;
  const [isFirstTwinkle, setIsFirstTwinkle] = useState(true);
  const duration = 5;

  useEffect(() => {
    setTimeout(() => {
      setIsFirstTwinkle(false);
    }, duration * 1000);
  }, []);
  const firstTwinkle = isFirstTwinkle ? 0.5 : 1;

  return (
    <StyledStar
      initial={{ scale, x: xPos, y: yPos, opacity: firstTwinkle }}
      animate={{ opacity: [firstTwinkle, 0.6, 1, 0.6] }}
      transition={{ duration: duration, delay, repeat: Infinity }}
    ></StyledStar>
  );
};
