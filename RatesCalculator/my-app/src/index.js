import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Converter from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Converter />, document.getElementById('root'));
registerServiceWorker();
