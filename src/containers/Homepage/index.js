import React, { Component } from 'react'
import { connect } from 'react-redux'
import Homepage from '../../components/Homepage'
import { 
    getMultiOptions,
    submitFormData,
 } from '../../actions/homepage';

 

class HomeContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
           
        }
    }
    /* Fetch Multiple Options for DropDown from Backend Api When Homepage Component did mount */
    componentDidMount () {
        const { getMultiOptions } = this.props
        getMultiOptions()
    }
    render () {
        return (
            <div className="">
                <Homepage {...this.props} />
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        options: state.homepage.options,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getMultiOptions: () => {
            dispatch(getMultiOptions())
        },
        submitFormData: (items) => {
            dispatch(submitFormData(items))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);