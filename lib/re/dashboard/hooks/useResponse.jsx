import { useSWRAxios } from '@/core/hooks';

export const useResponse = (props) => {
  const apiResponse = useSWRAxios(['/api/dev/skill/responses', props]);
  return apiResponse;
};
