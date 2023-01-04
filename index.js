const isOperator = /[x/+-]/;

class Formula extends React.Component {
  render() {
    return (
      <div id="formulaScreen">
        {this.props.formula}
      </div>
    )
  }
}

class Output extends React.Component {
  render() {
    return (
      <div id="display">
        {this.props.currentValue}
      </div>
    )
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttonsBox">
        <button
          id="clear"
          className="wide"
          value="AC"
          onClick={this.props.clear}
        >
          AC
        </button>
        <button
          id="divide"
          className="operator"
          value="/"
          onClick={this.props.operators}
        >
          /  
        </button>
        <button
          id="multiply"
          className="operator"
          value="x"
          onClick={this.props.operators}
        >
          x
        </button>
        <button
          id="seven"
          value="7"
          onClick={this.props.numbers}
        >
          7
        </button>
        <button 
          id="eight"
          value="8"
          onClick={this.props.numbers}
        >
          8
        </button>
        <button 
          id="nine"
          value="9"
          onClick={this.props.numbers}
        >
          9
        </button>
        <button 
          id="subtract"
          className="operator"
          value="-"
          onClick={this.props.operators}
        >
          -
        </button>
        <button 
          id="four"
          value="4"
          onClick={this.props.numbers}
        >
          4
        </button>
        <button 
          id="five"
          value="5"
          onClick={this.props.numbers}
        >
          5    
        </button>
        <button 
          id="six"
          value="6"
          onClick={this.props.numbers}
        >
          6
        </button>
        <button 
          id="add"
          className="operator"
          value="+"
          onClick={this.props.operators}
        >
          +
        </button>
        <button 
          id="one"
          value="1"
          onClick={this.props.numbers}
        >
          1
        </button>
        <button 
          id="two"
          value="2"
          onClick={this.props.numbers}
        >
          2
        </button>
        <button 
          id="three"
          value="3"
          onClick={this.props.numbers}
        >
          3
        </button>
        <button 
          id="zero"
          className="wide"
          value="0"
          onClick={this.props.numbers}
        >
          0
        </button>
        <button 
          id="decimal"
          value="."
          onClick={this.props.decimals}
        >
          .
        </button>
        <button 
          id="equals"
          value="="
          onClick={this.props.equals}
        >
          =
        </button>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      currentValue: "0"
    };
    this.handleNumbers=this.handleNumbers.bind(this);
    this.handleOperators=this.handleOperators.bind(this);
    this.handleDecimals=this.handleDecimals.bind(this);
    this.handleEquals=this.handleEquals.bind(this);
    this.clearDisplay=this.clearDisplay.bind(this);
    this.warning=this.warning.bind(this);
  }
  
  handleNumbers(e) {
    const value = e.target.value;
    if (!this.state.currentValue.includes("Limit")) {
      if (this.state.currentValue.length < 14) {
        if (this.state.currentValue === "0" || isOperator.test(this.state.currentValue)) {
          this.setState({
            currentValue: value,
            formula: this.state.formula + value
          })
        }
        else {
          this.setState({
            currentValue: this.state.currentValue + value,
            formula: this.state.formula + value
          })
        }
      }
      else {
        this.warning();
      }
    }
  }
  
  handleOperators(e) {
    const value = e.target.value;
    if (isOperator.test(this.state.formula.slice(-1))) {
      if (value === "-" && !isOperator.test(this.state.formula.slice(-2, -1))) {
        this.setState({
          currentValue: this.state.formula.slice(-1) + value,
          formula: this.state.formula + value
        })
      }
      else if (value === "-" && isOperator.test(this.state.formula.slice(-2, -1))) {
        this.setState({
          currentValue: this.state.formula.slice(-2),
          formula: this.state.formula
        })
      }
      else if (value !== "-" && !isOperator.test(this.state.formula.slice(-2, -1))) {
        this.setState({
          currentValue: value,
          formula: this.state.formula.slice(0, -1) + value
        })
      }
      else {
        this.setState({
          currentValue: value,
          formula: this.state.formula.slice(0, -2) + value
        })
      }
    }
    else {
      this.setState({
        currentValue: value,
        formula: this.state.formula + value
      })
    }
  }
  
  handleDecimals(e) {
    const value = e.target.value;
    if (!this.state.currentValue.includes(".") && !this.state.formula.includes("Limit")) {
      if (this.state.currentValue === "0" && this.state.formula === "") {
        this.setState({
          currentValue: this.state.currentValue + value,
          formula: this.state.currentValue + value
        })
      } else if (isOperator.test(this.state.formula.slice(-1))) {
        this.setState({
          currentValue: value,
          formula: this.state.formula + value
        })
      } 
      else {
        this.setState ({
          currentValue: this.state.currentValue + value,
          formula: this.state.formula + value
        })
      }
    }
  }
  
  handleEquals() {
    let expression = this.state.formula.replace(/x/g, "*").replace(/--/g, "+");
    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    this.setState({
      currentValue: answer.toString(),
      formula: answer.toString()
    })
  }
  
  clearDisplay() {
    if (this.state.currentValue !== "0") {
      this.setState({
        currentValue: "0",
        formula: this.state.formula.slice(0, -(this.state.currentValue.length))
      })
    }
    else {
      this.setState({
        formula: ""
      })
    }
  }
  
  warning() {
    let previousValue = this.state.currentValue;
    this.setState({
      currentValue: "Digit Limit Reached"
    });
    setTimeout(() => this.setState({currentValue: previousValue}), 1000)
  }
  
  render() {
    return (
      <div id="calculator">
        <div id="fullDisplay">
          <Formula 
            formula={this.state.formula}  
          />
          <Output 
            currentValue={this.state.currentValue}  
          />
        </div>
        <Buttons 
          numbers={this.handleNumbers}
          operators={this.handleOperators}
          clear={this.clearDisplay}
          equals={this.handleEquals}
          decimals={this.handleDecimals}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
