import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

// api
import { changeTogglePublicPost } from 'apis/post.api';

export default function useTogglePublicPost() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, string>(
    (id: string) =>
      changeTogglePublicPost(id)
        .then((res: any) => res?.data)
        .catch((error: any) => Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'))),
    {
      onSuccess: () => queryClient.invalidateQueries('posts'),
    },
  );
}
