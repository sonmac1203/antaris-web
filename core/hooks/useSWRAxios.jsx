import axios from 'axios';
import useSWR from 'swr';

const fetcher = async ([url, params]) => {
  const { data } = await axios.get(url, { params });
  return data;
};

export function useSWRAxios(props) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    props,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );
  return {
    data,
    error,
    loading: isLoading,
    validating: isValidating,
    mutate,
  };
}
