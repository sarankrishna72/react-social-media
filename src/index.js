import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// import SocketContext, { socket } from './context/socket';

import { Provider } from 'react-redux';
import store from './redux/store';
import { ContextProvider } from './context/socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  
  <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
   
  </ContextProvider>
    
  // </React.StrictMode>
);
