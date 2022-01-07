import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" }
];

const Category = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" }
];

function UploadVideoPage(props) {
    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState(0);
    const [categories, setCategories] = useState("Film & Animation");
    const [filePath, setFilePath] = useState("");
    const [duration, setDuration] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value);
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.currentTarget.value);
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.currentTarget.value);
    }

    const handleChangeTwo = (event) => {
        setCategories(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in First');
        }
        if (title === "" || description === "" ||
            categories === "" || filePath === "" ||
            duration === "" || thumbnail === ""
        ) {
            return alert('Please first fill all the fileds');
        }
        const variables = {
            writer: user.userData._id,
            title: title,
            description: description,
            privacy: privacy,
            filePath: filePath,
            category: categories,
            duration: duration,
            thumbnail: thumbnail
        };
        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully');
                    props.history.push('/');
                } else {
                    alert('Failed to upload video');
                }
            });
    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        };
        formData.append("file", files[0]);

        axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    const variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(variable.filePath);
                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration);
                                setThumbnail(response.data.thumbsFilePath);
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        });
                } else {
                    alert("Failed to save the video in server");
                }
            });
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />

                            </div>
                        )}
                    </Dropzone>

                    {thumbnail !== "" &&
                        <div>
                            <img src={`http://${process.argv[2]}:5000/${thumbnail}`} alt="thumbnail" />
                        </div>
                    }
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value={description}
                />
                <br /><br />

                <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={handleChangeTwo}>
                    {Category.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    );
}

export default UploadVideoPage;