
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLaugh, faSadTear, faAngry } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
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

      axios.get(`http://localhost:3002/api/connect/getcomments/${postId}`)
    .then(response=>{
      console.log('this is the data we are getting',response.data)
      const res = response.data;
      const comments = res.filter(comment=>comment.replyTo == null)
      const reply = res.filter(comment=>comment.replyTo !== null)
     setCommentsAndReplies(comments);
     setReplies(reply);
    })
    .catch(error=>{
    console.log(error);
    })
     
      
   
  }, [postId]);

  
 



    
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
                    {console.log('why arent we')}
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

console.log('reply is', reply);
/// axios call here.

    axios.post('http://localhost:3002/api/connect/comment', reply)
    .then(response=>{
    console.log('after reply', response.data)
    })
    .catch(error=>{
    console.log(error);
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
        <button className="reaction-button" onClick={() => handleReaction(commentId, 'like')}>
          <FontAwesomeIcon icon={faHeart} />
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
