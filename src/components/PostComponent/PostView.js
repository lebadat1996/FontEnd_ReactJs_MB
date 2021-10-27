import React, {Component} from 'react';
import {Pagination} from "antd";

import PostService from "../../service/PostService/PostService";
import PopupService from "../../service/PopupService/PopupService";

class PostView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            totalElements: 0,
            numberOfElements: 0,
            pageIndex: 1,
            size: 5
        }

    }

    componentDidMount() {
        PostService.viewPost(this.state.pageIndex, this.state.size).then((res) => {
            console.log(res.data.content)
            this.setState({posts: res.data.content});
            this.setState({totalElements: res.data.totalElements})
            this.setState({numberOfElements: res.data.numberOfElements})
            this.setState({pageIndex: res.data.number})
        });
    }

    changePage = (page, size) => {
        PostService.viewPost(page, size).then((res) => {
            console.log(res);
            this.setState({posts: res.data.content});
            this.setState({totalElements: res.data.totalElements})
            this.setState({numberOfElements: res.data.numberOfElements})
            this.setState({pageIndex: res.data.number})

        });

    }
    createPost = () => {
        this.props.history.push("/create/post/")
    }
    viewPost = () => {
        this.props.history.push("/view/post/")
    }

    editPost = (id) => {
        this.props.history.push("/edit/post/" + id)
    }
    deletePosts = (id) => {
        PostService.deletePost(id).then(res => {
            this.setState({posts: this.state.posts.filter(post => post.id !== id)});
            alert("Xóa Post Thành công")
        });
    }

    render() {
        return (
            <div className="list-data-demo">
                <div className="list-banner-title">
                    <h2><p>Quản lý Bài Đăng</p></h2>
                </div>
                <div className="add-list">
                    <button onClick={() => this.createPost()}>Thêm mới</button>
                </div>
                <div className="form-list-banner">
                    <div className="title-list">
                        <div className="title-list-item title-item-checkbox">
                            <div><input type="checkbox"/></div>
                        </div>
                        <div className="title-list-item title-item-status"><p>STT</p></div>
                        <div className="title-list-item title-item-title"><p>Tiêu đề</p></div>
                        <div className="title-list-item title-item-active"><p>Trạng thái</p></div>
                        <div className="title-list-item title-item-channel"><p>Kênh</p></div>
                        <div className="title-list-item title-item-channel"><p>Thể Loại</p></div>
                        <div className="title-list-item title-item-order"><p>Mức ưu tiên</p></div>
                        <div className="title-list-item title-item-mull"><p>Hành Động</p></div>
                    </div>
                    {
                        this.state.posts.map(
                            post => <div className="content-list">
                                <div className="content-list-item content-item-checkbox">
                                    <div><input type="checkbox"/></div>
                                </div>
                                <div className="content-list-item content-item-status"><p>{post.id}</p></div>
                                <div className="content-list-item content-item-title"><p>{post.title}</p>
                                </div>
                                <div className="content-list-item content-item-active"><p>{post.status}</p></div>
                                <div className="content-list-item content-item-channel"><p>{post.nameChannel}</p></div>
                                <div className="content-list-item content-item-channel"><p>{post.nameCategory}</p></div>
                                <div className="content-list-item content-item-order"><p>{post.priority}</p></div>
                                <div className="content-list-item content-item-actions">
                                    <div className="content-item-button">
                                        <button className="edit" onClick={() => this.editPost(post.id)}>Sửa</button>
                                        <button className="delete" onClick={() => this.deletePosts(post.id)}>Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="banner-view-page">
                        <Pagination
                            total={this.state.totalElements}
                            onChange={this.changePage}
                            pageSize={this.state.size}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PostView;