/* eslint-disable no-console */
import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ISharingPostState } from 'models/ISharingPostState';

// apis
import { createSharing } from 'apis/sharing.api';
import { uploadImage } from 'apis/image.api';

async function createPost(newPost: ISharingPostState): Promise<any> {
  const formdata = new FormData();
  formdata.append('image', newPost.thumbnail);
  try {
    const res1: any = await uploadImage(formdata);
    const res2 = await createSharing({ ...newPost, thumbnail: res1.filename });
    return res2?.data;
  } catch (error: any) {
    return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
  }
}

export default function useCreateSharing() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, ISharingPostState>((newPost: ISharingPostState) => createPost(newPost), {
    onSuccess: () => queryClient.invalidateQueries('sharings'),
  });
}
