export const setUser = (username)=>{
    sessionStorage.setItem('username', username)
}

export const getUser = ()=>{
    let user = sessionStorage.getItem('username');
    

    return  user;
}

export const isAuthenticated = ()=>{
    return Boolean(getUser());
}