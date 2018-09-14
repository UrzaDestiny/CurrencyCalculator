//@flow
import {combineReducers} from 'redux';

import ratesMapRedux from './ratesMapRedux';
import currencyListRedux from './currencyListRedux';

export default combineReducers ({
    ratesMapRedux,
    currencyListRedux
});
