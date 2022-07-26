export const setUser = (username)=>{
    sessionStorage.setItem('username', username)
}

export const getUser = ()=>{
    let user = sessionStorage.getItem('username');
        console.log(user)
    

    return  user;
}

export const getUserId = ()=>{
    let userId = sessionStorage.getItem('userId');
        console.log(userId)
    

    return  userId;
}

export const isAuthenticated = ()=>{
    return Boolean(getUser());
}