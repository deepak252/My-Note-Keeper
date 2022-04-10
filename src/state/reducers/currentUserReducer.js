const currentUserReducer = (userId = null, action) =>{
    if(action.type==="USER_ID"){
        return action.payload;
    }
    return userId;
}

export default currentUserReducer;