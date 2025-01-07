export const getFromLocalStorage = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const isLiked = (url, favoriteImages) => {
  return favoriteImages.includes(url);
};

export const addToLiked = (url, favoriteImages) => {
  const updatedFavorites = [...favoriteImages, url];
  saveToLocalStorage('favoriteImages', updatedFavorites);
  return updatedFavorites;
};

export const removeFromLiked = (url, favoriteImages) => {
  const updatedFavorites = favoriteImages.filter(image => image !== url);
  saveToLocalStorage('favoriteImages', updatedFavorites);
  return updatedFavorites;
};