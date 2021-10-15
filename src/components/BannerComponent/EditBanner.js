import React, {Component} from 'react';
import avatar from "../../assets/bannerUpload.png";
import Switch from "react-switch";
import {Button, Modal} from "react-bootstrap";
import BannerService from "../../service/BannerService/BannerService";

class EditBanner extends Component {
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
            bannerId: '',
            image: '',
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.handChangeValueChannel = this.handChangeValueChannel.bind(this);
        this.handChangeValuePriority = this.handChangeValuePriority.bind(this);
        this.handChangeValueAvatar = this.handChangeValueAvatar.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        BannerService.getBannerById(this.state.id).then((res) => {
            console.log(res.data)
            debugger;
            let banner = res.data;
            this.setState({
                bannerId: banner.data.id,
                status: banner.data.status,
                alternativeTitle: banner.data.alternative_title,
                destinationUrl: banner.data.destination_url,
                image: banner.data.avatar,
                channelId: banner.data.channel_id,
                priority: banner.data.priority
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
        console.log(event.target.value)
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

    updateBanner = (e) => {
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
        if (banner.file === null) {
            banner.file = this.dataURLtoFile(this.state.image,"image");
        }
        console.log('banner => ' + JSON.stringify(banner));
        console.log('id => ' + JSON.stringify(this.state.id));
        debugger
        let body = new FormData();
        body.append('alternativeTitle', banner.alternativeTitle);
        body.append('destinationUrl', banner.destinationUrl);
        body.append('file', banner.file);
        body.append('channelId', banner.channelId);
        body.append('priority', banner.priority);
        body.append('status', banner.status);
        BannerService.updateBanner(body, this.state.id).then(res => {
            alert("update success")
        });
    }
    cancel = () => {
        this.props.history.push("/view/banner/")
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
                    <h2><p className="editBannerText">Thông tin chi tiết Banner</p></h2>
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
                        <div className="order">
                            <p className="name">Mức ưu tiên:</p>
                            <select className="form-select" onChange={this.handChangeValuePriority}>
                                <option selected={this.state.priority}>{this.state.priority}</option>
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
                        <button className="create" type="submit" onClick={this.updateBanner}>Update</button>
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

export default EditBanner;