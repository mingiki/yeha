import React, { Suspense , Component} from "react";
import { Redirect, Route, Switch ,withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as MembershipModules from "../../../store/modules/membership";

import MembershipListComponent from "./MembershipListComponent";
import MembershipViewComponent from "./MembershipViewComponent";
import MembershipEditComponent from "./MembershipEditComponent";
import MembershipAddComponent from "./MembershipAddComponent";

class MembershipComponent extends Component {
  constructor(props) {
      super(props);  
      this.state = {
      };
  }

  render() {
    const param = {
      auth : this.props.auth,
      membership : this.props.membership,
      AuthActions : this.props.AuthActions,
      MembershipActions : this.props.MembershipActions
    };
    
    return <>
      <Suspense>
        <Switch>
          <Route exact path={`${this.props.match.url}`} render={(props) => <MembershipListComponent {...props} {...param}/>} />
          <Route path={`${this.props.match.url}/view/:id`} render={(props) => <MembershipViewComponent {...props} {...param} />}  />
          <Route path={`${this.props.match.url}/edit/:id`} render={(props) => <MembershipEditComponent {...props} {...param}/>}  />
          <Route path={`${this.props.match.url}/add`} render={(props) => <MembershipAddComponent {...props}  {...param} />}  />

          <Redirect from="*" to={`${this.props.match.url}`} />
        </Switch>
      </Suspense>
    </>
  }
}

export default connect((state) => ({
    membership: state.membership,
}),
  (dispatch) => ({
      MembershipActions: bindActionCreators(MembershipModules.actions, dispatch),
  })
)(withRouter(MembershipComponent));
