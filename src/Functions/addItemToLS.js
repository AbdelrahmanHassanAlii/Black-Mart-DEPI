export const addItemToLS = (name, item) => {
    localStorage.setItem(name, JSON.stringify([item])); 
};
