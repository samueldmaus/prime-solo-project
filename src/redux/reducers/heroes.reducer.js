

const heroesReducer = (state = [], action) => {
    if(action.type === "SET_HEROES") {
        return action.payload
    } else if(action.type === "SET_HERO_FAVORITES") {
        return action.payload
    }

    return state
}

export default heroesReducer;