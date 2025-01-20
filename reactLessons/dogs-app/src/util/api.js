const BASE_URL = 'http://127.0.0.1:3000/api';

function APICall(url, method, body = null) {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },};
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(`${BASE_URL}${url}`, options)
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw new Error(error.message || 'API call failed');
        });
      }
      return res.json();
    })
    .catch((error) => {
      console.error('API call error:', error);
      throw error;
    });
}

export const newUser = name => APICall('/user', 'POST', { name });
export const fetchUser = id => APICall(`/user/${id}`, 'GET');
export const fetchUsers = () => APICall('/users', 'GET');
export const updateUserName = (id, name) => APICall(`/user/${id}/name`, 'PATCH', { name })
export const updateProfile = (id, profile) => APICall(`/user/${id}/profile`, 'PATCH', profile);
export const updateProfilePic = (id, profilePic) => APICall(`/user/${id}/profilePic`, 'PATCH', { profilePic });
export const deleteUser = id => APICall(`/user/${id}`, 'DELETE');
export const fetchFavorites = (id, query = null) => APICall(`/user/${id}/favorites${query ? `?${query}` : ''}`, 'GET');
export const newFavorite = (id, imageSrc) => APICall(`/user/${id}/favorite`, 'POST', { imageSrc });
export const deleteFavorite = (id, favoriteId) => APICall(`/user/${id}/favorites/${favoriteId}`, 'DELETE');
export const updateFavorite = (id, favoriteId, name) => APICall(`/user/${id}/favorites/${favoriteId}/name`, 'PATCH', { name });





//export const deleteDogById = id => APICall(`/user/${id}/favorites/${favoriteId}`, 'DELETE');
// export const fetchFavorites = (id, query = null) => {
//     const queryString = query ? `?${new URLSearchParams(query).toString()}` : '';
//     return APICall(`/user/${id}/favorites${queryString}`, 'GET');
//   };