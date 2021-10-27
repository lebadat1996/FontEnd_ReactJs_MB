import React, {Component} from 'react';
import PopupService from "../../service/PopupService/PopupService";
import Switch from "react-switch";
import {Button, Modal} from "react-bootstrap";

class PopupEdit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            status: false,
            alternativeTitle: '',
            destinationUrl: '',
            file: null,
            channelId: '',
            priority: '',
            creatorId: '',
            modifierId: '',
            show: false,
            popupId: '',
            image: '',
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handChangeValueChannel = this.handChangeValueChannel.bind(this);
        this.handChangeValuePriority = this.handChangeValuePriority.bind(this);
        this.handChangeValueAvatar = this.handChangeValueAvatar.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);

    }

    componentDidMount() {
        debugger
        console.log(this.props.match.params.id);
        PopupService.getPopupById(this.state.id).then((res) => {
            console.log(res.data)
            debugger;
            let popup = res.data;
            this.setState({
                popupId: popup.data.id,
                status: popup.data.status,
                alternativeTitle: popup.data.alternative_title,
                destinationUrl: popup.data.destination_url,
                image: popup.data.avatar,
                channelId: popup.data.channel_id,
                priority: popup.data.priority
            })
        });
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
    }

    handChangeValueAvatar = (event) => {
        this.setState({image: event.target.files[0]});
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
    getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                console.log(baseURL);
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
    };

    handleFileInputChange = e => {
        console.log(e.target.files[0]);
        let {file} = this.state;

        file = e.target.files[0];
        this.setState({imageFile: file});
        this.getBase64(file)
            .then(result => {
                file["base64"] = result;
                console.log("File Is", file);
                this.setState({
                    image: result,
                    file
                });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            image: e.target.files[0]
        });
    };
    updatePopup = (e) => {
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
        debugger;
        if (popup.file === null) {
            popup.file = this.dataURLtoFile(this.state.image, "image");
        }
        console.log('popup => ' + JSON.stringify(popup));
        let body = new FormData();
        body.append('alternativeTitle', popup.alternativeTitle);
        body.append('destinationUrl', popup.destinationUrl);
        body.append('file', popup.file);
        body.append('channelId', popup.channelId);
        body.append('priority', popup.priority);
        body.append('status', popup.status);
        PopupService.updatePopup(body, this.state.id).then(res => {
            alert("update popup success")
        });
    }
    cancel = () => {
        this.props.history.push("/view/popup/")
    }
    dataURLtoFile = (dataUrl, filename) => {
        let arr = dataUrl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstR = atob(arr[1]),
            n = bstR.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstR.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    render() {
        return (
            <div className="wapper-container container">
                <div className="banner-text">
                    <h2><p className="editBannerText">Thông tin chi tiết Popup</p></h2>
                </div>
                <form className="form-create">
                    <div className="banner-left">
                        <div className="banner-middle">
                            <div className="col">
                                <p>Tiêu đề</p>
                                <input placeholder="Nhập tiêu đề" name="alternativeTitle" type="text"
                                       className="form-control"
                                       value={this.state.alternativeTitle}
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
                            <img
                                src={this.state.image}/>
                            <input id="input-file" type="file" onChange={this.handleFileInputChange}/>
                            <label htmlFor="input-file"></label>
                        </div>
                        <div className="channel">
                            <p className="name">Kênh:</p>
                            <select className="form-select" onChange={this.handChangeValueChannel}>
                                <option selected={this.state.channelId}>{this.state.channelId}</option>
                                <option value="1">Agency</option>
                                <option value="2">Bancas</option>
                                <option value="3">Common</option>
                            </select>
                        </div>
                        <div className="status">
                            <p className="name">Trạng thái:</p>
                            <Switch onChange={this.handlerChange} value={this.state.status}
                                    checked={this.state.status}/>
                        </div>
                    </div>
                    <div className="banner-actions">
                        <button className="create" type="submit" onClick={this.updatePopup}>Update</button>
                        <button className="cancel" type="submit" onClick={this.cancel}>Cancel</button>
                    </div>
                    <Modal>
                        <Modal.Header>
                            EName-Card
                        </Modal.Header>
                        <Modal.Body>
                            Xin mời chọn banner
                        </Modal.Body>
                        <Modal.Footer>
                            <Button>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        );
    }
}

export default PopupEdit;