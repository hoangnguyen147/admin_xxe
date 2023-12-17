import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

// api
import { deleteSharing } from 'apis/sharing.api';

export default function useDeleteSharing() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, string>(
    (id) =>
      deleteSharing(id)
        .then((res: any) => res)
        .catch((error: any) => Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'))),
    {
      onSuccess: () => queryClient.invalidateQueries('sharings'),
    },
  );
}
