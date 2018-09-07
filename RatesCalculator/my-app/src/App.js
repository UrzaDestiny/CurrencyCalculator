import React, { Component } from 'react';

class Converter extends Component {
    constructor(props){
        super(props);
        this.state = {
            convertionAmount: 0,
            convertionResult: 0,
            currencyList: ['AED', 'USD', 'EUR'],
            ratesMap: {},
            currencyFrom: 'AED',
            currencyTo: 'AED',
        };
    };

    componentWillMount(){
        fetch('http://data.fixer.io/api/latest?access_key=416b9d4a8622014b57c02f65f6738909')
            .then(res => res.json())
            .then(
                (result) => {
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
    return (
        <div>
            <input
                type="number"
                value={this.state.convertionAmount}
                onChange={(event) => this.handleInputChange(event)}
            />

            <select
                onChange={(event)=>this.handleSelectChangeFrom(event)}>
                {this.state.currencyList.map(currency => <option name={currency} value={currency}>{currency}</option>)}
            </select>

            <input
                type="number"
                readOnly={true}
                value={this.state.convertionResult}
            />

            <select
                onChange={(event) => this.handleSelectChangeTo(event)}>
                {this.state.currencyList.map(currency => <option>{currency}</option>)}
            </select>

            <button onClick={this.handleClick}>SUBMIT</button>
        </div>
    );
  }
}

export default Converter;
