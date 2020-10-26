import React, { Suspense , Component} from "react";
import { Redirect, Route, HashRouter, Switch ,withRouter, BrowserRouter} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//setting
import * as GroupModules from "../../../store/modules/group";

import GroupListComponent from "./GroupListComponent";
import GroupViewComponent from "./GroupViewComponent";
import GroupEditComponent from "./GroupEditComponent";
import GroupAddComponent from "./GroupAddComponent";

// export function GroupComponent(props) {
//   let param = props;
//   return (
//     <>
//        <Suspense>
//         <Switch>
//           <Route exact path={`${props.match.path}`} render={() => <GroupListComponent {...param} />} />
//           <Route path={`${props.match.path}/view`} render={() => <GroupViewComponent {...param} />}  />
//           <Route path={`${props.match.path}/edit`} render={() => <GroupEditComponent {...param} />}  />
//           <Route path={`${props.match.path}/add`} render={() => <GroupAddComponent {...param} />}  />

//           <Redirect from="*" to={`${props.match.path}`} />
//         </Switch>
//       </Suspense>
//     </>
//   );
// }

// export default withRouter(GroupComponent);



class GroupComponent extends Component {
  constructor(props) {
      super(props);  
      this.state = {
      };
  }

  render() {
    let param = this.props;

    return <>
      <Suspense>
        <Switch>
          <Route exact path={`${this.props.match.path}`} render={() => <GroupListComponent {...param} />} />
          <Route path={`${this.props.match.path}/view`} render={() => <GroupViewComponent {...param} />}  />
          <Route path={`${this.props.match.path}/edit`} render={() => <GroupEditComponent {...param} />}  />
          <Route path={`${this.props.match.path}/add`} render={() => <GroupAddComponent {...param} />}  />

          <Redirect from="*" to={`${this.props.match.path}`} />
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