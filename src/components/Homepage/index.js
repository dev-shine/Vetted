import React , { Component } from 'react'
import './index.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import MultipleDropDown from 'react-select'
import { validateEmail, validatePhone } from '../../utils/functions'
import { options_ } from '../../constants/consts'
const singleStyle = {
    display: "flex",
    flexDirection: "column"
}

class Homepage extends Component {
    constructor (props) {
        super (props)
        this.state = {
            email: "",
            password: "",
            phone: "",
            isEmail: false,
            isPhone: false,
            countSelected: 1,
            selectedOption: null,
        }
    }
    /*Detect Email Input Change */
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            isEmail: validateEmail(e.target.value)
        })
    }
    /*Detect Phone Number Input Change */
    onChangePhone = (e) => {
        this.setState ({
            phone: e.target.value,
            isPhone: validatePhone(e.target.value)
        })
    }
    /* Detect Single Select Dropdown and Render Label element depend on Value */
    onChangeSingleSelect = (e) => {
        this.setState ({
            countSelected: e.target.value,
        })
    }
    renderLabelDependOnCount = ( count ) => {
        var elements = []
        for (var i = 0; i < count ; i++) {
            elements.push(<Label key={i}>{i + 1}th Element</Label>)
        }
        return  <div style={ singleStyle }>
                    { elements }
                </div>
    }
    /* Detect Multiple DropDown Change*/
    onChangeMultipleDropDown = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    /* Render SingleDropDown */
    renderSingleDropDown () {
        const items = [1, 2, 3, 4, 5]
        return items.map (
            (item, index) => {
                return  <option key={index}>{ item }</option>
            }
        )
    }
    render () {
        // const { options } = this.props // If backend is alive you can use this options.
        const options = options_ // Dropdown options         
        return (
            <div className="homepage-container">
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail}/>
                        <Label>{this.state.isEmail?  "Validated Email" : "Email is Invalidated"}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="phone" name="phone" id="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.onChangePhone}/>
                        <Label className={this.state.isPhone? "" : "unvalidate"}>{this.state.isPhone?  "Validated PhoneNumber" : "Phone Number is Invalidated"}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="singleSelect">Select</Label>
                        <Input type="select" name="select" id="singleSelect" onChange={this.onChangeSingleSelect}>
                            {this.renderSingleDropDown()}
                        </Input>
                        {this.renderLabelDependOnCount(this.state.countSelected)}
                    </FormGroup>
                    <FormGroup>
                        <Label for="selectMulti">Select Multiple</Label>
                        <MultipleDropDown
                            id="selectMulti"
                            value={this.state.selectedOption}
                            onChange={this.onChangeMultipleDropDown}
                            options={ options }
                            isMulti={true}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textarea">Text Area</Label>
                        <Input type="textarea" name="text" id="textarea" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">File</Label>
                        <Input type="file" name="file" id="file" />
                        <FormText color="muted">
                            
                        </FormText>
                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Radio Buttons</legend>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" />{' '}
                                option 1
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio2" />{' '}
                                option2
                            </Label>
                        </FormGroup>
                        <FormGroup check disabled>
                            <Label check>
                            <Input type="radio" name="radio3" disabled />{' '}
                                option 3
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                            Check me out
                        </Label>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Homepage