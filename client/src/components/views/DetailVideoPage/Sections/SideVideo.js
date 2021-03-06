import React, { useState, useEffect } from 'react';
import axios from 'axios';
const config = require('../../../../config/config');

function SideVideo() {
    const [sideVideos, setSideVideos] = useState([]);
    useEffect(() => {
        axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    setSideVideos(response.data.videos);
                } else {
                    alert('Failed to get Videos');
                }
            });
    }, []);

    const sideVideoItem = sideVideos.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor(video.duration - minutes * 60);
        return <div key={index} style={{ display: 'flex', marginTop: '1rem', padding: '0 2rem' }}>
            <div style={{ width: '40%', marginRight: '1rem' }}>
                <a href={`/video/${video._id}`} style={{ color: 'grey'}}>
                    <img style={{ width: '100%' }} src={`${config.hostUrl}:5000/${video.thumbnail}`} alt="thumbnail" />
                </a>
            </div>
            <div style={{ width: '50%' }}>
                <a href={`/video/${video._id}`} style={{ color: 'grey'}}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                    <span>{video.writer.name}</span><br />
                    <span>{video.views}</span><br />
                    <span>{minutes} : {seconds}</span><br />
                </a>
            </div>
        </div>
    });

    return (
        <React.Fragment>
            <div style={{ marginTop: '3rem' }}></div>
            {sideVideoItem}
        </React.Fragment>
    );
}

export default SideVideo;