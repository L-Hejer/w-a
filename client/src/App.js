import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppNavbar from './Components/AppNavbar';
import Home from './Components/pages/Home';
import Dashboard from './Components/pages/Dashboard';

import PrivateRoute from './Components/routes/PrivateRoute';

import { getAuthUser } from './js/Actions/authActions';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authReducer);
  const getUser = () => dispatch(getAuthUser());

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return <h>Spinner...</h>;
  }

  return (
    <BrowserRouter>
      <AppNavbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
