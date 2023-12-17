export type ISharingPostState = {
  id?: string | undefined;
  title: string;
  description: string;
  thumbnail: any;
  link: string;
};
export type Sharings = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
  isPublic: boolean;
  updatedAt: string;
  createdAt: string;
  user: {
    fullname: string;
    id: string;
    username: string;
  };
};
