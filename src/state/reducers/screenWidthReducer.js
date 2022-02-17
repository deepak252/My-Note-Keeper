const screenWidthReducer = (screenWidthState=null,action)=>{
    if(action.type==="SCREEN_WIDTH"){
        return action.payload;
    }
    return screenWidthState;
}

export default screenWidthReducer;