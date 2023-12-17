import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { ISharingPostState } from 'models/ISharingPostState';

// apis
import { updateSharing } from 'apis/sharing.api';
import { uploadImage } from 'apis/image.api';

async function saveSharing(newPost: ISharingPostState): Promise<any> {
  if (typeof newPost.thumbnail === 'string') {
    try {
      const res = await updateSharing({ ...newPost });
      return res?.data;
    } catch (error: any) {
      return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
    }
  } else {
    try {
      const formdata = new FormData();
      formdata.append('image', newPost.thumbnail);
      const res1: any = await uploadImage(formdata);
      const res2 = await updateSharing({ ...newPost, thumbnail: res1.filename });
      return res2?.data;
    } catch (error: any) {
      return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
    }
  }
}

export default function useSaveSharing() {
  const queryClient = useQueryClient();

  return useMutation<Response, AxiosError, ISharingPostState>((newPost: ISharingPostState) => saveSharing(newPost), {
    onSuccess: () => queryClient.invalidateQueries('sharings'),
  });
}
