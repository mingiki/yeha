import React , { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";


import LoginComponent from '../components/auth/LoginComponent';
import RegisterComponent from '../components/auth/RegisterComponent';
import ForgatPasswordComponent from '../components/auth/ForgatPasswordComponent';

export default function Auth(props) {
  return (
    <>
       <Suspense>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/auth" to="/auth/login" />
          }
          <Route path={"/auth/login"} render={(props) =><LoginComponent {...props} />}  exact/>
          <Route path={"/auth/register"} render={(props) =><RegisterComponent {...props} />}  />
          <Route path={"/auth/forgat"} render={(props) =><ForgatPasswordComponent {...props} />}  />
        </Switch>
      </Suspense>
    </>
  );
}
