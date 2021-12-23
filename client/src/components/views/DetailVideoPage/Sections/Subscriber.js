import React, { useEffect } from 'react';
import axios from 'axios';

function Subscriber(props) {
    const userTo = props.userTo;
    useEffect(() => {
        const subscribeNumberVariables = {};
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables);
    });
    return (
        <div>
            <button style={{
                backgroundColor: '#CC0000', borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                Subscribe
            </button>
        </div>
    );
}

export default Subscriber;