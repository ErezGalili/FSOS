function getUsers() {
  return [
    {
      id: 1,
      name: 'John Doe',
      email: 'iM2wU@example.com',
      password: '123456',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'janeDoe@me.com',
      password: '123456',
      role: 'user',
    },
    {
      id: 3,
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: '123456',
      role: 'user',
    }
  ];
}

function getCurrentUser() {
  const userId = localStorage.getItem('currentUserId') || 1;
  return getUsers().find(user => user.id === Number(userId));
}

function setCurrentUser(userId) {
  localStorage.setItem('currentUserId', userId);
}

export { getUsers, getCurrentUser, setCurrentUser };