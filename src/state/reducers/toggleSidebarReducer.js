
const toggleSidebarReducer = (isExpanded=false, action) =>{
    if(action.type==="IS_SIDEBAR_EXPANDED"){
        return action.payload;
    }
    return isExpanded;
}

export default toggleSidebarReducer;