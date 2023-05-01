import './App.css';
import { Component } from 'react';

function CurrencyMenu(props) {
  const { onChange, value } = props;
  return (
    <div>
      <select onChange={onChange} value={value}>
        <option value="AUD">Australian Dollar</option>
        <option value="BGN">Bulgarian Lev</option>
        <option value="BRL">Brazilian Real</option>
        <option value="CAD">Canadian Dollar</option>
        <option value="CHF">Swiss Franc</option>
        <option value="CNY">Chinese Renminbi Yuan</option>
        <option value="CZK">Czech Koruna</option>
        <option value="DKK">Danish Krone</option>
        <option value="EUR">Euro</option>
        <option value="GBP">British Pound</option>
        <option value="HKD">Hong Kong Dollar</option>
        <option value="HUF">Hungarian Forint</option>
        <option value="IDR">Indonesian Rupiah</option>
        <option value="ILS">Israeli New Sheqel</option>
        <option value="INR">Indian Rupee</option>
        <option value="ISK">Icelandic Króna</option>
        <option value="JPY">Japanese Yen</option>
        <option value="KRW">South Korean Won</option>
        <option value="MXN">Mexican Peso</option>
        <option value="MYR">Malaysian Ringgit</option>
        <option value="NOK">Norwegian Krone</option>
        <option value="NZD">New Zealand Dollar</option>
        <option value="PHP">Philippine Peso</option>
        <option value="PLN">Polish Złoty</option>
        <option value="RON">Romanian Leu</option>
        <option value="SEK">Swedish Krona</option>
        <option value="SGD">Singapore Dollar</option>
        <option value="THB">Thai Baht</option>
        <option value="TRY">Turkish Lira</option>
        <option value="USD">United States Dollar</option>
        <option value="ZAR">South African Rand</option>
      </select>
    </div>
  );
};

class MyApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstCurrency: "AUD",
      secondCurrency: "AUD",
      rates: { AUD: 1 },
      firstAmount: "",
      secondAmount: "",
    };
  };

  GetRate = () => {
    fetch (`https://api.frankfurter.app/latest?from=${this.state.firstCurrency}&to=${this.state.secondCurrency}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({ rates: data.rates });
    });
  };

  handleFirstCurrChange = (event) => {
    this.setState({ firstCurrency: event.target.value }, this.GetRate);
    this.setState({ firstAmount: 1 });
  };

  handleSecondCurrChange = (event) => {
    this.setState({ secondCurrency: event.target.value }, this.GetRate);
    this.setState({ firstAmount: 1 });
  };

  handleFirstAmountChange = (event) => {};

  handleSecondAmountChange = (event) => {};

  render () {
    return (
      <div className="text-center">
        <h1>CURRENCY EXCHANGE APP</h1>
        <p>Exchange between</p>
        <div className="col-12">
          <CurrencyMenu onChange={this.handleFirstCurrChange} value={this.state.firstCurrency} />
          <span className="mx-3">and</span>
          <CurrencyMenu onChange={this.handleSecondCurrChange} value={this.state.secondCurrency} />
        </div>
        <div className="col-12">
          <span className="mx-3">1 {this.state.firstCurrency} equals {this.rates[this.secondCurrency]} {this.state.secondCurrency}</span>
        </div>
        <div className="col-12">
          <span className="mr-1">{this.state.firstCurrency}</span>
          <input value={this.state.firstAmount} onChange={this.handleFirstAmountChange} type="number"/>
          <span className="mx-3">=</span>
          <input value={this.state.secondAmount} onChange={this.handleSecondAmountChange} type="number"/>
          <span className="ml-1">{this.state.secondCurrency}</span>
        </div>
      </div>
    );
  };
};

export default MyApp;