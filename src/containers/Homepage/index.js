import React, { Component } from 'react'
import { connect } from 'react-redux'
import Homepage from '../../components/Homepage'
import { 
 
 } from '../../actions/homepage';

 

class HomeContainer extends Component {
    constructor (props) {
        super(props)

        this.state = {
           
        }
    }

    
    render () {
        return (
            <div className="">
                <Homepage />
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeContainer);