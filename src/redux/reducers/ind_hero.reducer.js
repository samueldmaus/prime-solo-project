const individualHeroReducer = (state = {}, action) => {
    if(action.type === "SAVE_IND_HERO") {
        return action.payload[0]
    } 

    return state
}

export default individualHeroReducer;