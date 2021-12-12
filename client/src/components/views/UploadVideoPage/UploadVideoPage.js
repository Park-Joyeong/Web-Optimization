import React, { useState, useEffect } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone';

const { Title } = Typography;
const { TextArea } = Input;

function UploadVideoPage() {

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
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

                    {/* {thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                        </div>
                    } */}
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                // onChange={handleChangeTitle}
                // value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                // onChange={handleChangeDecsription}
                // value={Description}
                />
                <br /><br />

                {/* <select onChange={handleChangeOne}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select> */}
                <br /><br />

                {/* <select onChange={handleChangeTwo}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select> */}
                <br /><br />

                {/* <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button> */}

            </Form>
        </div>
    );
}

export default UploadVideoPage;