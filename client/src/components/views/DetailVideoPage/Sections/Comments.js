import React, { useState } from 'react';
import { Button, Input } from 'antd';
const { TextArea } = Input;

function Comments(props) {

    const [comment, setComment] = useState("");

    const handleChange = () => {
        setComment(e.currentTarget.value);
    }

    return (
        <div>
            <br />
            <p>replies</p>
            <hr />
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    placeholder="write some comments" />
                <br />
                <Button style={{ width: '20%', height: '52px' }}>Submit</Button>
            </form>
        </div>
    );
}

export default Comments;