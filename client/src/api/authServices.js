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