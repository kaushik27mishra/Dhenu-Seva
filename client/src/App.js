import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './pages/Signup/Signup.js';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage.js';

function App() {

  var isAuthenticated = true; // should be determined using a redux setup or a react context setup
  return (
    <div className='App'>
      <Router>
        <Switch>
          {/* <PrivateRoute path='/app' component={layout} /> */}
          <PublicRoute path='/signup' component={Signup} />
          <PublicRoute path='/login' component={Login} />
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
  
  // when the user is not logged in we shouldn't allow the user to go inside our main app
  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }
  
  // When the user is already logged in we should not allow th user to visit the login and signup page  
  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/app",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

}

export default App;