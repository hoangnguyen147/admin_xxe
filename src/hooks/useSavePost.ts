import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { IPostState } from 'models/IPostState';

// api
import { uploadImage } from 'apis/image.api';
import { updatePost } from 'apis/post.api';

async function savePost(newPost: IPostState): Promise<any> {
  if (typeof newPost.thumbnail === 'string') {
    try {
      const res = await updatePost({ ...newPost });
      return res?.data;
    } catch (error: any) {
      console.log(error.response.data.error);
      return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
    }
  } else {
    try {
      const formdata = new FormData();
      formdata.append('image', newPost.thumbnail);
      const res1: any = await uploadImage(formdata);
      const res2 = await updatePost({ ...newPost, thumbnail: res1.filename });
      return res2?.data;
    } catch (error: any) {
      console.log(error);

      return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
    }
  }
}

export default function useSavePost() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, IPostState>((newPost: IPostState) => savePost(newPost), {
    onSuccess: () => queryClient.invalidateQueries('posts'),
  });
}
