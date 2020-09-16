const teamCompReducer = (state = [], action) => {
    if(action.type === 'SAVE_TEAM_COMPS'){
        return action.payload
    }

    return state
}

export default teamCompReducer;