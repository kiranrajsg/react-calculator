import React, { Component } from "react";
import "./App.css";

const buttonStyle = {
  width: "25%",
  height: "20%",
  fontSize: "18px"
};

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: "0",
      firstOperand: null,
      operator: null,
      waitingForSecondOperand: false
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForSecondOperand } = this.state;

    if (waitingForSecondOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForSecondOperand: false
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit
      });
    }
  };

  inputDecimal = () => {
    const { displayValue } = this.state;

    if (!displayValue.includes(".")) {
      this.setState({
        displayValue: displayValue + "."
      });
    }
  };

  clearInput = () => {
    this.setState({
      displayValue: "0"
    });
  };

  performOperation = (nextOperator) => {
    const { displayValue, firstOperand, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (firstOperand == null) {
      this.setState({
        firstOperand: inputValue,
        waitingForSecondOperand: true,
        operator: nextOperator
      });
    } else {
      const result = this.calculate(firstOperand, inputValue, operator);
      this.setState({
        displayValue: String(result),
        firstOperand: result,
        waitingForSecondOperand: true,
        operator: nextOperator
      });
    }
  };

  calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  handleEquals = () => {
    const { displayValue, firstOperand, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (firstOperand != null) {
      const result = this.calculate(firstOperand, inputValue, operator);
      this.setState({
        displayValue: String(result),
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null
      });
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator" style={{ width: "300px", height: "400px" }}>
        <input
          type="text"
          className="display"
          value={displayValue}
          readOnly
          style={{ width: "100%" }}
        />
        <div className="button-container">
          <div className="button-row">
            <button
              style={{ ...buttonStyle, backgroundColor: "red", color: "white" }}
              onClick={() => this.clearInput()}
            >
              C
            </button>
            <button
              style={buttonStyle}
              onClick={() => this.performOperation("/")}
            >
              /
            </button>
            <button
              style={buttonStyle}
              onClick={() => this.performOperation("*")}
            >
              *
            </button>
            <button
              style={buttonStyle}
              onClick={() => this.performOperation("+")}
            >
              +
            </button>
          </div>
          <div className="button-row">
            <button style={buttonStyle} onClick={() => this.inputDigit(7)}>
              7
            </button>
            <button style={buttonStyle} onClick={() => this.inputDigit(8)}>
              8
            </button>
            <button style={buttonStyle} onClick={() => this.inputDigit(9)}>
              9
            </button>
            <button
              style={buttonStyle}
              onClick={() => this.performOperation("-")}
            >
              -
            </button>
          </div>
          <div className="button-row">
            <button style={buttonStyle} onClick={() => this.inputDigit(4)}>
              4
            </button>
            <button style={buttonStyle} onClick={() => this.inputDigit(5)}>
              5
            </button>
            <button style={buttonStyle} onClick={() => this.inputDigit(6)}>
              6
            </button>
            <button
              style={{
                ...buttonStyle,
                backgroundColor: "orange",
                color: "white"
              }}
              onClick={() => this.handleEquals()}
            >
              =
            </button>
          </div>
          <div className="button-row">
            <button style={buttonStyle} onClick={() => this.inputDigit(1)}>
              1
            </button>
            <button style={buttonStyle} onClick={() => this.inputDigit(2)}>
              2
            </button>
            <button style={buttonStyle} onClick={() => this.inputDigit(3)}>
              3
            </button>
            <button style={buttonStyle} onClick={() => this.inputDecimal()}>
              .
            </button>
          </div>
          <div className="button-row">
            <button style={buttonStyle} onClick={() => this.inputDigit(0)}>
              0
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
