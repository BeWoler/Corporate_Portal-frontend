import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import Store from "./store/store";
import "./index.sass";

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
