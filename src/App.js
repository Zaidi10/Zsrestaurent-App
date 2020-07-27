import React, { Component } from 'react';
import Main from "./components/MainComponent";
import { DISHES } from "./shared/dishes";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore, configureStore } from "./Redux/configureStore";
import { Provider } from "react-redux"

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter >
      </Provider>
    );
  }
}

export default App;
