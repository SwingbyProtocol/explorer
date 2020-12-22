export const TxRowVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  in: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};

export const TxRowTransition = {
  type: 'spring',
  ease: 'easeInOut',
  default: { duration: 0.5 },
  stiffness: 200,
};
