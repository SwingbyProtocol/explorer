export const scrollToTop = () => {
  try {
    window.scroll({
      top: 0,
      left: 0,
    });
  } catch (error) {
    // Memo: just a fallback for older browsers
    window.scrollTo(0, 0);
  }
};
