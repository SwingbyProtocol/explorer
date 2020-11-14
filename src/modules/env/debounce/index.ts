export const debounce = (fn: () => void, ms: number): (() => void) => {
  let timer: number | undefined;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      // @ts-ignore
      fn.apply(this, arguments);
    }, ms);
  };
};
