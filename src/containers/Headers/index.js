import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { 
   toggleDesignStyle
} from '../../actions/homepage';

class HeaderContainer extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="">
                <Header {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAntD: state.header.isAntD,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleDesignStyle: (isAntD) => {
            dispatch(toggleDesignStyle(isAntD))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);