import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SingleComment from './SingleComment'
const { TextArea } = Input;

function Comments(props) {
    const user = useSelector(state => state.user);
    const [comment, setComment] = useState("");

    const handleChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const variables = {
            content: comment,
            writer: user.userData._id,
            postId: props.postId
        }
        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("");
                    props.refreshFunction(response.data.result);
                } else {
                    alert('Failed to save comment');
                }
            });
    }

    return (
        <div>
            <br />
            <p>replies</p>
            <hr />
            {props.commentList && props.commentList.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={comment}
                    placeholder="write some comments" />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    );
}

export default Comments;