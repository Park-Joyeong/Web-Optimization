import React, { useEffect, useState } from 'react';
import { List, Avatar, Typograph } from 'antd';
import axios from 'axios';

const DetailVideoPage = (props) => {

    const videoId = props.match.params.videoId;
    const [video, setVideo] = useState([]);

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

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>
            filePath: {video.filePath}
            <video style={{ width: '100%' }} src={`http://localhost:5000/uploads/1639969756711_movie1.avi`} controls></video>

            <List.Item
                actions={[]}
            >
                <List.Item.Meta
                    avatar={<Avatar src={video.writer && video.writer.image} />}
                    title={<a href="https://ant.design">{video.title}</a>}
                    description={video.description}
                />
                <div></div>
            </List.Item>
        </div>
    );
};

export default DetailVideoPage;