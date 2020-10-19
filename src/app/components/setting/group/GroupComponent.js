
import React , { Suspense } from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";

import GroupListComponent from "./GroupListComponent";
import GroupViewComponent from "./GroupViewComponent";
import GroupEditComponent from "./GroupEditComponent";
import GroupAddComponent from "./GroupAddComponent";

export function GroupComponent(props) {
  return (
    <>
       <Suspense>
        <Switch>
          <Route exact path={`${props.match.path}`} render={(props) => <GroupListComponent {...props} />} />
          <Route path={`${props.match.path}/:id/view`} render={(props) => <GroupViewComponent {...props} />}  />
          <Route path={`${props.match.path}/:id/edit`} render={(props) => <GroupEditComponent {...props} />}  />
          <Route path={`${props.match.path}/add`} render={(props) => <GroupAddComponent {...props} />}  />

          <Redirect from="*" to={`${props.match.path}`} />
        </Switch>
      </Suspense>
    </>
  );
}

export default withRouter(GroupComponent);