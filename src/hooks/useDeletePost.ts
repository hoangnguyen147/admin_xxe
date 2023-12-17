import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

// api
import { deletePost } from 'apis/post.api';

export default function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, string>(
    (id: string) =>
      deletePost(id)
        .then((res: any) => res)
        .catch((error: any) => Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'))),
    {
      onSuccess: () => queryClient.invalidateQueries('posts'),
    },
  );
}
