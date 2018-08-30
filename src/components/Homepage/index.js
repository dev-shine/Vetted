import React , { Component } from 'react'
import './index.css'
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
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
            isRenderRadio: false,
            visibleSuccess: false,
            visibleWarning: false,
            alertObject: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }
    /*Detect Email Input Change */
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
            isEmail: validateEmail(e.target.value)
        })
    }
    onBlurEmail = (e) => {
        const { submitFormData } = this.props
        if (this.state.isEmail) {
            submitFormData({email: this.state.email})
            this.showSuccessAlert("Email")
        } else {
            this.showWarningAlert()
        }
    }
    /*Detect Phone Number Input Change */
    onChangePhone = (e) => {
        this.setState ({
            phone: e.target.value,
            isPhone: validatePhone(e.target.value)
        })
    }
    onBlurPhone = (e) => {
        const { submitFormData } = this.props
        if (this.state.isPhone) {
            submitFormData({phone: this.state.phone})
            this.showSuccessAlert("Phone")
        } else {
            this.showWarningAlert()
        }
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
    onBlurDropDown = (e) => {
        const { submitFormData } = this.props
        if (this.state.selectedOption.length !== 0) {
            submitFormData({options: this.state.selectedOption})
            this.showSuccessAlert("DropDown")
        } else {
            this.showWarningAlert()
        }
    }
    /* Detect Toggle Checkbox */
    onChangeCheckBox = () => {
        const isRenderRadio = this.state.isRenderRadio
        this.setState({
            isRenderRadio: !isRenderRadio
        })
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
    /* Submit Change of Form to Backend */
    handleSubmit = (event) => {
        /* Get Function from Propagation */
        const { submitFormData } = this.props

        event.preventDefault();
        const data = {}
        const length = event.target.length
        for (var i = 0; i < length ; i++) {
            /* Consider Unneeded Changeable Input */
            if (event.target[i].value === "" || event.target[i].id === "") {
                continue;
            }
            data[event.target[i].id] = event.target[i].value
        }
        data.selectedOption = this.state.selectedOption
        
        /* Now , Submit................. */
        submitFormData(data)
    }
    /* Alert Diaolog */
    onDismiss() {
        this.setState({ visibleSuccess: false })
        this.setState({ visibleWarning: false })
    }
    showSuccessAlert ( object) {
        this.setState({
            visibleSuccess: true,
            visibleWarning: false,
            alertObject: object,
        })
    }
    showWarningAlert () {
        this.setState({
            visibleWarning: true,
            visibleSuccess: false,
        })
    }
    render () {
        // const { options } = this.props // If backend is alive you can use this options.
        const options = options_ // Dropdown options         
        return (
            <div className="homepage-container">
                <Alert color="success" isOpen={this.state.visibleSuccess} toggle={this.onDismiss}>
                    Your {this.state.alertObject} Change Requirement Successfully Submitted to Backend API
                </Alert>
                <Alert color="warning" isOpen={this.state.visibleWarning} toggle={this.onDismiss}>
                    Please confirm Validation!
                </Alert>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail} onBlur={this.onBlurEmail} onFocus={this.onDismiss}/>
                        <Label className={this.state.isEmail? "" : "unvalidate"}>{this.state.isEmail?  "Validated Email" : "Email is Invalidated"}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="phone" name="phone" id="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.onChangePhone} onBlur={this.onBlurPhone} onFocus={this.onDismiss}/>
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
                            value={this.state.selectedOption}
                            onChange={this.onChangeMultipleDropDown}
                            options={ options }
                            isMulti={true}
                            onFocus={this.onDismiss}
                            onBlur={this.onBlurDropDown}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="textarea">Text Area</Label>
                        <Input type="textarea" name="text" id="textarea" onFocus={this.onDismiss}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="file">File</Label>
                        <Input type="file" name="file" id="file" />
                        <FormText color="muted">
                            
                        </FormText>
                    </FormGroup>
                    <FormGroup tag="fieldset" hidden={!this.state.isRenderRadio}>
                        <legend>Radio Buttons When Change Checkbox status to True.</legend>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" />{' '}
                                option 1
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" />{' '}
                                option 2
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                            <Input type="radio" name="radio1" />{' '}
                                option 3
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            {/* Sorry for Little Dirty Coding for Checkbox, Input type = checkbox has some bugs. */}
                            <Input id="checkbox" type="checkbox" onClick={this.onChangeCheckBox}/>{' '}   
                            Render Radio Buttons
                        </Label>
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Homepage