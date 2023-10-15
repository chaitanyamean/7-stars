import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";

const root = createRoot(document.getElementById("root")!); // notice the '!'
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
