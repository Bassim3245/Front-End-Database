import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from './redux/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <I18nextProvider i18n=
// @ts-ignore
    {i18n}>
   <NextUIProvider>
       <App />
   </NextUIProvider>
   </I18nextProvider>
     </Provider>
);