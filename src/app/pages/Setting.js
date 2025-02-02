import React , { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";


import LessonComponent from '../components/setting/lesson/LessonComponent';
import MembershipComponent from '../components/setting/membership/MembershipComponent';
import ConfigComponent from '../components/setting/config/ConfigComponent';
import InstructorComponent from '../components/setting/instructor/InstructorComponent';
import GroupComponent from '../components/setting/group/GroupComponent';
import HistoryComponent from '../components/setting/history/HistoryComponent';

export default function Auth(props) {
  let param = props;
  return (
    <>
       <Suspense>
        <Switch>
          {
            /* Redirect from root URL to /dashboard. */
            <Redirect exact from="/setting" to="/setting/membership" />
          }

          <Route path={"/setting/lesson"} render={() =><LessonComponent {...param} />} />   
          <Route path={"/setting/membership"} render={() =><MembershipComponent {...param} />} />
          <Route path={"/setting/config"} render={() =><ConfigComponent {...param} />}  />
          <Route path={"/setting/instructor"} render={() =><InstructorComponent {...param} />}  />
          <Route path={"/setting/group"} render={() =><GroupComponent {...param} />}  />
          <Route path={"/setting/history"} render={() =><HistoryComponent {...param} />}  />

          {/* <Redirect from="*" to="/setting/membership" /> */}
        </Switch>
      </Suspense>
    </>
  );
}
