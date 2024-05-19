import { useState } from 'react';
import { FaMicrophone, FaPaperclip, FaPaperPlane } from 'react-icons/fa'; // Import icons as needed
import './sendMessage.css';


console.log('send-message render')
const YourComponent = ({setNewMessage, newMessage, handleclicksend}) => {

    /*
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    // Your logic to send the message goes here
    console.log('Sending message:', newMessage);
    // Clear the input after sending
    setNewMessage('');
  };
*/
  const handleKeyPress = (e) => {
    // Check if the Enter key is pressed
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (e.g., newline in the input field)
      handleclicksend(); // Call the function to send the message
    }
  };

  return (
    <div className="message_input">
      <div className="input-box">
        <input
          className="chat-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress} // Call handleKeyPress on key press
          placeholder="Type your message..."
        />
        <div className="icons">
          <FaMicrophone className="icon" />
          <FaPaperclip className="icon" />
          <FaPaperPlane className="icon" onClick={handleclicksend} />
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
