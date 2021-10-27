import React, {Component} from 'react';
import avatar from "../../assets/bannerUpload.png";
import Switch from "react-switch";
import {Button, Modal} from "react-bootstrap";
import PopupService from "../../service/PopupService/PopupService";
import BannerService from "../../service/BannerService/BannerService";

class PopupCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            alternativeTitle: '',
            destinationUrl: '',
            file: null,
            channelId: '1',
            priority: '1',
            creatorId: '',
            modifierId: '',
            show: false,
            channels: []
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
    handlerClose = () => {
        this.setState({show: !this.state.show});
    }
    cancel = () => {
        this.props.history.push("/view/popup");
    }
    createPopup = (e) => {
        e.preventDefault();
        let popup = {
            alternativeTitle: this.state.alternativeTitle,
            destinationUrl: this.state.destinationUrl,
            file: this.state.file,
            channelId: this.state.channelId,
            priority: this.state.priority,
            creatorId: this.state.creatorId,
            modifierId: this.state.modifierId,
            status: this.state.status
        }
        console.log('popup => ' + JSON.stringify(popup));
        debugger
        let body = new FormData();
        body.append('alternativeTitle', popup.alternativeTitle);
        body.append('destinationUrl', popup.destinationUrl);
        body.append('file', popup.file);
        body.append('channelId', popup.channelId);
        body.append('priority', popup.priority);
        body.append('status', popup.status);
        if (popup.file === null) {
            this.setState({show: !this.state.show});
        } else {
            PopupService.createPopup(body).then((res) => {
                console.log(res)
                if (res.status === 400) {
                    alert("error")
                }
                alert("create pop-up successfully")
            }).catch(function (error) {
                alert(error.response.data.error)
            });
        }

    }

    componentDidMount() {
        BannerService.getAllChannel().then((res) => {
            console.log(res.data);
            this.setState({channels: res.data})
        })
    }

    render() {
        return (
            <div className="wapper-container container">
                <div className="banner-text">
                    <h2><p>Thêm mới Pop-up</p></h2>
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
                                <input placeholder="nhập url" name="destinationUrl" type="text"
                                       className="form-control" value={this.state.destinationUrl}
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
                                {this.state.channels.map(channel => <option
                                    value={channel.id}>{channel.name}</option>)}
                            </select>
                        </div>
                        <div className="status">
                            <p className="name">Trạng thái:</p>
                            <Switch onChange={this.handlerChange} value={this.state.status}
                                    checked={this.state.status}/>
                        </div>
                    </div>
                    <div className="banner-actions">
                        <button className="create" type="submit" onClick={this.createPopup}>Tạo</button>
                        <button className="cancel" type="submit" onClick={this.cancel}>Hủy</button>
                    </div>
                    <Modal show={this.state.show} onHide={() => this.createPopup()}>
                        <Modal.Header>
                            EName-Card
                        </Modal.Header>
                        <Modal.Body>
                            Xin mời chọn pop-up
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

export default PopupCreate;