//@flow
const initialState = {};

type addJson = {type: 'ADD_JSON', payload: {}};

export default function ratesMapRedux(state: {[string]: number}=initialState, action: addJson) {
    if (action.type == 'ADD_JSON'){
        return action.payload
    }
    return state;
};