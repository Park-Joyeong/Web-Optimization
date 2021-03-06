import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';
const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");
    const [openReply, setOpenReply] = useState(false);

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value);
    }

    const onFocus = (event) => {
        if(!isLoggedIn()) {
            event.currentTarget.blur();
        }
    }

    const isLoggedIn = () => {
        if(user.userData.isAuth) {
            return true;
        } else {
            alert('로그인 후 이용해주세요.');
            return false;
        }
    }

    const openReplySection = () => {
        setOpenReply(!openReply);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(!isLoggedIn()) return;
        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: commentValue
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setCommentValue("");
                    setOpenReply(!openReply);
                    props.refreshFunction(response.data.result);
                } else {
                    alert('Failed to save Comment');
                }
            })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReplySection} key="comment-basic-reply-to">Reply to</span>
    ];
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src={props.comment.writer.image}
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
            {openReply &&
                <form style={{ display: 'flex', marginLeft: '40px' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={commentValue}
                        placeholder='write some comment'
                        onFocus={onFocus}
                    />
                    <br />
                    <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    );
}

export default SingleComment;