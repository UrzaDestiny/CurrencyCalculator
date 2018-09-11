const initialState = ['tytytyt', 'tatatata'];

export default function ratesMapRedux(state=initialState, action) {
    if (action.type == 'ADD_JSON'){
        return action.payload
    }
    return state;
};