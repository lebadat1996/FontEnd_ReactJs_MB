import React, {Component} from 'react';
import ENameCardService from "../service/ENameCardService";
import iconAdd from "../assets/add.png"
import iconExport from "../assets/export.png"
import iconDownload from "../assets/download_batch.png"
import {Button, Modal} from "react-bootstrap";
import {deleteAllCookies, getCookie,checkRole} from "../service/Auth-header";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';


class ENameCardView extends Component {
    constructor(props) {
        super(props)
        checkRole();
        this.state = {
            ENameCards: [],
            file: '',
            showModal: false,
            totalElements: 0,
            numberOfElements: 0,
            pageIndex: 1,
            size: 4
        }
    }



    onFileChange = (event) => {
        console.log(event)
        this.setState({ file : event.target.files[0] })
    };

    viewDetail = (id) => {
        this.props.history.push("/name-card/detail/" + id)
    }

    uploadFile = () => {
        console.log(this.state.file)
        ENameCardService.uploadFile(this.state.file).then((res) => {
            console.log(res)
            ENameCardService.getENameCard(1,4).then((res) => {
                debugger
                this.setState({ENameCards: res.data.data.content});
                this.setState({totalElements: res.data.data.totalElements})
                this.setState({numberOfElements: res.data.data.numberOfElements})
                this.setState({pageIndex: res.data.data.number})

            });
            alert("import file successfully")
            this.setState({showModal : false})
        })
    }

    downloadFile = () =>{
        ENameCardService.downloadFile().then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'template.xlsx');
            document.body.appendChild(link);
            link.click();
        })
    }

    componentDidMount() {
        let username = getCookie("USERNAME")
        if (username){
            ENameCardService.getENameCard(this.state.pageIndex,this.state.size).then((res) => {
                if (res){
                    this.setState({ENameCards: res.data.data.content});
                    this.setState({totalElements: res.data.data.totalElements})
                    this.setState({numberOfElements: res.data.data.numberOfElements})
                    this.setState({pageIndex: res.data.data.number})
                }
            });
        }else {
            this.props.history.push("/login")
        }
    }

    changePage = (currentPage,size) => {
        ENameCardService.getENameCard(currentPage,size).then((res) => {
            this.setState({ENameCards: res.data.data.content});
            this.setState({totalElements: res.data.data.totalElements})
            this.setState({numberOfElements: res.data.data.numberOfElements})
            this.setState({pageIndex: res.data.data.number})
        });
    }

    delete = (id,fullName) => {
        alert("xác nhận xóa " + fullName)
        ENameCardService.delete(id).then((res) => {
            ENameCardService.getENameCard(1,4).then((res) => {
                this.setState({ENameCards: res.data.data.content});
                console.log(res)
                this.setState({totalElements: res.data.data.totalElements})
                this.setState({numberOfElements: res.data.data.numberOfElements})
                this.setState({pageIndex: res.data.data.number})
            });
        })
    }



    handleShow = () => {this.setState({showModal : true})}

    handleClose = () => {this.setState({showModal : false})}


    render() {
        console.log('render')

        return (
            <div>
                <div>
                    <table style={{"margin-left":"80%"}}>
                        <tr>
                            <td>
                                <div className="b-add">
                                <img className="iconOne" src={iconAdd} onClick={() => this.props.history.push('/name-card/add')}/>
                                <label>Thêm mới</label>
                            </div>
                            </td>
                            <td>
                                <div className="b-add">
                                    <img className="iconOne" src={iconExport} onClick={this.handleShow}/>
                                    <label>Thêm mới theo batch</label>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div>
                    <h2 className="text-center">Danh sách thẻ</h2>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>fullName</th>
                                <th>phone</th>
                                <th>email</th>
                                <th>faceBookLink</th>
                                <th>positions</th>
                                <th>action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.ENameCards.map(
                                    eNameCard =>
                                        <tr>
                                            <td style={{"width": "15%"}} onClick={() => this.viewDetail(eNameCard.id)}> {eNameCard.fullName}</td>
                                            <td onClick={() => this.viewDetail(eNameCard.id)}> {eNameCard.phone}</td>
                                            <td onClick={() => this.viewDetail(eNameCard.id)}> {eNameCard.email}</td>
                                            <td onClick={() => this.viewDetail(eNameCard.id)}> {eNameCard.facebookLink}</td>
                                            <td onClick={() => this.viewDetail(eNameCard.id)}> {eNameCard.positions}</td>
                                            <td style={{"width": "20%"}}>
                                                <div>
                                                    <div className="column">
                                                        <button onClick={() => this.props.history.push("/name-card/edit/" + eNameCard.id)}
                                                                className="btn btn-success">Edit
                                                        </button>
                                                    </div>
                                                    <div className="column">
                                                        <button style={{marginLeft: "10px"}} onClick={() => this.delete(eNameCard.id,eNameCard.fullName)}
                                                                className="btn btn-danger">Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                    <div style={{"float":"right"}}>
                        <Pagination
                            total={this.state.totalElements}
                            onChange={this.changePage}
                            pageSize = {this.state.size}
                            defaultPageSize = {0}
                        />
                    </div>



                    <Modal show={this.state.showModal} onHide={this.handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Tạo mới e-namecard theo batch</Modal.Title>
                        </Modal.Header>
                        <Modal.Body><table>
                            <tr>
                                <td style={{"width":"76%"}}>
                                    <input type='file' name='file' onChange={this.onFileChange} />
                                    <button className="btn btn-success" onClick={this.uploadFile}> Thêm mới với batch</button>
                                </td>
                                <td>
                                    <div className="b-add">
                                        <label>
                                            <img style={{"height":"70px","width":"80"}} src={iconDownload} onClick={this.downloadFile}/>
                                        </label>
                                        <label style={{"margin-top": "15%"}} style={{"margin-left": "15%"}}>Tải mẫu</label>
                                    </div>
                                </td>
                            </tr>
                        </table></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default ENameCardView;
