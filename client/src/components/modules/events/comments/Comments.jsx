import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Card, Input, Button } from '@mui/material';
import { addComment } from '../../../../features/events/eventsSlice';
import './comments.scss'

function Comments() {
  const comments = [{author: 'John', content: 'THis is a great person'}];
  const [newComment, setNewComment] = useState('');
  const [dispatchComment, setDispatchComment] = useState({author: useSelector((state) => state.user.user.name), content: newComment});
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  // const currEvent = useSelector(state => state.currEvent.currEvent);
  const handleChange = event => {
    setNewComment(event.target.value);
    setDispatchComment((prevState) => ({...prevState, content: newComment}));
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (newComment === '') return;
    // dispatch(addComment({eventId: currEvent.id, comment: {
    //     content: newComment,
    //     author: user.fname,
    //   }}));
    setNewComment('');
  }
  return (
    <Card sx={{margin: '0 0 0 20px', borderRadius:"10px", padding: '10px', }}>
      {comments.map((comment, index) => (
        <div key={index} className='comment-entity'>
          <p className='comment-author'>{comment.author}</p>  
          <p>{comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="form-comment">
        <Input sx={{width: '90%'}} placeholder="Leave a comment" value={newComment} onChange={handleChange} />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}

export default Comments;