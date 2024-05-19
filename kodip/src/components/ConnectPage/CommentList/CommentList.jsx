import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLaugh, faSadTear, faAngry } from '@fortawesome/free-solid-svg-icons';
import './CommentList.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CommentList = ({ postId, currentUser }) => {
  const [commentsAndReplies, setCommentsAndReplies] = useState([]);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [reactionCounts, setReactionCounts] = useState({});

  useEffect(() => {
    // Fetch comments and replies from the API
    // For this example, I'm using a mock API function
/*
      axios.get(`http://localhost:3002/api/connect/getcomments/${postId}`)
    .then(response=>{
      
      const res = response.data;
      const comments = res.filter(comment=>comment.replyTo == null)
      const reply = res.filter(comment=>comment.replyTo !== null)
     setCommentsAndReplies(comments);
     setReplies(reply);
    })
    .catch(error=>{
    console.log(error);
    })
     */
      
   
  }, [postId]);

  useEffect(()=>{
    

    const SampleComments = [
      {
        _id: "662bb1a81e45a00eeae3ea0a",
        commentId: "967a450f-d47e-40ec-b0e3-17826cd3f10a",
        postId: "de236a37-bbc5-4ae6-8d5b-6adee4d4f2c5",
        text: "Hi, great location, I used to live here. I can provide phone number of my past landlord. Dm'ing you",
        username: "user4",
        userId: "6614f10f169f1bc360d038e6",
        timestamp: "2024-04-26T13:52:40.300+00:00"
      },
      {
        _id: "662d042e6ec199c17fa27d32",
        commentId: "1ab1de22-4ced-49f6-bf0a-5cebd8196a8d",
        postId: "de236a37-bbc5-4ae6-8d5b-6adee4d4f2c5",
        text: "I know of a house nearby that suits your description, sending you a dm",
        username: "user4",
        userId: "6614f10f169f1bc360d038e6",
        timestamp: "2024-04-27T13:57:02.924+00:00"
      },
      {
        _id: "662d050d6ec199c17fa27d3f",
        commentId: "6ba7d57c-a476-4fd6-ad71-e8d8110033a5",
        postId: "de236a37-bbc5-4ae6-8d5b-6adee4d4f2c5",
        text: "Hi, Kilimani apartments is vacant. you can reach the caretaker via phone 0712345678",
        username: "user54",
        userId: "6614fc7abe0fc0845aa5ce89",
        timestamp: "2024-04-27T14:00:45.460+00:00"
      },
      {
        _id: "662d050d6ec199c17fa27d3f",
        commentId: "6ba7d57c-a476-4fd6-ad71-e8d8110033a5",
        postId: "de236a37-bbc5-4ae6-8d5b-6adee4d4f2c5",
        text: " I live in this area and would'nt mind scouting for vacant houses if you'd like me to",
        username: "user54",
        userId: "6614fc7abe0fc0845aa5ce89",
        timestamp: "2024-04-27T14:00:45.460+00:00"
      },
      // Add more comments here...
    ];
    setCommentsAndReplies(SampleComments);
  })
 
    
  const handlecomment = (comment) => {
    return (
      <>
        <div className="comment-header">
          <div className="user-avatar"></div>
          <div className="comment-info">
            <p className="user-name">{comment.user}</p>
            <p className="timestamp">{comment.timestamp}</p>
          </div>
        </div>
        <p className="comment-text">{comment.text}</p>
        {renderReactions(comment.commentId)}

        <div className="comment-actions">
          {currentUser && currentUser.id === comment.userId && (
            <>
              <button className="edit-button" onClick={() => handleEdit(comment.commentId)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(comment.commentId)}>
                Delete
              </button>
            </>
          )}
          <button className="reply-button" onClick={() => handleReply(comment.commentId)}>
            Reply
          </button>
        </div>

        {replyTo === comment.commentId && (
          <div className="comment">
            <textarea
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value)
                
              }}
              placeholder="Write your reply..."
              className="reply-textarea"
            />
            <button onClick={handleSubmitReply} className="submit-reply-button">Submit</button>
          </div>
        )}
      </>
    )
  };

  const recursiveattempt = (comment) => {
    const hasReplies = replies.some(reply => reply.replyTo === comment.commentId);

    return (
      <>
        <div key={comment.commentId} className="comment">
          {handlecomment(comment)}        
          {hasReplies && (
            <div className="replies">
              {replies.map((reply, index) => (
                reply.replyTo === comment.commentId && (
                  <div key={index} className="comment">
                    {recursiveattempt(reply)}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </>
    )
  };
  
  const handleReply = (commentId) => {
    setReplyTo(commentId);
    setReplyText('');
  };

  const handleEdit = () => {
    // Implement edit functionality
  };

  const handleDelete = () => {
    // Implement delete functionality
  };

  const handleSubmitReply = () => {
    if (replyText.trim() !== '') {
     const  reply = {
        commentId: uuidv4(),
        postId: postId,
        replyTo: replyTo,
        text: replyText,
        username: localStorage.username,
        timestamp: 'Just now',
        reactions: { like: 0, superReact: 0 },
        userId: localStorage.userid,
        location: [2, 4]
      }
/// axios call here.
    axios.post('http://localhost:3002/api/connect/comment', reply)
    .then(response=>{
    })
    .catch(error=>{
      //error handling?
    })
      setReplies([...replies, reply]);
      setReplyText('');
      setReplyTo(null);
    }

  };

  const handleReaction = (commentId, reactionType) => {
    const updatedCounts = { ...reactionCounts };
    if (!updatedCounts[commentId]) {
      updatedCounts[commentId] = {};
    }
    updatedCounts[commentId][reactionType] = (updatedCounts[commentId][reactionType] || 0) + 1;
    setReactionCounts(updatedCounts);
  };

  const renderReactions = (commentId) => {
    return (
      <div className="reactions">
        <button className="commentsList-reaction-button" onClick={() => handleReaction(commentId, 'like')}>
          <FontAwesomeIcon icon={faHeart} className='commentsList-reaction-button-heart'/>
          {reactionCounts[commentId]?.like || 0}
        </button>
      </div>
    );
  };

  return (
    <div className="comment-list">
      
      {commentsAndReplies && commentsAndReplies.map(comment => (
        recursiveattempt(comment)
      ))}
    </div>
  );
};

export default CommentList;
