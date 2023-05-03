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
      firstCurrency: "GBP",
      secondCurrency: "EUR",
      rates: { EUR: 1 },
      firstAmount: 1,
      secondAmount: 1,
      baseCurrency: "NZD",
      allRates: {},
    };
    this.handleFirstCurrChange = this.handleFirstCurrChange.bind(this);
    this.handleSecondCurrChange = this.handleSecondCurrChange.bind(this);
    this.handleFirstAmountChange = this.handleFirstAmountChange.bind(this);
    this.handleSecondAmountChange = this.handleSecondAmountChange.bind(this);
    this.handleBaseCurrChange = this.handleBaseCurrChange.bind(this);
  };

  componentDidMount () {
    this.getRate();
    this.getAllRates();
  }

  getRate = () => {
    fetch (`https://api.frankfurter.app/latest?from=${this.state.firstCurrency}&to=${this.state.secondCurrency}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        rates: data.rates,
        secondAmount: this.convertBaseToQuote(this.state.firstAmount, data.rates[this.state.secondCurrency]),
      });
    });
  };

  getAllRates = () => {
    fetch (`https://api.frankfurter.app/latest?from=${this.state.baseCurrency}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        allRates: data.rates,
      });
    });
  };

  convertBaseToQuote = (base, rate) => {
    return base * rate;
  }

  convertQuoteToBase = (quote, rate) => {
    return quote / rate;
  }

  handleFirstCurrChange = (event) => {
    this.setState({ firstCurrency: event.target.value }, this.getRate);

  };

  handleSecondCurrChange = (event) => {
    this.setState({ secondCurrency: event.target.value }, this.getRate);

  };

  handleFirstAmountChange = (event) => {
    this.setState({
      firstAmount: event.target.value,
      secondAmount: this.convertBaseToQuote(event.target.value, this.state.rates[this.state.secondCurrency]),
    });
  };

  handleSecondAmountChange = (event) => {
    this.setState({
      secondAmount: event.target.value,
      firstAmount: this.convertQuoteToBase(event.target.value, this.state.rates[this.state.secondCurrency]),
    });
  };

  handleBaseCurrChange = (event) => {
    this.setState({
      baseCurrency: event.target.value,
    }, this.getAllRates);
    console.log(Object.entries(this.state.allRates))
  };

  render () {
    console.log(this.state);
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
          <span className="mx-3">1 {this.state.firstCurrency} equals {this.state.rates[this.state.secondCurrency]} {this.state.secondCurrency}</span>
        </div>
        <div className="col-12">
          <span className="mr-3">{this.state.firstCurrency}</span>
          <input value={this.state.firstAmount} onChange={this.handleFirstAmountChange} type="number"/>
          <span className="mx-3">=</span>
          <input value={this.state.secondAmount} onChange={this.handleSecondAmountChange} type="number"/>
          <span className="ml-3">{this.state.secondCurrency}</span>
        </div>
        <h2>Exchange Rates For</h2>
        <CurrencyMenu onChange={this.handleBaseCurrChange} value={this.state.baseCurrency} />
        <ul>{Object.entries(this.state.allRates).map(entry => <li>{entry}</li>)}</ul>
      </div>
    );
  };
};

export default MyApp;