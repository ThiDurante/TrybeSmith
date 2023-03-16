const setStatus = (string: string): number => {
  if (string.includes('required')) return 400;
  if (string.includes('must')) return 422;
  return 400;
};

export default setStatus;