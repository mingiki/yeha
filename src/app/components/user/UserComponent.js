import React, { Suspense , Component} from "react";
import { Redirect, Route, Switch ,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as UserModules from "../../store/modules/user/user";

import UserListComponent from "./UserListComponent";
import UserViewComponent from "./UserViewComponent";
import UserEditComponent from "./UserEditComponent";
import UserAddComponent from "./UserAddComponent";

class UserComponent extends Component {
  constructor(props) {
      super(props);  
      this.state = {
      };
  }

  render() {
    const param = {
      auth : this.props.auth,
      user : this.props.user,
      AuthActions : this.props.AuthActions,
      UserActions : this.props.UserActions
    };
    
    return <>
      <Suspense>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => <UserListComponent {...props} {...param}/>} />
          <Route path={`${this.props.match.url}/view/:id`} render={(props) => <UserViewComponent {...props} {...param} />}  />
          <Route path={`${this.props.match.url}/edit/:id`} render={(props) => <UserEditComponent {...props} {...param}/>}  />
          <Route path={`${this.props.match.url}/add`} render={(props) => <UserAddComponent {...props}  {...param} />}  />

          <Redirect from="*" to={`${this.props.match.url}`} />
        </Switch>
      </Suspense>
    </>
  }
}

export default connect((state) => ({
  user: state.user,
}),
  (dispatch) => ({
      UserActions: bindActionCreators(UserModules.actions, dispatch),
  })
)(withRouter(UserComponent));
