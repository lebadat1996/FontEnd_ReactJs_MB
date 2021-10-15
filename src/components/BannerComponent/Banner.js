import React, {Component} from 'react';
import Form from "react-validation/build/form";
import avatar from '../../assets/bannerUpload.png'
import Switch from "react-switch";
import BannerService from "../../service/BannerService/BannerService";
import {Button, Modal} from "react-bootstrap";

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            alternativeTitle: '',
            destinationUrl: '',
            file: null,
            channelId: '1',
            priority: '1',
            creatorId: '',
            modifierId: '',
            show: false
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handChangeValueChannel = this.handChangeValueChannel.bind(this);
        this.handChangeValuePriority = this.handChangeValuePriority.bind(this);
        this.handChangeValueAvatar = this.handChangeValueAvatar.bind(this);
    }


    handlerChange(status) {
        this.setState({status})
        console.log(status)
    }

    handChangeValueChannel = (event) => {
        this.setState({channelId: event.target.value});
    }
    handChangeValueAlternativeTitle = (event) => {
        this.setState({alternativeTitle: event.target.value});
    }
    handChangeValueDestinationUrl = (event) => {
        this.setState({destinationUrl: event.target.value});
        console.log(event.target.value)
    }

    handChangeValueAvatar = (event) => {
        this.setState({file: event.target.files[0]});
    }
    handChangeValueCreatorId = (event) => {
        this.setState({creatorId: event.target.value});
    }
    handChangeValuePriority = (event) => {
        this.setState({priority: event.target.value});
    }

    handChangeValueStatus = (event) => {
        this.setState({status: event.target.value});
    }
    handChangeValueModifierId = (event) => {
        this.setState({modifierId: event.target.value});
    }
    viewBanner = () => {
        this.props.history.push("/view/banner/")
    }
    handlerClose = () => {
        this.setState({show: !this.state.show});
    }
    createBanners = (e) => {
        e.preventDefault();
        let banner = {
            alternativeTitle: this.state.alternativeTitle,
            destinationUrl: this.state.destinationUrl,
            file: this.state.file,
            channelId: this.state.channelId,
            priority: this.state.priority,
            creatorId: this.state.creatorId,
            modifierId: this.state.modifierId,
            status: this.state.status
        }
        console.log('banner => ' + JSON.stringify(banner));
        debugger
        let body = new FormData();
        body.append('alternativeTitle', banner.alternativeTitle);
        body.append('destinationUrl', banner.destinationUrl);
        body.append('file', banner.file);
        body.append('channelId', banner.channelId);
        body.append('priority', banner.priority);
        body.append('status', banner.status);
        if (banner.file === null) {
            this.setState({show: !this.state.show});
        } else {
            BannerService.createBanner(body).then((res) => {
                console.log(res)
                if (res.status === 400) {
                    alert("error")
                }
                alert("create banner successfully")
            }).catch(function (error) {
                alert(error.response.data.error)
            });
        }

    }


    render() {
        return (
            <div className="wapper-container container">
                <div className="banner-text">
                    <h2><p>Thêm mới Banner</p></h2>
                </div>
                <form className="form-create">
                    <div className="banner-left">
                        <div className="banner-middle">
                            <div className="col">
                                <p>Tiêu đề</p>
                                <input placeholder="Nhập tiêu đề" name="alternativeTitle" type="text"
                                       className="form-control" value={this.state.alternativeTitle}
                                       onChange={this.handChangeValueAlternativeTitle}/>
                            </div>
                            <div className="col">
                                <p>Link Url</p>
                                <input placeholder="nhập url" name="destinationUrl" type="text" className="form-control"
                                       value={this.state.destinationUrl}
                                       onChange={this.handChangeValueDestinationUrl}/>
                            </div>
                        </div>
                    </div>
                    <div className="banner-right">
                        <div className="img-upload">
                            <img src={avatar}/>
                            <input id="input-file" type="file" onChange={this.handChangeValueAvatar}/>
                            <label htmlFor="input-file"></label>
                        </div>
                        <div className="channel">
                            <p className="name">Kênh:</p>
                            <select className="form-select" value={this.state.channelId}
                                    onChange={this.handChangeValueChannel}>
                                <option value="1">Agency</option>
                                <option value="2">Bancas</option>
                                <option value="3">Common</option>
                            </select>
                        </div>
                        <div className="order">
                            <p className="name">Mức ưu tiên:</p>
                            <select className="form-select" value={this.state.priority}
                                    onChange={this.handChangeValuePriority}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="status">
                            <p className="name">Trang thai:</p>
                            <Switch onChange={this.handlerChange} value={this.state.status}
                                    checked={this.state.status}/>
                        </div>
                    </div>
                    <div className="banner-actions">
                        <button className="create" type="submit" onClick={this.createBanners}>Tạo</button>
                        <button className="cancel" type="submit" onClick={this.viewBanner}>Hủy</button>
                    </div>
                    <Modal show={this.state.show} onHide={() => this.createBanners()}>
                        <Modal.Header>
                            EName-Card
                        </Modal.Header>
                        <Modal.Body>
                            Xin mời chọn banner
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.handlerClose()}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        );
    }
}

export default Banner;