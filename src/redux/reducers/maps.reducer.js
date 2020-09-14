const mapsReducer = (state=[], action) => {
    if(action.type === 'SAVE_MAPS') {
        return action.payload
    }

    return state
};

export default mapsReducer;