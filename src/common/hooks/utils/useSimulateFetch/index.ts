export const useSimulateFetch = <T>(fetcher: () => T, delay = 1500) => {
  return async () => {
    return new Promise<T>((resolve) => {
      setTimeout(() => {
        resolve(fetcher());
      }, delay);
    });
  };
};
