import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StyledEngineProvider } from '@mui/material'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import store from './store';
import { Provider } from 'react-redux';
import TripScreen from './screens/TripScreen';
import MyTicketsScreen from './screens/MyTicketsScreen';
import ViewTicketScreen from './screens/ViewTicketScreen';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/trip/:id' element={<TripScreen />} />
        <Route path='/tickets' element={<MyTicketsScreen />} />
        <Route path='/ticket/:id' element={<ViewTicketScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router}/>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
)
