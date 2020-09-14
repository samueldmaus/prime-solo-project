const favHeroReducer = (state =[], action) => {
    if(action.type === "SET_HERO_FAVORITES") {
        return action.payload
    }

    return state
}

export default favHeroReducer;

