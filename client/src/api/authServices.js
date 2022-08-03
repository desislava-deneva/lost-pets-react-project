export const clearUserSessionStorage = ()=>{
    let token = sessionStorage.getItem('authToken');
    let username = sessionStorage.getItem('username');
    let userId = sessionStorage.getItem('userId');
    let names = sessionStorage.getItem('names');
    token = '';
    username = '';
    userId = ''
    names = '';
    sessionStorage.setItem({ username, authToken: token, _id: userId, names } )
}

export const setUserSessionStorage=()=>{
    
}

export const getUser = ()=>{
    let user = sessionStorage.getItem('username');
    return  user;
}

export const getUserId = ()=>{
    let userId = sessionStorage.getItem('userId');
    return  userId;
}

export const isAuthenticated = ()=>{
    return Boolean(getUser());
}