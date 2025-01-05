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
    if (!liked.includes(item)) liked.push(item);
    saveToLocalStorage('favoriteImages', liked);
  };
  
  const removeFromLiked = (item, liked) => {
    const index = liked.indexOf(item);
    if (index !== -1) liked.splice(index, 1);
    saveToLocalStorage('favoriteImages', liked);
  };

  export { getFromLocalStorage, saveToLocalStorage, isLiked, addToLiked, removeFromLiked };