const favMapsReducer = (state = [], action) => {
    if(action.type === 'SAVE_MAP_FAVORITES'){
        return action.payload
    }

    return state
}

export default favMapsReducer;