import React from 'react';
import ENameCardService from "../service/ENameCardService";
import avatar from '../assets/avatar.png'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {checkRole, getCookie} from "../service/Auth-header";
import {validFullName, validMail, validPhone, validProfileFacebook} from "../service/Validate";
import 'antd/dist/antd.css';
import "../App.css";

class ENameCardCreate extends React.Component{

    constructor(props) {
        super(props);
        checkRole();
        this.state = {
            avatar: 'avatar.png',
            email: '',
            faceBookLink: '',
            fullName: '',
            phone: '',
            positions: '',
            file: '',
        }

    }

    handleChange = (e) => {
        let {name, value} = e.target
        if (name.toString() === 'fullName'){
            console.log(value)
            value = value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            value = value.replace(/\s\s+/g, ' ');
        }
        this.setState({[name]: value})
    }

    uploadImage = (e) => {
        const file = e.target.files[0];
        const preview = document.getElementById('viewAvatarP');
        const render = new FileReader();
        render.onload = function(e) {
            // @ts-ignore
            preview.setAttribute('src', e.target.result);
        };
        render.readAsDataURL(file);
        this.setState({file: e.target.files[0]})
    }


    init(){
        let username = getCookie("USERNAME")
        if (!username){
            window.location.href="/login";
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.file)
        let {email, faceBookLink, fullName, phone, positions, file} = this.state;
        if (!(validMail(email) !== undefined |
            validFullName(fullName) !== undefined |
            validPhone(phone) !== undefined |
            validFullName(positions) !== undefined |
            validProfileFacebook(faceBookLink) !== undefined)){
            if (file === ''){
                this.setState({avatar: "avatar.png"})
                ENameCardService.createEmployee(this.state).then((res) => {
                    if (res.status === 400){
                        alert("sai ?????nh d???ng d??? li???u!")
                    }
                    alert("create e-name card successfully")
                    this.props.history.push('/name-cards')
                }).catch(function (error) {
                    alert(error.response.data.error)
                });
            }else {
                ENameCardService.uploadAvatar(this.state.file).then((res) => {
                    this.setState({avatar: res.data.data})
                    ENameCardService.createEmployee(this.state).then((res) => {
                        alert("create e-name card successfully")
                        this.props.history.push('/name-cards')
                    },
                        error => {
                            console.log(error)
                        }
                    )
                })
            }
        }else {
            alert("T???n t???i tr?????ng d??? li???u kh??ng h???p l???. ????? ngh??? ki???m tra l???i!")
        }
    }


    render() {
        return(
            <div>
                <Form className="modal-content" onSubmit={this.handleSubmit}>
                    <div>
                        <div className="container">
                            <div className="avatar-div">
                                <img src={avatar} style={{"width":"200px" ,"height":"200px"}} id="viewAvatarP" />
                                <label>Ch???n ???nh ?????i di???n: </label>
                                <input type="file" onChange={this.uploadImage} />
                            </div>
                        </div>
                        <div className="content">
                            <div className="left">
                                <label htmlFor="fullName"><b>H??? t??n:</b></label>
                                <Input type="text"
                                       value={this.state.fullName}
                                       onChange={this.handleChange}
                                       placeholder="Nh???p h??? t??n" name="fullName"
                                       validations={[validFullName]}
                                />

                                <label htmlFor="phone"><b>S??T:</b></label>
                                <Input validations={[validPhone]}
                                       type="text"
                                       value={this.state.phone}
                                       onChange={this.handleChange}
                                       placeholder="Nh???p s??? ??i???n tho???i" name="phone"/>
                                <label htmlFor="email"><b>Email:</b></label>
                                <Input validations={[validMail]}
                                       type="text"
                                       value={this.state.email}
                                       onChange={this.handleChange}
                                       placeholder="Nh???p email" name="email"/>

                            </div>
                            <div className="right">
                                <label htmlFor="faceBookLink"><b>Facebook Link:</b></label>
                                <Input validations={[validProfileFacebook]}
                                       type="text"
                                       value={this.state.faceBookLink}
                                       onChange={this.handleChange}
                                       placeholder="Nh???p link facebook" name="faceBookLink" />
                                <div>
                                    <label htmlFor="positions"><b>Ch???c v???:</b></label>
                                    <Input validations={[validFullName]}
                                           type="text"
                                           value={this.state.positions}
                                           onChange={this.handleChange}
                                           placeholder="Nh???p ch???c v???" name="positions"/>
                                    {/*<Select*/}
                                    {/*    showSearch*/}
                                    {/*    style={{ width: 300 }}*/}
                                    {/*    placeholder="Select a person"*/}
                                    {/*    optionFilterProp="children"*/}
                                    {/*    onChange={this.onChangePosition}*/}
                                    {/*    filterOption={(input, option) =>*/}
                                    {/*        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
                                    {/*    }*/}
                                    {/*>*/}
                                    {/*    <Option value="Tr?????ng ph??ng">Tr?????ng ph??ng</Option>*/}
                                    {/*    <Option value="Nh??n vi??n b??n h??ng">Nh??n vi??n b??n h??ng</Option>*/}
                                    {/*    <Option value="Tr?????ng nh??m">Tr?????ng nh??m</Option>*/}
                                    {/*</Select>*/}
                                </div>
                            </div>
                        </div>

                        <div className="center">
                            <button type="submit" className="btn btn-success">T???o</button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

export default ENameCardCreate;
