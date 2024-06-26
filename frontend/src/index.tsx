import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
);
