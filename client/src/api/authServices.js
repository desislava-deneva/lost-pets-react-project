export const logUser = (username)=>{
    sessionStorage.setItem('username', username)
}

export const getUser = ()=>{
    let user = sessionStorage.getItem('username');
    console.log(user);

    return  user;
}

export const isAuthenticated = ()=>{
    return Boolean(getUser());
}