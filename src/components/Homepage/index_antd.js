import React , { Component } from 'react'
import reqwest from 'reqwest';
import './index.css'
import 'antd/dist/antd.css'
import MultipleDropDown from 'react-select'
import { validateEmail, validatePhone } from '../../utils/functions'
import { Form, Icon, Input, Button, Alert, Select, Upload, message, Radio, Checkbox } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group
const Option = Select.Option;
const RadioGroup = Radio.Group;
const singleStyle = {
    display: "flex",
    flexDirection: "column"
}
class HomepageForm extends Component {
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
            fileList: [],
            uploading: false,
            radioValue: 1,
        }
        this.onDismiss = this.onDismiss.bind(this);
    }
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
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
    /* Detect Single Select Dropdown and Render Label element depend on Value */
    onChangeSingleSelect = (value) => {
        console.log("*********************************************************************************", value)
        this.setState ({
            countSelected: value,
        })
    }
    renderLabelDependOnCount = ( count ) => {
        var elements = []
        for (var i = 0; i < count ; i++) {
            elements.push(<h3 key={i}>{i + 1}th Element</h3>)
        }
        return  <div style={ singleStyle }>
                    { elements }
                </div>
    }
     /* Render SingleDropDown */
     renderSingleDropDown () {
        const items = [1, 2, 3, 4, 5]
        return items.map (
            (item, index) => {
                return  <Option style={{color: "#000000"}} key={index} value={item}>{item}</Option>
            }
        )
    }
    /* Detect Toggle Checkbox */
    onChangeCheckBox = () => {
        const isRenderRadio = this.state.isRenderRadio
        this.setState({
            isRenderRadio: !isRenderRadio
        })
    }
    onChangeRadio = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
          radioValue: e.target.value,
        });
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
    /* File Upload Functions */
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append('files[]', file);
        });
    
        this.setState({
          uploading: true,
        });
    
        // You can use any AJAX library you like
        reqwest({
          url: '//api.vetted.com/posts/',
          method: 'post',
          processData: false,
          data: formData,
          success: () => {
            this.setState({
              fileList: [],
              uploading: false,
            });
            message.success('upload successfully.');
          },
          error: () => {
            this.setState({
              uploading: false,
            });
            message.error('upload failed.');
          },
        });
      }
    
    render () {
        const { uploading } = this.state;
        const props = {
        action: '//api.vetted.com/posts/',
        onRemove: (file) => {
            this.setState(({ fileList }) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            return {
                fileList: newFileList,
            };
            });
        },
        beforeUpload: (file) => {
            this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
            }));
            return false;
        },
        fileList: this.state.fileList,
        };

        return (
            <div className="homepage-antd-container">
                { this.state.visibleSuccess? <Alert message={` Your ${this.state.alertObject} Change Requirement Successfully Submitted to Backend API`} type="success" closable onClose={this.onDismiss}/> : null}
                { this.state.visibleWarning? <Alert message="Please confirm Validation!" type="warning" closable onClose={this.onDismiss}/> : null}
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" onChange={this.onChangeEmail} onBlur={this.onBlurEmail}/>
                    </FormItem>
                    <FormItem>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    </FormItem>
                    <FormItem>
                         <InputGroup compact>
                            <Select value={this.state.countSelected} onChange={this.onChangeSingleSelect}>
                                {this.renderSingleDropDown()}
                            </Select>
                            {this.renderLabelDependOnCount(this.state.countSelected)}
                        </InputGroup>
                    </FormItem>
                    <FormItem>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> Select File
                            </Button>
                        </Upload>
                        <Button
                            className="upload-demo-start"
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={this.state.fileList.length === 0}
                            loading={uploading}
                        >
                            {uploading ? 'Uploading' : 'Start Upload' }
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Checkbox onChange={this.onChangeCheckBox}>Checkbox</Checkbox>
                        {this.state.isRenderRadio? <RadioGroup onChange={this.onChange} value={this.state.radioValue}>
                                                        <Radio value={1}>A</Radio>
                                                        <Radio value={2}>B</Radio>
                                                        <Radio value={3}>C</Radio>
                                                        <Radio value={4}>D</Radio>
                                                    </RadioGroup> : null}
                        
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const HomepageAntD = Form.create()(HomepageForm);
export default HomepageAntD
