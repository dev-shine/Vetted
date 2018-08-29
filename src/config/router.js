import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router';
import Headers from '../containers/Headers';
import Footers from '../containers/Footers';
import DashboardPage from '../containers/Dashboard';

class RouterComponent extends Component {
    render () {
        return (
            <div style={{ height: '100vh', display: 'flex' }}>
                <Headers />
                <Switch>
                    <Route path="/" component={DashboardPage} />
                </Switch>
                {/* <Footers /> */}
            </div>
        )
    }
}

export default RouterComponent;
