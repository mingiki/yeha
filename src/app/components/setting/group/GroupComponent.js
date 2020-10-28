import React, { Suspense , Component} from "react";
import { Redirect, Route, Switch ,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as GroupModules from "../../../store/modules/group";

import GroupListComponent from "./GroupListComponent";
import GroupViewComponent from "./GroupViewComponent";
import GroupEditComponent from "./GroupEditComponent";
import GroupAddComponent from "./GroupAddComponent";

class GroupComponent extends Component {
  constructor(props) {
      super(props);  
      this.state = {
      };
  }

  render() {
    const param = {
      auth : this.props.auth,
      group : this.props.group,
      AuthActions : this.props.AuthActions,
      GroupActions : this.props.GroupActions
    };
    
    return <>
      <Suspense>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => <GroupListComponent {...props} {...param}/>} />
          <Route path={`${this.props.match.url}/view/:id`} render={(props) => <GroupViewComponent {...props} {...param} />}  />
          <Route path={`${this.props.match.url}/edit/:id`} render={(props) => <GroupEditComponent {...props} {...param}/>}  />
          <Route path={`${this.props.match.url}/add`} render={(props) => <GroupAddComponent {...props}  {...param} />}  />

          <Redirect from="*" to={`${this.props.match.url}`} />
        </Switch>
      </Suspense>
    </>
  }
}

export default connect((state) => ({
  group: state.group,
}),
  (dispatch) => ({
      GroupActions: bindActionCreators(GroupModules.actions, dispatch),
  })
)(withRouter(GroupComponent));
