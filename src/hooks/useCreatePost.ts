/* eslint-disable no-console */
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { IPostState } from 'models/IPostState';

// apis
import { createPost } from 'apis/post.api';
import { uploadImage } from 'apis/image.api';

async function createPostFn(newPost: IPostState): Promise<any> {
  const formdata = new FormData();
  formdata.append('image', newPost.thumbnail);
  try {
    const res1: any = await uploadImage(formdata);
    console.log('upload thumnail success: ', res1.filename);
    const res2 = await createPost({ ...newPost, thumbnail: res1.filename });
    return res2?.data;
  } catch (error: any) {
    return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
  }
}

export default function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, IPostState>((newPost: IPostState) => createPostFn(newPost), {
    onSuccess: () => queryClient.invalidateQueries('posts'),
  });
}
