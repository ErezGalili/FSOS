import { getCurrentUser } from './userUtil';

export function getFromLocalStorage() {
  const userId = getCurrentUser().id;
  const favorites = localStorage.getItem(`favoriteImages_${userId}`);
  return favorites ? JSON.parse(favorites) : [];
}

export function saveToLocalStorage(favorites) {
  const userId = getCurrentUser().id;
  localStorage.setItem(`favoriteImages_${userId}`, JSON.stringify(favorites));
}

export function isLiked(url, favoriteImages) {
  return favoriteImages.includes(url);
}

export function addToLiked(url, favoriteImages) {
  const newFavorites = [...favoriteImages, url];
  saveToLocalStorage(newFavorites);
  return newFavorites;
}

export function removeFromLiked(url, favoriteImages) {
  const newFavorites = favoriteImages.filter(item => item !== url);
  saveToLocalStorage(newFavorites);
  return newFavorites;
}

