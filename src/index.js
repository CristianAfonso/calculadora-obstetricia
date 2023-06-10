import React, {Suspense} from     'react';
import ReactDOM from  'react-dom/client';
import i18n                     from "i18next";
import { initReactI18next }     from "react-i18next";
import LanguageDetector         from 'i18next-browser-languagedetector';
import HttpApi                  from 'i18next-http-backend'


import 'flag-icon-css/css/flag-icons.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import App              from './App';
import reportWebVitals  from './reportWebVitals';
import Header           from './components/header.jsx';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en','es','fr','pt'],
    fallbackLng: "en",
    detection:{
      order: ['cookie', 'htmlTag',  'localStorage',  'path', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      //loadPath: '/assets/locales/{{lng}}/translation.json',
      loadPath: '/calculadora-obstetricia/assets/locales/{{lng}}/translation.json', // For GitHub-Pages
    }
  });

const loadingMarkup = (
  <div className='py-4 text-center'>
    <h2>Loading...</h2>
  </div>
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <Header></Header>
      <App />
    </React.StrictMode>
  </Suspense>

);

reportWebVitals();
