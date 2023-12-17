import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

// api
import { changeTogglePublicSharing } from 'apis/sharing.api';

export default function useTogglePublicSharing() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, string>(
    (id: string) =>
      changeTogglePublicSharing(id)
        .then((res: any) => res?.data)
        .catch((error: any) => Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'))),
    {
      onSuccess: () => queryClient.invalidateQueries('sharings'),
    },
  );
}
