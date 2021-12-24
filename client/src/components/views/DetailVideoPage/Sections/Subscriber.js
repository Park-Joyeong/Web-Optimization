import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subscriber(props) {
    const userTo = props.userTo;
    const userFrom = props.userFrom;
    const [subscribeNumber, setSubscribeNumber] = useState(0);
    useEffect(() => {
        const subscribeNumberVariables = { userTo: userTo };
        axios.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('Failed to get subscriber number');
                }
            });

        axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if(response.data.success) {

                } else {
                    alert('Failed to get Subscribed Information');
                }
            });
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