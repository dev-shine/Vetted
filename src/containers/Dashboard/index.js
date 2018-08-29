import React, { Component } from 'react';
import { connect } from 'react-redux';

class DashboardContainer extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="dashboard-contanier">
               sfdfd
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);