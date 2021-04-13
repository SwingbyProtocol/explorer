export const getShortDate = (d: Date) => {
  const date = new Date(d);
  const dd = date.getDate();

  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
};
