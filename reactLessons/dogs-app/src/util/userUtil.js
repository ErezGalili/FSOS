import { fetchUser, fetchUsers } from './api';

async function getUsers() {
  const response = await fetchUsers();
  return response.data;
}

async function getCurrentUser(userId) {
  const response = await fetchUser(userId);
  return response.data;
}

export { getUsers, getCurrentUser };