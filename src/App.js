import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
    this.keyChangeHandle = this.keyChangeHandle.bind(this);
    this.calculateTheEquals = this.calculateTheEquals.bind(this);
  }

  keyChangeHandle = async (event) => {
    await this.setState({ value: event.target.value });
  }

  calculateTheEquals = () => {
    let resp = {};
    resp = { ...{ data: this.state.value } }
    let { data } = resp;
    while (data.charAt(0) === '0') {
      data = data.substr(1);
    }
    return eval(data);
  }

  buttonClickHandler = (data) => {
    switch (data) {
      case 'clear':
        this.setState({ value: 0 });
        break;
      case '=':
        const result = this.calculateTheEquals();
        console.log(result)
        this.setState({ value: result });
        break;
      default:
        this.setState({ value: `${this.state.value}${data}` });
    }
  }


  render() {
    return (
      <Fragment>
        <table className="table" border="1">
          <tbody>
            <tr>
              <td colSpan={4} className="text-input">
                <input
                  type="text"
                  className="text-input"
                  value={this.state.value}
                  onChange={this.keyChangeHandle}
                />
              </td>
            </tr>

            <tr>
              <td
                colSpan={3}
                onClick={this.buttonClickHandler.bind(this, 'clear')}>
                clear
              </td>
              <td
                className="red-operators"
                onClick={this.buttonClickHandler.bind(this, '/')}>
                /
              </td>
            </tr>

            <tr>
              <td
                onClick={this.buttonClickHandler.bind(this, 7)}>
                7
              </td>
              <td
                onClick={this.buttonClickHandler.bind(this, 8)}>
                8
              </td>
              <td
                onClick={this.buttonClickHandler.bind(this, 9)}>
                9
              </td>
              <td
                className="red-operators"
                onClick={this.buttonClickHandler.bind(this, '-')}>
                -
              </td>
            </tr>

            <tr>
              <td
                onClick={this.buttonClickHandler.bind(this, 4)}>
                4
              </td>
              <td
                onClick={this.buttonClickHandler.bind(this, 5)}>
                5
              </td>
              <td
                onClick={this.buttonClickHandler.bind(this, 6)}>
                6
              </td>
              <td
                className="red-operators"
                onClick={this.buttonClickHandler.bind(this, '+')}>
                +
              </td>
            </tr>

            <tr>
              <td
                onClick={this.buttonClickHandler.bind(this, 1)}>
                1
              </td>
              <td
                onClick={this.buttonClickHandler.bind(this, 2)}>
                2
              </td>
              <td
                onClick={this.buttonClickHandler.bind(this, 3)}>
                3
              </td>
              <td
                className="red-operators"
                onClick={this.buttonClickHandler.bind(this, '=')}>
                =
              </td>
            </tr>

          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default App;
