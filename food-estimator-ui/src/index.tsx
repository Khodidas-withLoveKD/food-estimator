import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Client as Styletron } from "styletron-engine-atomic";
import { DebugEngine, Provider as StyletronProvider } from "styletron-react";

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

// 2. Provide the engine to the app
// debug engine needs inlined source maps
root.render(
  <StyletronProvider value={engine} debug={debug} debugAfterHydration>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StyletronProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
