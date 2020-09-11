
const individualMapReducer = (state = [], action) => {
    if(action.type === "SAVE_IND_MAP"){
        return action.payload
    }

    return state
}

export default individualMapReducer;