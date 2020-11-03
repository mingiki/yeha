import React , { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";


import ScheduleComponent from '../components/lesson/schedule/ScheduleComponent';

export default function Lesson(props) {
  let param = props;
  return (
    <>
       <Suspense>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/lesson" to="/lesson/schedule" />
          }
          <Route path={"/lesson/schedule"} render={() =><ScheduleComponent {...param} />}  exact/>

        </Switch>
      </Suspense>
    </>
  );
}
