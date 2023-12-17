import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

// model
import { Post } from 'models/IPostState';

// api
import { getAllPost } from 'apis/post.api';

async function fetchPosts(): Promise<any> {
  try {
    const res = await getAllPost();
    return res?.data;
  } catch (error: any) {
    return Promise.reject(new Error(error.response.data.message || error.response.data.error || 'fail'));
  }
}

export function usePosts() {
  return useQuery<Post[], AxiosError>('posts', fetchPosts);
}
