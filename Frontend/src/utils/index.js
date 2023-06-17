export const setLocalStrorage = (currentUser) => {
    if (currentUser) {
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

export const getMapListSelect = (data) => {
    const dataSelect = data.map(item => {
        return {
            key: item.id,
            name: item.name
        }
    });
    return dataSelect;
}

export const getActiveMenuName = () => {
    const url = window.location.pathname;
    let active = 'dashboard';
    switch (true) {
        case url.includes('users'):
            active = 'users';
            break
        case url.includes('departments'):
            active = 'departments';
            break
        case url.includes('devices'):
            active = 'devices';
            break
        case url.includes('categories'):
            active = 'categories';
            break
    }
    return active;
}
