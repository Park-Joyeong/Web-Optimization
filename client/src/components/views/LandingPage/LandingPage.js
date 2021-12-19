import React, { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';


const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos);
                } else {
                    alert('Failed to get Videos');
                }
            });
    }, []);
    const renderCards = videos.map((video, index) => {
        return <div>
            <div style={{ position: 'relative' }}>
                <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} />
                <div className="duration">
                    <span>minute : second</span>
                </div>
            </div>
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name}</span>
            <span style={{ marginLeft: '3rem' }}>{video.views}</span>
            - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </div>
    });
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommended</Title>
            <hr />
            {renderCards}
        </div>
    )
}

export default LandingPage
