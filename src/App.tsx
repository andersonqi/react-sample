import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import config from './config/api';

import AppViews from './views/App';

const Login = React.lazy(() => import('./views/Auth/Login'))
const Recover = React.lazy(() => import('./views/Auth/Recover'))

axios.interceptors.request.use((config: any) => {
  let token: any = localStorage.getItem('token');
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Accept-Language"] = 'es';
  }
  return config;
});


const instance = axios.create();

// Response interceptor for API calls
axios.interceptors.response.use((response) => {return response }, async function (error) {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    let refresh = localStorage.getItem('refresh_token');

    const rs = await instance.post(`${config.api_url}/auth/refresh`, {
      refresh_token: refresh,
      type: "administrator",
    });

    if(rs.data.status === "fail"){
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      window.location.reload()
    }

    localStorage.setItem("token", rs.data.access_token);
    localStorage.setItem("refresh_token", rs.data.refresh_token);

    originalRequest.headers['Authorization'] = `Bearer ${rs.data.access_token}`;

    return axios(originalRequest);
  }

  return Promise.reject(error);
});


function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<div className="loading" />}>
        <Router>
          <Switch>

            <Route exact path="/" component={Login} />
            <Route path="/forgot-password" component={Recover} />

            <Route path={'/app'} >
              <AppViews />
            </Route>

          </Switch>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default App;