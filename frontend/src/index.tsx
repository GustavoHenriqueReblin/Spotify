import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

document.addEventListener("keydown", (e) => {
    if ((e.key === "+" || e.key === "-") && e.ctrlKey) e.preventDefault();
}, { passive: false });

document.addEventListener("wheel", (e) => {
    if (e.ctrlKey) e.preventDefault();
}, { passive: false });

document.addEventListener("keydown", (e: any) => {
    if (e.code === "Space") {
        const button = document.getElementById("play-pause-button") as HTMLButtonElement;
        button && button.click();
    }
}, { passive: false });

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
