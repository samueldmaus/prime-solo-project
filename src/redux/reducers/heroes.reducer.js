
const heroesReducer = (state = [], action) => {
    if(action.type === "SET_HEROES") {
        return action.payload
    }

    return state
}

export default heroesReducer;