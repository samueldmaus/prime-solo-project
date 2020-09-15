const mapHeroesReducer = (state = [], action) => {
    if(action.type === "SAVE_MAP_HEROES") {
        return action.payload
    }

    return state
};


export default mapHeroesReducer;
