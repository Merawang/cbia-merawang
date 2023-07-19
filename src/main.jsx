import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import { ThemeProvider, createTheme } from '@mui/material'

// Pages and Assets
import App from './App.jsx'
import Home from './pages/Home.jsx'
import './index.css'

// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route exact path='/' element={<App />}>
    <Route path='/' element={<Home />} />
  </Route>
))

// MUI Default Font
const theme = createTheme({
  typography: {
    "fontFamily": `"Nunito", sans-serif`,
  }
});

// Set Default Header
const accessToken = import.meta.env.VITE_BEARERTOKEN;
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers.common['Accept'] = `application/json`;
axios.defaults.headers.common['Content-Type'] = `application/json`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} fallbackElement={<h1>Loading..</h1>} />
    </ThemeProvider>
  </React.StrictMode>
)
