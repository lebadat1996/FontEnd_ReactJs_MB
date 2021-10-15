import { Form, Input, Button, Checkbox } from 'antd';
import React from "react";
import {AuthService} from "../service/AuthService";

export const ForgotPassword = () => {
    const onFinish = (values) => {
        let service = new AuthService();
        let forgotPasswordRequest = {
            username: values.username
        }
        service.forgotPassword(forgotPasswordRequest).then((res) => {
            alert(res.data.error)
            window.location.href = "/login"
        })
    };

    const onFinishFailed = (errorInfo) => {
        alert("tồn tại trường dữ liệu không đúng!")
    };

    const center =  {
        margin: "auto",
        width: "60%",
        "margin-top":"15%"
    }
    return (

        <div style={center}>
            <h5 className="text-center">Vui lòng nhập tên đăng nhập để lấy lại mật khẩu.</h5>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'username is invalid!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
