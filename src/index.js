import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

let myComponent = document.getElementById('root')
if (myComponent !== null) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        myComponent);
}