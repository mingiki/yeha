import React , { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";


import ScheduleComponent from '../components/class/schedule/ScheduleComponent';

export default function Class(props) {
  let param = props;
  return (
    <>
       <Suspense>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/class" to="/class/schedule" />
          }
          <Route path={"/class/schedule"} render={() =><ScheduleComponent {...param} />}  exact/>

        </Switch>
      </Suspense>
    </>
  );
}
