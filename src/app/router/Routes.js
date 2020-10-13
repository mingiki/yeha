import React, { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";

import Auth from "../pages/Auth";
import Main from "../pages/Main";

export const Routes = withRouter((props) => {
  return (
    <Suspense>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/auth" />
        }

        {/* auth 관련 router  */}
        <Route path={"/auth"} render={(props) =><Auth {...props} />}  />



        {/* main 관련 router */}
        {/* <Route path={"/main/:roomId"} render={(props) =><Main {...props} />}  /> */}

        {/* room 관련 router */}
        {/* <Route path={"/room"} render={(props) =><Room {...props} />}  />
        <Route path={"/leave"} render={(props) =><Leave {...props} />}  /> */}
     
        {/* test 관련 router */}
        {/* <Route path={"/test"} render={(props) =><Test {...props} />}  /> */}

        <Route component={Error}/>
      </Switch>
    </Suspense>
  );
});

export default Routes;