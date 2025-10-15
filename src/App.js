import React from 'react';
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import router from "./Components/Routes/Route";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <div>
          <RouterProvider router={router} />
          <Toaster />
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
