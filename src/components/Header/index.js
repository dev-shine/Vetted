import React, { Component } from 'react'
import './index.css'
import {
    Button,
} from 'reactstrap'
class Header extends Component {
    constructor (props) {
        super (props)
        this.state = {
            isAntD: props.isAntD
        }
    }
    toggleDesignStyle = (isAntD) => {
        const { toggleDesignStyle } = this.props
        toggleDesignStyle( isAntD)
        this.setState({
            isAntD: isAntD
        })
    }
    render () {
        
        return (
            <div className="header-container">
                <h1> This is Header </h1>
                {this.state.isAntD? <Button onClick={() => this.toggleDesignStyle(false)}>Toggle to Bootstrap</Button> : <Button onClick={() => this.toggleDesignStyle(true)}>Toggle to AntD</Button>}
            </div>
        )
    }
}

export default Header