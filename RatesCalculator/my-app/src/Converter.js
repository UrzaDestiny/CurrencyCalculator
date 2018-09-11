import React, { Component } from 'react';
import {connect} from 'react-redux';


class Converter extends Component {
    constructor(props){
        super(props);
        this.state = {
            convertionAmount: 0,
            convertionResult: 0,
            currencyList: ['AED', 'USD', 'EUR'], //reduxed
            ratesMap: {}, //reduxed
            currencyFrom: 'AED',
            currencyTo: 'AED',
        };
    };

    componentWillMount(){
        fetch('http://data.fixer.io/api/latest?access_key=416b9d4a8622014b57c02f65f6738909')
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.onJsonBootList(Object.keys(result.rates));
                    this.props.onJsonBootMap(result.rates);
                    this.setState({
                        ratesMap: result.rates,
                        currencyList: Object.keys(result.rates),
                    })
                });
    };

    handleClick=()=>{
        const from = this.state.ratesMap[this.state.currencyFrom];
        const to = this.state.ratesMap[this.state.currencyTo];
        const res = (1/from)/(1/to)*this.state.convertionAmount;
        this.setState({
            convertionResult: res,
        })
    };

    handleInputChange(event) {
        this.setState ({
            convertionAmount: event.target.value,
            })
    }

    handleSelectChangeFrom=(event)=>{
        this.setState({
            currencyFrom: event.target.value,
        });
    };

    handleSelectChangeTo=(event)=>{
        this.setState({
            currencyTo: event.target.value,
        });
    };

  render() {
      console.log(this.props.ratesMapRedux);
    return (
        <div className='converter'>
            <select
                className='selFrom'
                onChange={(event)=>this.handleSelectChangeFrom(event)}>
                {this.props.currencyListRedux.map(currency => <option name={currency} value={currency}>{currency}</option>)}
            </select>

            <select
                className='selTo'
                onChange={(event) => this.handleSelectChangeTo(event)}>
                {this.props.currencyListRedux.map((currency) => <option>{currency}</option>)}
            </select>

            <input
                className='ammount'
                type="number"
                value={this.state.convertionAmount}
                onChange={(event) => this.handleInputChange(event)}
            />

            <button className='button' onClick={this.handleClick}>SUBMIT</button><br/>

            <input
                className='res'
                type="number"
                readOnly={true}
                value={this.state.convertionResult}
            />
        </div>
    );
  }
}

export default connect(
    state => ({
        ratesMapRedux: state.ratesMapRedux,
        currencyListRedux: state.currencyListRedux
        }),
    dispatch => ({
        onJsonBootList: (name) => {
            dispatch({type: 'ADD_CURR_NAME', payload: name})
        },
        onJsonBootMap: (name) => {
            dispatch({type: 'ADD_JSON', payload: name})
        }
    })
)(Converter);