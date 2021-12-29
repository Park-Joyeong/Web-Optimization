import React, { useEffect, useState } from 'react';
import { List, Avatar, Typograph, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscriber from './Sections/Subscriber';
import Comments from './Sections/Comments';

const DetailVideoPage = (props) => {

    const videoId = props.match.params.videoId;
    const [video, setVideo] = useState([]);
    const [commentList, setCommentList] = useState([]);

    const videoVariable = {
        videoId: videoId
    };

    useEffect(() => {
        axios.post('/api/video/getVideo', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.video)
                    setVideo(response.data.video);
                } else {
                    alert('Failed to get video info');
                }
            });
    }, []);

    const updateComment = (newComment) => {
        setCommentList(commentList.concat(newComment));
    }

    if (video.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
                        <video style={{ width: '100%' }} src={`http://localhost:5000/${video.filePath}`} controls></video>

                        <List.Item
                            actions={[<Subscriber userTo={video.writer._id} userFrom={localStorage.getItem('userId')} />]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={video.writer && video.writer.image} />}
                                title={<a href="https://ant.design">{video.title}</a>}
                                description={video.description}
                            />
                            <div></div>
                        </List.Item>
                        <Comments commentList={commentList} postId={video._id} refreshFunction={updateComment} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }

};

export default DetailVideoPage;