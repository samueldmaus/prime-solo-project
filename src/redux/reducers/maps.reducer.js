const mapsReducer = (state=[], action) => {
    if(action.type === 'SAVE_MAPS') {
        return action.payload
    }else if(action.type === 'SAVE_MAP_FAVORITES'){
        return action.payload
    }

    return state
};

export default mapsReducer