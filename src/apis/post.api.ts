import httpRequest from 'services/httpRequest';
import { IPostState } from 'models/IPostState';

export const getAllPost = async () => {
  return httpRequest.get(`/posts/admin-get?takeAll=true`);
};

export const createPost = async (data: IPostState) => {
  return httpRequest.post(`/posts`, data);
};

export const updatePost = async (data: IPostState) => {
  return httpRequest.put(`/posts/update-post/${data.id}`, data);
};

export const deletePost = async (id: string) => {
  return httpRequest.delete(`/posts/${id}`);
};

export const changeTogglePublicPost = async (id: string) => {
  return httpRequest.put(`/posts/toggle-public/${id}`, {});
};
