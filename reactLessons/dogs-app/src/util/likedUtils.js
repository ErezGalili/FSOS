import { fetchFavorites, newFavorite, deleteFavorite } from './api';

export async function getFavorites(userId) {
  try {
    const response = await fetchFavorites(userId);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

export async function addFavorite(userId, imageSrc) {
  try {
    const response = await newFavorite(userId, imageSrc);
    return response.success;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
}

export async function removeFavorite(userId, favoriteId) {
  try {
    const response = await deleteFavorite(userId, favoriteId);
    return response.success;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
}

export function isLiked(url, favoriteImages) {
  return favoriteImages.some(fav => fav.imageSrc === url);
}

