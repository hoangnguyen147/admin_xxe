import { useQuery } from 'react-query';
import User from 'models/IUserState';

const api = require('apis/user.api');

function fetchUsers() {
  return api.getAllUser().then((res: any) => res.data);
}

function useUsers() {
  return useQuery<User[], Error>('users', fetchUsers);
}

function useUsersCount() {
  return useQuery('usersCount', fetchUsers, {
    select: (users) => users.length,
  });
}

export { useUsers, useUsersCount };
