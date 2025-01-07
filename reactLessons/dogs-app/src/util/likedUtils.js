const getFromLocalStorage = (key) => {
  const str = localStorage.getItem(key);
  return str ? JSON.parse(str) : [];
}

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

const isLiked = (item, liked) => {
  return liked.includes(item);
}

const addToLiked = (item, liked) => {
  const newLiked = [...liked];
  if (!newLiked.includes(item)) {
    newLiked.push(item);
    saveToLocalStorage('favoriteImages', newLiked);
  }
  return newLiked;
};

const removeFromLiked = (item, liked) => {
  const newLiked = liked.filter(i => i !== item);
  saveToLocalStorage('favoriteImages', newLiked);
  return newLiked;
};

export { getFromLocalStorage, saveToLocalStorage, isLiked, addToLiked, removeFromLiked };