import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";

// React.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = createRoot(document.getElementById("root")!); // notice the '!'
root.render(<App />);
