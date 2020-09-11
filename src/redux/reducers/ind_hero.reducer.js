const individualHeroReducer = (state = [], action) => {
    if(action.type === "SAVE_IND_HERO") {
        return action.payload
    } 

    return state
}

export default individualHeroReducer;