export const setLocalStrorage = (currentUser) => {
    if(currentUser){
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isAuthenticated', true);
    }
}

export const removeLocalStorage = () => {
    localStorage.clear();
}

export const getLocalStorage = (field) => {
    return JSON.parse(localStorage.getItem(field));
}

export const isAdmin = (currentUser) => {
    return currentUser.is_admin === 1;
}