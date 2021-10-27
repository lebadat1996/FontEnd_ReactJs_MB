import React, {Component} from 'react';
import BannerService from "../../service/BannerService/BannerService";
import avatar from "../../assets/bannerUpload.png";
import {Button, Modal} from "react-bootstrap";
import PostService from "../../service/PostService/PostService";

class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            file: null,
            channelId: '1',
            priority: '1',
            creatorId: '',
            modifierId: '',
            show: false,
            categories: [],
            categoryId: '1',
            channels: []
        }
        this.handChangeValueCategory = this.handChangeValueCategory.bind(this);
        this.handChangeValueChannel = this.handChangeValueChannel.bind(this);
        this.handChangeValuePriority = this.handChangeValuePriority.bind(this);
        this.handChangeValueAvatar = this.handChangeValueAvatar.bind(this);
    }


    handChangeValueChannel = (event) => {
        this.setState({channelId: event.target.value});
        console.log(this.state.channelId);
    }
    handChangeValueCategory = (event) => {
        this.setState({categoryId: event.target.value});
        console.log(this.state.categoryId);
    }
    handChangeValueTitle = (event) => {
        this.setState({title: event.target.value});
    }
    handChangeValueContent = (event) => {
        this.setState({content: event.target.value});
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
    handChangeValueModifierId = (event) => {
        this.setState({modifierId: event.target.value});
    }
    cancel = () => {
        this.props.history.push("/view/post");
    }
    handlerClose = () => {
        this.setState({show: !this.state.show});
    }
    createPost = (e) => {
        e.preventDefault();
        let post = {
            title: this.state.title,
            content: this.state.content,
            file: this.state.file,
            channelId: this.state.channelId,
            priority: this.state.priority,
            creatorId: this.state.creatorId,
            modifierId: this.state.modifierId,
            status: this.state.status,
            categoryId: this.state.categoryId
        }
        console.log('post => ' + JSON.stringify(post));
        debugger
        let body = new FormData();
        body.append('title', post.title);
        body.append('content', post.content);
        body.append('file', post.file);
        body.append('channelId', post.channelId);
        body.append('priority', post.priority);
        body.append('categoryId', post.categoryId);
        if (post.file === null) {
            this.setState({show: !this.state.show});
        } else {
            PostService.createPost(body).then((res) => {
                console.log(res)
                if (res.status === 400) {
                    alert("error")
                }
                alert("create post successfully")
            }).catch(function (error) {
                alert(error.response.data.error)
            });
        }

    }

    componentDidMount() {
        PostService.getAllCategory().then((response) => {
            console.log(response.data);
            debugger;
            this.setState({categories: response.data})
        })
        BannerService.getAllChannel().then((res) => {
            console.log(res.data);
            this.setState({channels: res.data})
            debugger;
        })

    }

    render() {
        return (
            <div className="wapper-container container">
                <div className="banner-text">
                    <h2><p>Thêm mới Bài Đăng</p></h2>
                </div>
                <form className="form-create">
                    <div className="banner-left">
                        <div className="banner-middle">
                            <div className="col">
                                <p>Tiêu đề</p>
                                <input placeholder="Nhập tiêu đề" name="alternativeTitle" type="text"
                                       className="form-control" value={this.state.title}
                                       onChange={this.handChangeValueTitle}/>
                            </div>
                            <div className="col">
                                <p>Nội dung</p>
                                <input placeholder="Nhập nội dung" name="destinationUrl" type="text"
                                       className="form-control" value={this.state.content}
                                       onChange={this.handChangeValueContent}/>
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
                            <p className="name">Thể Loại:</p>
                            <select className="form-select" value={this.state.categoryId}
                                    onChange={this.handChangeValueCategory}>
                                {this.state.categories.map(c => <option
                                    value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="banner-actions">
                        <button className="create" type="submit" onClick={this.createPost}>Tạo</button>
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

export default PostCreate;