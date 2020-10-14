import React , { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";


import LoginComponent from '../components/auth/LoginComponent';
import RegisterComponent from '../components/auth/RegisterComponent';
import ForgatPasswordComponent from '../components/auth/ForgatPasswordComponent';

export default function Auth(props) {
  let param = props;
  return (
    <>
       <Suspense>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/auth" to="/auth/login" />
          }
          <Route path={"/auth/login"} render={() =><LoginComponent {...param} />}  exact/>
          <Route path={"/auth/register"} render={() =><RegisterComponent {...param} />}  />
          <Route path={"/auth/forgat"} render={() =><ForgatPasswordComponent {...param} />}  />
        </Switch>
      </Suspense>
    </>
  );
}
