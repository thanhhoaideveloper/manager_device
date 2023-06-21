import { isEmpty } from "lodash";

export const setLocalStrorage = (data) => {
    if (data) {
        localStorage.setItem('currentUser', JSON.stringify(data.userPermission));
        localStorage.setItem('isAuthenticated', true);
        localStorage.setItem('_token', data.accessToken);
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

export const _checkRole = (role, listRole) => {
    let hasRole = false;
    listRole.forEach(item => {
        if(role.indexOf(item.name) >= 0){
            hasRole = true;
        }
    })
    return hasRole;
}
