const initialState = ['AED', 'USD', 'EUR', 'RUB'];

export default function currencyListRedux(state=initialState, action) {
    if (action.type === 'ADD_CURR_NAME'){
        return action.payload;
    }
    return state;
};