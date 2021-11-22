import { createContext } from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import Store from "./store/store";

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({ store });

ReactDOM.render(
  <Context.Provider value={{ store }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>,
  document.getElementById("root")
);
