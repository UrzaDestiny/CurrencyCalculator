//@flow
const initialState = ['AED', 'USD', 'EUR', 'RUB'];

export default function currencyListRedux(state: Array<string>=initialState, action: {type: 'ADD_CURR_NAME', payload: []}) {
    if (action.type === 'ADD_CURR_NAME'){
        return action.payload;
    }
    return state;
};